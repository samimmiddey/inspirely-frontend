export default {
   name: 'auth',
   title: 'Auth',
   type: 'document',
   fields: [
      {
         name: 'title',
         title: 'Title',
         type: 'string'
      },
      {
         name: 'image',
         title: 'Image',
         type: 'image',
         options: {
            hotspot: true
         }
      }
   ]
}