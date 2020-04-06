import React from 'react';
import PropTypes from 'prop-types';

import './VideoEmbed.scss';

const VideoEmbed = ({ id, source, proportion }) => {
  return (
    <div className="video-embed" style={{ paddingTop: `${proportion * 100}%` }}>
      <Choose>
        <When condition={source === 'youtube'}>
          <iframe
            className="video-embed__player"
            width="100%" 
            height="100%"
            src={`https://www.youtube.com/embed/${id}`}
            frameBorder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </When>
        <When condition={source === 'vimeo'}>
          <iframe
            className="video-embed__player"
            src={`https://player.vimeo.com/video/${id}`}
            width="100%"
            height="100%"
            frameborder="0"
            allow="autoplay; fullscreen"
            allowfullscreen
          ></iframe>
        </When>
      </Choose>
    </div>
  );
}

VideoEmbed.defaultProps = {
  proportion: 0.5625
}

VideoEmbed.propTypes = {
  src: PropTypes.string,
  source: PropTypes.oneOf(['vimeo', 'youtube']),
  proportion: PropTypes.number
}

export default VideoEmbed;
