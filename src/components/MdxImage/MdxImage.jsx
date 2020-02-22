import React from 'react';

import ImagePrime from '../Image';

// This is just a wrapper that helps deal with some Gatsby idiosyncrasies and makes writing MDX posts a little easier and less error prone.
const Image = ({imgs, name, ...props}) => {

  if (imgs && imgs[name]) {
    return <ImagePrime image={imgs[name]} {...props} />;
  }
  return null;
}

export default Image;
