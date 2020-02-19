import React from 'react';

import ImagePrime from '../Image';

const Image = ({imgs, name, ...props}) => {

  if (imgs && imgs[name]) {
    return <ImagePrime image={imgs[name]} {...props} />;
  }
  return null;
}

export default Image;
