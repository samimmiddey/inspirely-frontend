// Home pins query
export const homeQuery = (initial) => {
	const sign = initial ? '>' : '<';
	const query = `*[_type == "pin" && (
	createdAt ${sign} $lastCreatedAt || (createdAt == $lastCreatedAt && _id ${sign} $lastPostId)
	)] | order(createdAt desc) [0...20] {
  _id, title, category, destination, createdAt,
  postedBy->{
     _id, userName, image
   },
   image{
     asset->{
       url
     }
   },
   save[]{
     _key,
	  userId,
     postedBy->{
       _id, userName, image
     },
   },
}`

	return query;
};

// Category pins query
export const categoryQuery = (category, initial) => {
	const sign = initial ? '>' : '<';
	const query = `*[_type == "pin" && category match '${category}*' && (
		createdAt ${sign} $lastCreatedAt || (createdAt == $lastCreatedAt && _id ${sign} $lastPostId)
		)] | order(createdAt desc) [0...20] {
      _id, title, category, destination, createdAt,
      postedBy->{
         _id, userName, image
       },
       image{
         asset->{
           url
         }
       },
       save[]{
         _key,
			userId,
         postedBy->{
           _id, userName, image
         },
       },
    }`;

	return query;
};

// Fetch a single pin
export const pinDetailsQuery = (pinID) => {
	const query = `*[_type == "pin" && _id == '${pinID}']{
	  image{
		 asset->{
			url
		 }
	  },
	  _id,
	  title, 
	  about,
	  category,
	  destination,
	  createdAt,
	  postedBy->{
		 _id,
		 userName,
		 image
	  },
	 save[]{
		_key,
		userId,
		 postedBy->{
			_id, userName, image
		 },
	  },
	  comments[]{
		 comment,
		 createdAt,
		 _key,
		 postedBy->{
			_id, userName, image
		 },
	  }
	}`;

	return query;
};

export const userQuery = (userId) => {
	const query = `*[_type == "user" && _id == '${userId}']`;
	return query;
};

// User created pins query
export const createdPinsQuery = (userId, initial) => {
	const sign = initial ? '>' : '<';
	const query = `*[ _type == 'pin' && userId == '${userId}' && (
		createdAt ${sign} $lastCreatedAt || (createdAt == $lastCreatedAt && _id ${sign} $lastPostId)
		)] | order(createdAt desc) [0...20] {
			_id, title, category, destination, createdAt,
			postedBy->{
				_id, userName, image
			 },
			 image{
				asset->{
				  url
				}
			 },
			 save[]{
				_key,
				userId,
				postedBy->{
				  _id, userName, image
				},
			 },
	}`;

	return query;
};

// USer saved pins query
export const savedPinsQuery = (userId, initial) => {
	const sign = initial ? '>' : '<';
	const query = `*[_type == 'pin' && '${userId}' in save[].userId && (
		createdAt ${sign} $lastCreatedAt || (createdAt == $lastCreatedAt && _id ${sign} $lastPostId)
		)] | order(createdAt desc) [0...20] {
			_id, title, category, destination, createdAt,
			postedBy->{
				_id, userName, image
			 },
			 image{
				asset->{
				  url
				}
			 },
			 save[]{
				_key,
				userId,
				postedBy->{
				  _id, userName, image
				},
			 },
	}`;

	return query;
};

// Search pins query
export const searchQuery = (searchTerm, initial) => {
	const sign = initial ? '>' : '<';
	const query = `*[_type == 'pin' && (title match '${searchTerm}*' || category match '${searchTerm}*' || about match '${searchTerm}*' || postedBy->userName match '${searchTerm}') && (createdAt ${sign} $lastCreatedAt || (createdAt == $lastCreatedAt && _id ${sign} $lastPostId))] | order(createdAt desc) [0...20] {
	  _id, title, category, destination, createdAt,
	  postedBy->{
		  _id, userName, image
		},
		image{
		  asset->{
			 url
		  }
		},
		save[]{
		  _key,
		  userId,
		  postedBy->{
			 _id, userName, image
		  },
		},
	}`

	return query;
};

export const userSearchQuery = (searchTerm, initial) => {
	const sign = initial ? '>' : '<';
	const query = `*[_type == 'user' && (userName match '${searchTerm}*' || email match '${searchTerm}*') && (createdAt ${sign} $lastCreatedAt || (createdAt == $lastCreatedAt && _id ${sign} $lastUserId))] | order(createdAt desc) [0...20]`

	return query;
};

// Get notifications
export const notificationQuery = (userId, initial) => {
	const sign = initial ? '>' : '<';
	const query = `*[_type == "notification" && '${userId}' == userId && (
		createdAt ${sign} $lastCreatedAt || (createdAt == $lastCreatedAt && _id ${sign} $lastPostId)
		)] | order(createdAt desc) [0...5]`;

	return query;
};

// Get total number of notifications
export const notificationCountQuery = (userId) => {
	const query = `count(*[_type == "notification" && '${userId}' == userId && visited == false])`;

	return query;
};