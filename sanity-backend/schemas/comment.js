export default {
   name: 'comment',
   title: 'Comment',
   type: 'document',
   fields: [
      {
         name: 'postedBy',
         title: 'PostedBy',
         type: 'postedBy'
      },
      {
         name: 'createdAt',
         title: 'CreatedAt',
         type: 'datetime'
      },
      {
         name: 'comment',
         title: 'Comment',
         type: 'string'
      }
   ]
}