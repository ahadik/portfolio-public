import React from 'react';

import VideoPrime from '../Video';

// This is just a wrapper that helps deal with some Gatsby idiosyncrasies and makes writing MDX posts a little easier and less error prone.
const Video = ({vids, name, ...props}) => {

  if (vids && vids[name]) {
    return <VideoPrime src={vids[name].publicURL} {...props} />;;
  }
  return null;
}

export default Video;
