export default {
   name: 'notification',
   title: 'Notification',
   type: 'document',
   fields: [
      {
         name: 'userId',
         title: 'UserId',
         type: 'string'
      },
      {
         name: 'name',
         title: 'Name',
         type: 'string'
      },
      {
         name: 'image',
         title: 'Image',
         type: 'image',
         options: {
            hotspot: true
         }
      },
      {
         name: 'pinId',
         title: 'PinId',
         type: 'string'
      },
      {
         name: 'message',
         title: 'Message',
         type: 'string'
      },
      {
         name: 'createdAt',
         title: 'CreatedAt',
         type: 'datetime'
      },
      {
         name: 'visited',
         title: 'Visited',
         type: 'boolean'
      },
      {
         name: 'notificationId',
         title: 'NotificationId',
         type: 'string'
      }
   ]
}