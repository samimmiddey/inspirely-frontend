export default {
   name: 'user',
   title: 'User',
   type: 'document',
   fields: [
      {
         name: 'userName',
         title: 'UserName',
         type: 'string'
      },
      {
         name: 'about',
         title: 'About',
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
         name: 'email',
         title: 'Email',
         type: 'string'
      },
      {
         name: 'phone',
         title: 'PhoneNumber',
         type: 'string'
      },
      {
         name: 'website',
         title: 'Website',
         type: 'string'
      },
      {
         name: 'address',
         title: 'Address',
         type: 'string'
      },
      {
         name: 'createdAt',
         title: 'CreatedAt',
         type: 'datetime'
      },
      {
         name: 'verified',
         title: 'Verified',
         type: 'boolean'
      }
   ]
}