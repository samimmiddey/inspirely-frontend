import React from 'react';
import UpdateEmail from './UpdateEmail';
import UpdatePassword from './UpdatePassword';
import DeleteAccount from './DeleteAccount';

const UpdateInfo = ({ settingsID, mdWidth, user }) => {
   const value = settingsID.replace('-', ' ').split(' ')[1];

   return (
      <>
         {
            value === 'email' ? <UpdateEmail mdWidth={mdWidth} user={user} /> :
               value === 'password' ? <UpdatePassword user={user} mdWidth={mdWidth} /> :
                  <DeleteAccount user={user} />
         }
      </>
   );
};

export default UpdateInfo;