import React from 'react';
import { Oval } from 'react-loader-spinner';

const ButtonProgress = ({ height, width }) => {
   return (
      <Oval
         height={height ? height : 30}
         width={width ? width : 30}
         color='#9e9e9e'
         visible={true}
         ariaLabel='oval-loading'
         secondaryColor='#adaabb'
         strokeWidth={4}
         strokeWidthSecondary={4}
      />
   );
};

export default ButtonProgress;