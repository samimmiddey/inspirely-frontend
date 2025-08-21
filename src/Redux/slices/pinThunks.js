import { client } from "../../Client/client";
import { categoryQuery, createdPinsQuery, homeQuery, notificationCountQuery, notificationQuery, pinDetailsQuery, savedPinsQuery, searchQuery, userQuery, userSearchQuery } from "../../queries/queries";
import { getAllPins, setCommentLoading, setCreatedPins, setDeletePinLoader, setGetScrolledNotifications, setGetScrolledPosts, setIsUploaded, setNotificationCount, setNotificationData, setNotificationError, setNotificationLoading, setSavedPins, setScrollLoading, setSearchedUsers, setSinglePin } from "./pinSlice";
import { setButtonLoading, setErrorText, setSnackbar, toggleSnackbar } from "./uiSlice";
import { v4 as uuidv4 } from 'uuid';

// Save-Unsave an individual pin
export const savePin = (id, userID, method, component) => {
   return async (dispatch, getState) => {
      const onSave = async () => {
         dispatch(setButtonLoading(true));
         const path = getState().pin.path.startsWith('/profile');
         const tabValue = getState().pin.tabValue;
         const socket = getState().ui.socket;
         const user = getState().auth.user;
         const selectedPin = getState().pin.selectedPin;

         let savedPin;
         let unsavedPin;

         let posts;
         if (method === 'save') {
            savedPin = await client
               .patch(id)
               .setIfMissing({ save: [] })
               .insert('after', 'save[-1]', [{
                  userId: userID,
                  postedBy: {
                     _type: 'postedBy',
                     _ref: userID,
                  },
               }])
               .commit({ autoGenerateArrayKeys: true, })

            if (component === 'pinDetails') {
               // Save pin inside Pin Details Component
               const pin = getState().pin.singlePin;
               if (pin._id === savedPin._id) {
                  const newSavedPin = { ...pin, save: savedPin.save }
                  dispatch(setSinglePin(newSavedPin));
               }
            } else {
               // Save pin inside Masonry Component
               let pins;
               if (path) {
                  if (tabValue === 'one') {
                     pins = getState().pin.createdPins;
                  } else {
                     pins = getState().pin.savedPins;
                  }
               } else {
                  pins = getState().pin.allPins;
               }

               posts = pins.map(pin => {
                  if (pin._id === savedPin._id) {
                     return {
                        ...pin,
                        save: savedPin.save
                     }
                  }
                  return pin;
               });
            }

            // Socket save notification
            if (user.id !== selectedPin.postedBy._id) {
               socket.emit("sendNotification", {
                  senderID: user.id,
                  receiverID: selectedPin.postedBy._id,
                  pinID: selectedPin._id,
                  type: 'save'
               });
            }
         } else {
            const pinToRemove = [`save[userId=="${userID}"]`];

            unsavedPin = await client
               .patch(id)
               .unset(pinToRemove)
               .commit()

            if (component === 'pinDetails') {
               // Unsave pin inside Pin Details Component
               const pin = getState().pin.singlePin;
               if (pin._id === unsavedPin._id) {
                  const newUnsavedPin = { ...pin, save: null }
                  dispatch(setSinglePin(newUnsavedPin));
               }
            } else {
               // Unsave pin inside Masonry Component
               let pins;
               if (path) {
                  if (tabValue === 'one') {
                     pins = getState().pin.createdPins;
                  } else {
                     pins = getState().pin.savedPins;
                  }
               } else {
                  pins = getState().pin.allPins;
               }

               posts = pins.map(pin => {
                  if (pin._id === unsavedPin._id) {
                     return {
                        ...pin,
                        save: null
                     }
                  }
                  return pin;
               });
            }

            // Socket unsave notification
            if (user.id !== selectedPin.postedBy._id) {
               socket.emit("sendNotification", {
                  senderID: user.id,
                  receiverID: selectedPin.postedBy._id,
                  pinID: selectedPin._id,
                  type: 'unsave'
               });
            }
         }

         // Re-set all the pins in all the components that use getAllPins
         if (!component && !path) {
            dispatch(getAllPins(posts));
         }

         // Re-set all the pins in all the components that use createdPins & savedPins 
         if (path && !component) {
            if (tabValue === 'one') {
               dispatch(setCreatedPins(posts));
            } else {
               dispatch(setSavedPins(posts));
               let pins;
               if (method === 'save') {
                  pins = getState().pin.createdPins.map(pin => {
                     if (pin._id === savedPin._id) {
                        return {
                           ...pin,
                           save: savedPin.saved
                        }
                     }
                     return pin;
                  });
               } else {
                  pins = getState().pin.createdPins.map(pin => {
                     if (pin._id === unsavedPin._id) {
                        return {
                           ...pin,
                           save: null
                        }
                     }
                     return pin;
                  });
               }

               dispatch(setCreatedPins(pins));
            }
         }

         dispatch(setButtonLoading(false));
         dispatch(toggleSnackbar());
         dispatch(setSnackbar({ value: true, text: `Pin ${method}d successfully!` }));
      }

      try {
         await onSave();
      } catch (error) {
         dispatch(setErrorText(error.message));
         dispatch(setButtonLoading(false));
      }
   }
};

// Create a pin
export const createPin = ({ image, title, about, destination, category }, userID) => {
   return async (dispatch) => {
      const uploadPin = async () => {
         dispatch(setButtonLoading(true));

         // Upload Image
         const imageAsset = await client.assets.upload('image', image[0], {
            contentType: image.type,
            filename: image.name
         });

         // Upload the document
         const doc = {
            _type: 'pin',
            title,
            about,
            destination,
            image: {
               _type: 'image',
               asset: {
                  _type: 'reference',
                  _ref: imageAsset._id,
               },
            },
            userId: userID,
            createdAt: new Date().toISOString(),
            postedBy: {
               _type: 'postedBy',
               _ref: userID,
            },
            category,
         };

         await client.create(doc);

         dispatch(setIsUploaded(true));
         dispatch(setButtonLoading(false));
         dispatch(toggleSnackbar());
         dispatch(setSnackbar({ value: true, text: 'Pin created successfully!' }));
      }

      try {
         await uploadPin();
      } catch (error) {
         dispatch(setErrorText(error.message));
         dispatch(setButtonLoading(false));
      }
   }
};

// Load more pins on scroll
export const loadOnScroll = (category) => {
   return async (dispatch, getState) => {
      const loadData = async () => {
         dispatch(setScrollLoading(true));

         const posts = getState().pin.allPins;
         const lastCreatedAt = posts[posts.length - 1].createdAt;
         const lastPostId = posts[posts.length - 1]._id;

         let loadedPosts;
         if (category) {
            const query = categoryQuery(category);
            loadedPosts = await client.fetch(query, { lastCreatedAt, lastPostId });
         } else {
            const query = homeQuery();
            loadedPosts = await client.fetch(query, { lastCreatedAt, lastPostId });
         }

         const allPosts = [...posts, ...loadedPosts];
         dispatch(getAllPins(allPosts));

         if (loadedPosts.length === 0) {
            dispatch(setGetScrolledPosts(false));
         }

         dispatch(setScrollLoading(false));
      }

      try {
         if (getState().pin.getScrolledPosts) {
            await loadData();
         }
      } catch (error) {
         dispatch(setErrorText(error.message));
         dispatch(setScrollLoading(false));
      }
   }
};

// Load more created/saved pins on scroll
export const loadUserPinsOnScroll = (value, userID) => {
   return async (dispatch, getState) => {
      const loadData = async () => {
         dispatch(setScrollLoading(true));

         let loadedPosts;

         if (value === 'one') {
            const createdPins = getState().pin.createdPins;

            const lastCreatedAt = createdPins[createdPins.length - 1].createdAt;
            const lastPostId = createdPins[createdPins.length - 1]._id;

            const query = createdPinsQuery(userID);
            loadedPosts = await client.fetch(query, { lastCreatedAt, lastPostId });

            const allPosts = [...createdPins, ...loadedPosts];
            dispatch(setCreatedPins(allPosts));
         } else {
            const savedPins = getState().pin.savedPins;

            const lastCreatedAt = savedPins[savedPins.length - 1].createdAt;
            const lastPostId = savedPins[savedPins.length - 1]._id;

            const query = savedPinsQuery(userID);
            loadedPosts = await client.fetch(query, { lastCreatedAt, lastPostId });

            const allPosts = [...savedPins, ...loadedPosts];
            dispatch(setSavedPins(allPosts));
         }

         if (loadedPosts.length === 0) {
            dispatch(setGetScrolledPosts(false));
         }

         dispatch(setScrollLoading(false));
      }

      try {
         if (getState().pin.getScrolledPosts) {
            await loadData();
         }
      } catch (error) {
         dispatch(setErrorText(error.message));
         dispatch(setScrollLoading(false));
      }
   }
};

// Load more search results
export const loadSearchedPinsOnScroll = (searchID) => {
   return async (dispatch, getState) => {
      const loadData = async () => {
         dispatch(setScrollLoading(true));

         const tabValue = getState().pin.tabValue;

         let loadedPosts;
         let loadedUsers;
         if (tabValue === 'one') {
            const posts = getState().pin.allPins;
            const lastCreatedAt = posts[posts.length - 1].createdAt;
            const lastPostId = posts[posts.length - 1]._id;

            const query = searchQuery(searchID);
            loadedPosts = await client.fetch(query, { lastCreatedAt, lastPostId });

            const allPosts = [...posts, ...loadedPosts];
            dispatch(getAllPins(allPosts));

            if (loadedPosts.length === 0) {
               dispatch(setGetScrolledPosts(false));
            }
         } else {
            const users = getState().pin.searchedUsers;
            const lastCreatedAt = users[users.length - 1].createdAt;
            const lastUserId = users[users.length - 1]._id;

            const query = userSearchQuery(searchID);
            loadedUsers = await client.fetch(query, { lastCreatedAt, lastUserId });

            const allUsers = [...users, ...loadedUsers];
            dispatch(setSearchedUsers(allUsers));

            if (loadedUsers.length === 0) {
               dispatch(setGetScrolledPosts(false));
            }
         }

         dispatch(setScrollLoading(false));
      }

      try {
         if (getState().pin.getScrolledPosts) {
            await loadData();
         }
      } catch (error) {
         dispatch(setErrorText(error.message));
         dispatch(setScrollLoading(false));
      }
   }
};

// Add Comments
export const addComment = (comment, pinID, userID, postedByID) => {
   return async (dispatch, getState) => {
      const addUserComment = async () => {
         dispatch(setCommentLoading(true));

         const socket = getState().ui.socket;
         const user = getState().auth.user;

         await client
            .patch(pinID)
            .setIfMissing({ comments: [] })
            .insert('after', 'comments[-1]', [{
               comment,
               createdAt: new Date().toISOString(),
               userId: userID,
               postedBy: {
                  _type: 'postedBy',
                  _ref: userID
               }
            }])
            .commit({ autoGenerateArrayKeys: true, })

         const query = pinDetailsQuery(pinID);
         const updatedPin = await client.fetch(query);

         dispatch(setSinglePin(updatedPin[0]));

         // Socket comment notification
         if (user.id !== postedByID) {
            socket.emit("sendNotification", {
               senderID: user.id,
               receiverID: postedByID,
               pinID: pinID,
               type: 'comment'
            });
         }

         dispatch(setCommentLoading(false));
         dispatch(toggleSnackbar());
         dispatch(setSnackbar({ value: true, text: 'Comment posted successfully!' }));
      }

      try {
         await addUserComment();
      } catch (error) {
         dispatch(setErrorText(error.message));
         dispatch(setCommentLoading(false));
      }
   }
}

// Delete Pins
export const deletePin = (pinID) => {
   return async (dispatch, getState) => {
      const deleteSinglePin = async () => {
         dispatch(setDeletePinLoader(true));

         await client.delete(pinID);

         const path = getState().pin.path;

         if (path.startsWith('/') || path.startsWith('pin-details')) {
            const allPins = getState().pin.allPins;
            const filteredPins = allPins.filter(pin => pin._id !== pinID);
            dispatch(getAllPins(filteredPins));
         }

         if (path.startsWith('/profile')) {
            const tabValue = getState().pin.tabValue;
            if (tabValue === 'one') {
               const createdPins = getState().pin.createdPins;
               const filteredCreatedPins = createdPins.filter(pin => pin._id !== pinID);
               dispatch(setCreatedPins(filteredCreatedPins));
            } else {
               const savedPins = getState().pin.savedPins;
               const filteredSavedPins = savedPins.filter(pin => pin._id !== pinID);
               dispatch(setSavedPins(filteredSavedPins));

               const createdPins = getState().pin.createdPins;
               const filteredCreatedPins = createdPins.filter(pin => pin._id !== pinID);
               dispatch(setCreatedPins(filteredCreatedPins));
            }
         }

         dispatch(setDeletePinLoader(false));
         dispatch(toggleSnackbar());
         dispatch(setSnackbar({ value: true, text: 'Pin deleted successfully!' }));
      }

      try {
         await deleteSinglePin();
      } catch (error) {
         dispatch(setDeletePinLoader(false));
         dispatch(setErrorText(error.message));
      }
   }
}

// Add notification data to sanity
export const addNotificationData = (uid, data) => {
   return async (dispatch, getState) => {
      const addData = async () => {
         const query = userQuery(data.senderID);
         const user = await client.fetch(query);

         const message = data.type === 'save' ?
            `${user[0].userName} saved your pin` : data.type === 'unsave' ?
               `${user[0].userName} unsaved your pin` :
               `${user[0].userName} commented on your pin`;

         // Create the document
         const doc = {
            _type: 'notification',
            userId: uid,
            name: user[0].userName,
            image: user[0].image,
            pinId: data.pinID,
            message: message,
            createdAt: new Date().toISOString(),
            visited: false,
            notificationId: uuidv4()
         };

         // Upload the doc
         const newNotification = await client.create(doc);

         // Update the data on client
         const allNotifications = getState().pin.notificationData;
         const notificationCount = getState().pin.notificationCount;

         const modifiedNotifications = [newNotification, ...allNotifications];
         dispatch(setNotificationData(modifiedNotifications));
         dispatch(setNotificationCount(notificationCount + 1));

         // Update states
         dispatch(setGetScrolledNotifications(true));
      }

      try {
         await addData();
      } catch (error) {
         dispatch(setNotificationError(error.message));
         dispatch(setGetScrolledNotifications(true));
      }
   }
}

// Set notification data on sanity when user is offline
export const addNotificationDataWhenUserIsOffline = (uid, data) => {
   return async (dispatch) => {
      const sendData = async () => {
         const query = userQuery(data.senderID);
         const user = await client.fetch(query);

         const message = data.type === 'save' ?
            `${user[0].userName} saved your pin` : data.type === 'unsave' ?
               `${user[0].userName} unsaved your pin` :
               `${user[0].userName} commented on your pin`;

         // Create the document
         const doc = {
            _type: 'notification',
            userId: uid,
            name: user[0].userName,
            image: user[0].image,
            pinId: data.pinID,
            message: message,
            createdAt: new Date().toISOString(),
            visited: false,
            notificationId: uuidv4()
         };

         // Upload the doc
         await client.create(doc);
      }

      try {
         await sendData();
      } catch (error) {
         dispatch(setNotificationError(error.message));
         dispatch(setGetScrolledNotifications(true));
      }
   }
}

// Get notifications
export const getNotificationsData = (uid) => {
   return async (dispatch) => {
      const fetchNotifications = async () => {
         const query = notificationQuery(uid, 'initial');
         const notification = await client.fetch(query, { lastCreatedAt: '', lastPostId: '' });
         dispatch(setNotificationData(notification));
      }

      try {
         await fetchNotifications();
      } catch (error) {
         dispatch(setNotificationError(error.message));
      }
   }
}

// Get notification count
export const getNotificationCount = (uid) => {
   return async (dispatch) => {
      const fetchCount = async () => {
         const query = notificationCountQuery(uid);
         const notificationCount = await client.fetch(query);
         dispatch(setNotificationCount(notificationCount));
      }

      try {
         await fetchCount();
      } catch (error) {
         dispatch(setNotificationError(error.message));
      }
   }
}

// Load more notifications
export const loadMoreNotifications = (uid) => {
   return async (dispatch, getState) => {
      const fetchData = async () => {
         dispatch(setNotificationLoading(true));

         const allNotifications = getState().pin.notificationData;
         const lastCreatedAt = allNotifications[allNotifications.length - 1].createdAt;
         const lastPostId = allNotifications[allNotifications.length - 1]._id;

         const query = notificationQuery(uid);
         const notifications = await client.fetch(query, { lastCreatedAt, lastPostId });

         const data = [...allNotifications, ...notifications];
         dispatch(setNotificationData(data));

         if (notifications.length === 0) {
            dispatch(setGetScrolledNotifications(false));
         }

         dispatch(setNotificationLoading(false));
      }

      try {
         if (getState().pin.getScrolledNotifications) {
            await fetchData();
         }
      } catch (error) {
         dispatch(setNotificationError(error.message));
         dispatch(setScrollLoading(false));
      }
   }
}

// Update invidual notification as visited
export const markNotificationAsVisited = (notificationID) => {
   return async (dispatch, getState) => {
      const updateNotificationData = async () => {
         const updatedNotification = await client
            .patch(notificationID)
            .set({ visited: true })
            .commit()

         // Update the data on client
         const allNotifications = getState().pin.notificationData;
         const notificationCount = getState().pin.notificationCount;

         const modifiedNotifications = allNotifications.map(item => {
            if (item._id === updatedNotification._id) {
               return updatedNotification;
            }
            return item;
         });

         dispatch(setNotificationData(modifiedNotifications));
         dispatch(setNotificationCount(notificationCount - 1));
      }

      try {
         await updateNotificationData();
      } catch (error) {
         dispatch(setNotificationError(error.message));
      }
   }
}

// Delete a single notification
export const deleteSingleNotification = (notificationID) => {
   return async (dispatch, getState) => {
      const deleteNotification = async () => {
         const uid = getState().auth.user.id;
         const allNotifications = getState().pin.notificationData;
         const filteredNotifications = allNotifications.filter(notification => notification._id !== notificationID);
         dispatch(setNotificationData(filteredNotifications));

         await client.delete(notificationID);

         if (filteredNotifications.length === 0) {
            const lastCreatedAt = allNotifications[allNotifications.length - 1].createdAt;
            const lastPostId = allNotifications[allNotifications.length - 1]._id;

            const query = notificationQuery(uid);
            const notifications = await client.fetch(query, { lastCreatedAt, lastPostId });

            dispatch(setNotificationData(notifications));
         }

         dispatch(getNotificationCount(uid));

         dispatch(toggleSnackbar());
         dispatch(setSnackbar({ value: true, text: 'Notification deleted successfully!' }));
      }

      try {
         await deleteNotification();
      } catch (error) {
         dispatch(setNotificationError(error.message));
      }
   }
}