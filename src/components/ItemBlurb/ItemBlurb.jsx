import React from 'react';
import PropTypes from 'prop-types';

import './ItemBlurb.scss';

const ItemBlurb = ({ image, children, imageSize }) => {

  let imageWrapperStyle = {};

  if (imageSize) {
    if (imageSize.width) {
      imageWrapperStyle.maxWidth = imageSize.width;
    }

    if (imageSize.height) {
      imageWrapperStyle.maxHeight = imageSize.height;
    }
  }

  return (
    <div className="item-blurb stack__children--4">
      <div className="item-blurb__image" style={imageWrapperStyle}>
        {image}
      </div>
      {children}
    </div>
  );
}

export default ItemBlurb;
