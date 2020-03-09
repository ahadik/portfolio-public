import React from 'react';

import ImagePrime from '../Image';

// This is just a wrapper that helps deal with some Gatsby idiosyncrasies and makes writing MDX posts a little easier and less error prone.
const Image = ({imgs, name, ...props}) => {

  if (imgs && imgs[name]) {
    if (imgs[name].fluid) {
      return <ImagePrime image={imgs[name].fluid} {...props} />;
    } else if (imgs[name].publicURL) {
      return <img src={imgs[name].publicURL} {...props} />;
    }
  }
  return null;
}

export default Image;
