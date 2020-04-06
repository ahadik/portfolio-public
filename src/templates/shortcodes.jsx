import React from 'react';

import Note from '~components/Note';
import Image from '~components/MdxImage';
import Video from '~components/MdxVideo';
import Link from "~components/Link";
import MdxLayout from '~components/MdxLayout';
import TextTip from '~components/TextTip';
import ToolTip from '~components/ToolTip';
import ArrowFlow from '~components/ArrowFlow';
import ItemBlurb from '~components/ItemBlurb';
import Gallery from '~components/Gallery';
import Button from '~components/Button';
import Citation from '~components/Citation';
import VideoEmbed from '~components/VideoEmbed';
import ButtonGroup from '~components/ButtonGroup';

const generateShortcodes = (postMedia) => {
  return {
    Link,
    Image: function(props) {
      return <Image imgs={postMedia.images} {...props} />
    },
    Video: function(props) {
      return <Video vids={postMedia.videos} {...props} />
    },
    MdxLayout,
    TextTip,
    ToolTip,
    ArrowFlow,
    ItemBlurb,
    Note,
    Gallery: function(props) {
      return <Gallery {...props} imgs={postMedia.images} />;
    },
    Button,
    ButtonGroup,
    VideoEmbed,
    cite: Citation
  };
}

export default generateShortcodes;
