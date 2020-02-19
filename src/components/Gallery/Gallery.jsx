import React from 'react';

import './Gallery.scss';

// Renders only Image children, and sets up an auto-layout such that all children are in a row on desktop, and stacked on mobile.
const Gallery = ({children, caption}) => {

  return (
    <div className="gallery">
      {React.Children.map(children, (child) => {
        if((child.props.mdxType === 'Image') && (child.props.imgs && child.props.name)) {
          const image = child.props.imgs[child.props.name]
          return (<div className="gallery__item" style={{ flexGrow: image.aspectRatio }}>{child}</div>);
        }
      })}
      <If condition={caption}>
        <div className="gallery__caption">
          <p className="monospace caption">{caption}</p>
        </div>
      </If>
      </div>
  );
}

export default Gallery;
