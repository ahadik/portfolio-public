import React from 'react';
import PropTypes from 'prop-types';

import './YouTube.scss';

const YouTube = ({ src, proportion }) => {
  return (
    <div className="youtube" style={{ paddingTop: `${proportion * 100}%` }}>
      <iframe
        className="youtube__embed"
        width="100%" 
        height="100%"
        src={src}
        frameBorder="0"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
}

YouTube.defaultProps = {
  proportion: 0.5625
}

export default YouTube;
