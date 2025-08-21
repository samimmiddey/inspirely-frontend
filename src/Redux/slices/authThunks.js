import { auth, db } from '../../Firebase/firebase';
import { setUser, setAuthLoading, setAuthErrorText, setResetPasswordEmailSent, setGetUserDataLoading, setAddUserDataLoading, setOnSignUpLoading, setVerifyEmailLoading, setUploadPicLoading } from './authSlice';
import { toggleSnackbar, setSnackbar } from './uiSlice';
import {
   createUserWithEmailAndPassword,
   signInWithEmailAndPassword,
   signOut,
   signInWithPopup,
   GoogleAuthProvider,
   FacebookAuthProvider,
   setPersistence,
   browserSessionPersistence,
   browserLocalPersistence,
   browserPopupRedirectResolver,
   sendPasswordResetEmail,
   updateEmail,
   updatePassword,
   reauthenticateWithCredential,
   EmailAuthProvider,
   deleteUser,
   sendEmailVerification
} from 'firebase/auth';
import { doc, setDoc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";
import ErrorMessages from '../../Firebase/ErrorMessages';
import { client } from '../../Client/client';
import { resetPinSlice } from './pinSlice';
import axios from 'axios';

// Create an account with email & password
export const signUp = ({ name, email, password }) => {
   return async (dispatch) => {
      const createAnAccount = async () => {
         dispatch(setAuthLoading(true));

         // Set Persistence
         await setPersistence(auth, browserLocalPersistence);

         // Create an account
         const response = await createUserWithEmailAndPassword(auth, email, password);

         if (!response) {
            throw new Error('Something went wrong!');
         }

         // Store data on firestore database
         dispatch(setOnSignUpLoading(true));
         await setDoc(doc(db, 'users', response.user.uid), {
            id: response.user.uid,
            name: name,
            email: response.user.email,
            verified: response.user.emailVerified,
            photoURL: response.user.photoURL
         });

         // Initiate user on sanity
         await client.createIfNotExists({
            _id: response.user.uid,
            _type: 'user',
            userName: name,
            email: email,
            verified: response.user.emailVerified,
            createdAt: new Date().toISOString()
         });

         // Set user data on client
         dispatch(setUser({
            id: response.user.uid,
            name: name,
            email: response.user.email,
            verified: response.user.emailVerified,
            photoURL: response.user.photoURL
         }));

         dispatch(setOnSignUpLoading(false));
         dispatch(setAuthLoading(false));
      }

      try {
         await createAnAccount();
      } catch (error) {
         const errorMessage = ErrorMessages.find(item => item.code === error.code);

         let message;
         if (errorMessage) {
            message = errorMessage.message;
         } else {
            message = error.message;
         }

         dispatch(setAuthErrorText(message));
         dispatch(setOnSignUpLoading(false));
         dispatch(setAuthLoading(false));
      }
   }
};

// Sign in user with email & password
export const signIn = ({ email, password }, rememberMe) => {
   return async (dispatch) => {
      const signInUser = async () => {
         dispatch(setAuthLoading(true));

         // Set Persistence
         if (rememberMe) {
            await setPersistence(auth, browserLocalPersistence);
         } else {
            await setPersistence(auth, browserSessionPersistence);
         }

         // Sign in
         const response = await signInWithEmailAndPassword(auth, email, password);

         if (!response) {
            throw new Error('Something went wrong!');
         }

         dispatch(setAuthLoading(false));
      }

      try {
         await signInUser();
      } catch (error) {
         const errorMessage = ErrorMessages.find(item => item.code === error.code);

         let message;
         if (errorMessage) {
            message = errorMessage.message;
         } else {
            message = error.message;
         }

         dispatch(setAuthErrorText(message));
         dispatch(setAuthLoading(false));
      }
   }
};

// Sign in user with google
export const signInWithGoogle = () => {
   return async (dispatch) => {
      const signInUserWithGoogle = async () => {
         dispatch(setAuthLoading(true));

         // Set Persistence
         await setPersistence(auth, browserLocalPersistence);

         // Sign in
         const provider = new GoogleAuthProvider();
         const response = await signInWithPopup(auth, provider, browserPopupRedirectResolver);

         if (!response) {
            throw new Error('Something went wrong!');
         }

         // Check whether this account exists on firebase on not
         dispatch(setOnSignUpLoading(true));
         const docRef = doc(db, 'users', response.user.uid);
         const docSnap = await getDoc(docRef);

         // Check if account data exists on firestore database
         if (!docSnap.exists()) {
            // Store data on firestore database if it does not exist
            await setDoc(doc(db, 'users', response.user.uid), {
               id: response.user.uid,
               name: response.user.displayName,
               email: 'Signed in with Google',
               photoURL: response.user.photoURL
            });

            // Grab the image from URL
            const imageBuffer = await axios
               .get(response.user.photoURL, { responseType: 'arraybuffer' })
               .then(res => Buffer.from(res.data, 'utf-8'));

            // Upload image on sanity
            const imageAsset = await client.assets.upload('image', imageBuffer);

            // Initiate user on sanity
            await client.createIfNotExists({
               _id: response.user.uid,
               _type: 'user',
               userName: response.user.displayName,
               email: 'Signed in with Google',
               image: {
                  _type: 'image',
                  asset: {
                     _type: 'reference',
                     _ref: imageAsset._id,
                  },
               },
               verified: false,
               createdAt: new Date().toISOString()
            });

            // Set user data on client
            dispatch(setUser({
               id: response.user.uid,
               name: response.user.displayName,
               email: 'Signed in with Google',
               photoURL: response.user.photoURL
            }));
         }

         dispatch(setOnSignUpLoading(false));
         dispatch(setAuthLoading(false));
      }

      try {
         await signInUserWithGoogle();
      } catch (error) {
         const errorMessage = ErrorMessages.find(item => item.code === error.code);

         let message;
         if (errorMessage) {
            message = errorMessage.message;
         } else {
            message = error.message;
         }

         dispatch(setAuthErrorText(message));
         dispatch(setOnSignUpLoading(false));
         dispatch(setAuthLoading(false));
      }
   }
};

// Sign in user with facebook
export const signInWithFacebook = () => {
   return async (dispatch) => {
      const signInUserWithFacebook = async () => {
         dispatch(setAuthLoading(true));

         // Set persistence
         await setPersistence(auth, browserLocalPersistence);

         // Sign in
         const provider = new FacebookAuthProvider();
         const response = await signInWithPopup(auth, provider, browserPopupRedirectResolver);

         if (!response) {
            throw new Error('Something went wrong!');
         }

         // Check whether this account exists on firebase on not
         dispatch(setOnSignUpLoading(true));
         const docRef = doc(db, 'users', response.user.uid);
         const docSnap = await getDoc(docRef);

         // Check if account data exists on firestore database
         if (!docSnap.exists()) {
            // Store data on firestore database if it does not exist
            await setDoc(doc(db, 'users', response.user.uid), {
               id: response.user.uid,
               name: response.user.displayName,
               email: 'Signed in with Facebook',
               photoURL: response.user.photoURL
            });

            // Grab the image from URL
            const imageBuffer = await axios
               .get(response.user.photoURL, { responseType: 'arraybuffer' })
               .then(res => Buffer.from(res.data, 'utf-8'));

            // Upload image on sanity
            const imageAsset = await client.assets.upload('image', imageBuffer);

            // Initiate user on sanity
            await client.createIfNotExists({
               _id: response.user.uid,
               _type: 'user',
               userName: response.user.displayName,
               email: 'Signed in with Facebook',
               image: {
                  _type: 'image',
                  asset: {
                     _type: 'reference',
                     _ref: imageAsset._id,
                  },
               },
               verified: false,
               createdAt: new Date().toISOString()
            });

            // Set user data on client
            dispatch(setUser({
               id: response.user.uid,
               name: response.user.displayName,
               email: 'Signed in with Facebook',
               photoURL: response.user.photoURL
            }));
         }

         dispatch(setOnSignUpLoading(false));
         dispatch(setAuthLoading(false));
      }

      try {
         await signInUserWithFacebook();
      } catch (error) {
         const errorMessage = ErrorMessages.find(item => item.code === error.code);

         let message;
         if (errorMessage) {
            message = errorMessage.message;
         } else {
            message = error.message;
         }

         dispatch(setAuthErrorText(message));
         dispatch(setOnSignUpLoading(false));
         dispatch(setAuthLoading(false));
      }
   }
};

// Sign out user
export const logOut = () => {
   return async (dispatch) => {
      const signOutUser = async () => {
         dispatch(setAuthLoading(true));

         // Signing out the user
         await signOut(auth);

         // Setting the pin slice to initial state
         dispatch(resetPinSlice());

         dispatch(setAuthLoading(false));
      }

      try {
         await signOutUser();
      } catch (error) {
         const errorMessage = ErrorMessages.find(item => item.code === error.code);

         let message;
         if (errorMessage) {
            message = errorMessage.message;
         } else {
            message = error.message;
         }

         dispatch(setAuthErrorText(message));
         dispatch(setAuthLoading(false));
      }
   }
};

// Get user data
export const getUserData = (uid) => {
   return async (dispatch, getState) => {
      const fetchUserData = async () => {
         dispatch(setGetUserDataLoading(true));

         // Get a ref
         const docRef = doc(db, 'users', uid);

         // Set user data
         const docSnap = await getDoc(docRef);

         if (docSnap.data()) {
            dispatch(setUser(docSnap.data()));
         }

         // Update user data but this executes only once
         // This only executes when email is verified on server but not on client
         if (
            auth.currentUser.emailVerified &&
            !getState().auth.user.verified &&
            (
               getState().auth.user.email !== 'Signed in with Google' ||
               getState().auth.user.email !== 'Signed in with Facebook'
            )
         ) {
            // Update the verified field on firebase
            await updateDoc(docRef, {
               verified: true
            });

            // Update the verified field on sanity
            await client
               .patch(getState().auth.user.id)
               .set({ verified: true })
               .commit()

            // Set user data on client again after updating
            const docSnap = await getDoc(docRef);
            dispatch(setUser(docSnap.data()));
         }

         dispatch(setGetUserDataLoading(false));
      }

      try {
         await fetchUserData();
      } catch (error) {
         const errorMessage = ErrorMessages.find(item => item.code === error.code);

         let message;
         if (errorMessage) {
            message = errorMessage.message;
         } else {
            message = error.message;
         }

         dispatch(setAuthErrorText(message));
         dispatch(setGetUserDataLoading(false));
      }
   }
};

// Upload user picture on sanity
export const uploadPicture = ({ image }) => {
   return async (dispatch, getState) => {
      const uploadData = async () => {
         dispatch(setUploadPicLoading(true));

         const userID = getState().auth.user.id;

         // Upload image on sanity
         const imageAsset = await client.assets.upload('image', image[0], {
            contentType: image.type,
            filename: image.name
         });

         // Update sanity user image field
         await client
            .patch(userID)
            .set({
               image: {
                  _type: 'image',
                  asset: {
                     _type: 'reference',
                     _ref: imageAsset._id,
                  },
               },
            })
            .commit()

         // Update user data on firebase
         const docRef = doc(db, 'users', userID);
         await updateDoc(docRef, {
            photoURL: imageAsset.url
         });

         // Get user data and update on client
         const userRef = doc(db, 'users', userID);
         const docSnap = await getDoc(userRef);
         dispatch(setUser(docSnap.data()));

         dispatch(setUploadPicLoading(false));
         dispatch(toggleSnackbar());
         dispatch(setSnackbar({ value: true, text: 'Picture uploaded successfully!' }));
      }

      try {
         await uploadData();
      } catch (error) {
         dispatch(setUploadPicLoading(false));
         console.log(error.message);
      }
   }
};

// Set additional user data
export const setUserData = (data, uid) => {
   return async (dispatch, getState) => {
      const setAdditionalUserData = async () => {
         dispatch(setAddUserDataLoading(true));

         // Update user data on firebase
         const docRef = doc(db, 'users', uid);
         await updateDoc(docRef, data);

         // Update user data on sanity
         await client
            .patch(getState().auth.user.id)
            .set({
               userName: data.name,
               about: data.about,
               phone: data.phone,
               website: data.website,
               address: data.address
            })
            .commit()

         // Get user data & update on client
         const userRef = doc(db, 'users', uid);
         const docSnap = await getDoc(userRef);
         dispatch(setUser(docSnap.data()));

         dispatch(setAddUserDataLoading(false));
         dispatch(toggleSnackbar());
         dispatch(setSnackbar({ value: true, text: 'Successfully updated info!' }));
         dispatch(setResetPasswordEmailSent(true));
      }

      try {
         await setAdditionalUserData();
      } catch (error) {
         const errorMessage = ErrorMessages.find(item => item.code === error.code);

         let message;
         if (errorMessage) {
            message = errorMessage.message;
         } else {
            message = error.message;
         }

         dispatch(setAuthErrorText(message));
         dispatch(setGetUserDataLoading(false));
      }
   }
};

// Reset Password
export const resetPassword = ({ email }) => {
   return async (dispatch) => {
      const resetUserPassword = async () => {
         dispatch(setAuthLoading(true));
         await sendPasswordResetEmail(auth, email);

         dispatch(setAuthLoading(false));
         dispatch(toggleSnackbar());
         dispatch(setSnackbar({ value: true, text: 'Reset password email sent!' }));
         dispatch(setResetPasswordEmailSent(true));
      }

      try {
         await resetUserPassword();
      } catch (error) {
         const errorMessage = ErrorMessages.find(item => item.code === error.code);

         let message;
         if (errorMessage) {
            message = errorMessage.message;
         } else {
            message = error.message;
         }

         dispatch(setAuthErrorText(message));
         dispatch(setAuthLoading(false));
      }
   }
};

// Update email address
export const updateEmailAddress = ({ oldEmail, oldPassword, newEmail }, uid) => {
   return async (dispatch, getState) => {
      const updateUserEmail = async () => {
         dispatch(setAuthLoading(true));

         // Create credential
         const credential = EmailAuthProvider.credential(
            oldEmail,
            oldPassword
         );

         // Re-authenticate before updating the email
         await reauthenticateWithCredential(auth.currentUser, credential);

         // Update the email
         await updateEmail(auth.currentUser, newEmail);

         // Update firestore data
         const docRef = doc(db, 'users', uid);
         await updateDoc(docRef, {
            email: newEmail
         });

         // Update email on sanity
         await client
            .patch(getState().auth.user.id)
            .set({ email: newEmail })
            .commit()

         // Get user data & update on client
         const userRef = doc(db, 'users', uid);
         const docSnap = await getDoc(userRef);
         dispatch(setUser(docSnap.data()));

         dispatch(setAuthLoading(false));
         dispatch(toggleSnackbar());
         dispatch(setSnackbar({ value: true, text: 'Successfully updated email!' }));
      }

      try {
         await updateUserEmail();
      } catch (error) {
         const errorMessage = ErrorMessages.find(item => item.code === error.code);

         let message;
         if (errorMessage) {
            message = errorMessage.message;
         } else {
            message = error.message;
         }

         dispatch(setAuthErrorText(message));
         dispatch(setAuthLoading(false));
      }
   }
};

// Update password
export const updateUserPassword = ({ oldEmail, oldPassword, newPassword }) => {
   return async (dispatch) => {
      const changeUserPassword = async () => {
         dispatch(setAuthLoading(true));

         // Create credential
         const credential = EmailAuthProvider.credential(
            oldEmail,
            oldPassword
         );

         // Re-authenticate before updating the password
         await reauthenticateWithCredential(auth.currentUser, credential);

         // Update the password
         await updatePassword(auth.currentUser, newPassword);

         dispatch(setAuthLoading(false));
         dispatch(toggleSnackbar());
         dispatch(setSnackbar({ value: true, text: 'Successfully updated password!' }));
      }

      try {
         await changeUserPassword();
      } catch (error) {
         const errorMessage = ErrorMessages.find(item => item.code === error.code);

         let message;
         if (errorMessage) {
            message = errorMessage.message;
         } else {
            message = error.message;
         }

         dispatch(setAuthErrorText(message));
         dispatch(setAuthLoading(false));
      }
   }
};

// Verify email address
export const verifyEmail = () => {
   return async (dispatch) => {
      const verifyEmailAddress = async () => {
         dispatch(setVerifyEmailLoading(true));

         // Send email verification mail
         await sendEmailVerification(auth.currentUser);

         dispatch(setVerifyEmailLoading(false));
         dispatch(setAuthLoading(false));
         dispatch(toggleSnackbar());
         dispatch(setSnackbar({ value: true, text: 'Verification email sent!' }));
      }

      try {
         await verifyEmailAddress();
      } catch (error) {
         const errorMessage = ErrorMessages.find(item => item.code === error.code);

         let message;
         if (errorMessage) {
            message = errorMessage.message;
         } else {
            message = error.message;
         }

         dispatch(setAuthErrorText(message));
         dispatch(setVerifyEmailLoading(false));
      }
   }
}

// Delete account
export const deleteAccount = ({ oldEmail, oldPassword }, uid) => {
   return async (dispatch, getState) => {
      const deleteUserAccount = async () => {
         dispatch(setAuthLoading(true));

         // Create credential
         const credential = EmailAuthProvider.credential(
            oldEmail,
            oldPassword
         );

         // Re-authenticate before deleting the account
         await reauthenticateWithCredential(auth.currentUser, credential);

         // DELETE SANITY USER
         // Get user ID
         const userId = getState().auth.user.id;

         // Deleting user created pins
         await client.delete({ query: `*[_type == 'pin' && userId == '${userId}']` });

         // Removing user saved pins
         const savedPinsToRemove = [`save[userId=="${userId}"]`];
         await client
            .patch({ query: `*['${userId}' in save[].userId]` })
            .unset(savedPinsToRemove)
            .commit()

         // Removing user comments
         const commentsToRemove = [`comments[userId=="${userId}"]`];
         await client
            .patch({ query: `*['${userId}' in comments[].userId]` })
            .unset(commentsToRemove)
            .commit()

         // Deleting user notifications
         await client.delete({ query: `*[_type == 'notification' && userId == '${userId}']` });

         // Deleting the user account
         await client.delete(userId);

         // Delete the accout
         await deleteUser(auth.currentUser);

         // Delete firestore data
         await deleteDoc(doc(db, 'users', uid));

         // set user null on client
         dispatch(setUser(null));

         // Setting the pin slice to initial state
         dispatch(resetPinSlice());

         dispatch(setAuthLoading(false));
         dispatch(toggleSnackbar());
         dispatch(setSnackbar({ value: true, text: 'Deleted account successfully!' }));
      }

      try {
         await deleteUserAccount();
      } catch (error) {
         const errorMessage = ErrorMessages.find(item => item.code === error.code);

         let message;
         if (errorMessage) {
            message = errorMessage.message;
         } else {
            message = error.message;
         }

         dispatch(setAuthErrorText(message));
         dispatch(setAuthLoading(false));
      }
   }
};