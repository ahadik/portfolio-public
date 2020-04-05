import React from "react";
import PropTypes from 'prop-types';

import './Video.scss';

const Video = ({ src, caption }) => {
  return (
    <div className="video">
      <video className="video__media" controls>
        <source src={src} type="video/mp4" />
      </video>
      <If condition={caption}>
        <figcaption className="caption monospace video__caption">{caption}</figcaption>
      </If>
    </div>
  );
}

Video.propTypes = {
  src: PropTypes.string,
  caption: PropTypes.string
}

export default Video;
