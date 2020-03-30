import React from 'react';

import Image from '~components/MdxImage';
import Link from "~components/Link";
import MdxLayout from '~components/MdxLayout';
import TextTip from '~components/TextTip';
import ToolTip from '~components/ToolTip';
import ArrowFlow from '~components/ArrowFlow';
import ItemBlurb from '~components/ItemBlurb';
import Gallery from '~components/Gallery';
import Button from '~components/Button';
import Citation from '~components/Citation';
import YouTube from '~components/YouTube';

const generateShortcodes = (postImages) => {
  return {
    Link,
    Image: function(props) {
      return <Image imgs={postImages} {...props} />
    },
    MdxLayout,
    TextTip,
    ToolTip,
    ArrowFlow,
    ItemBlurb,
    Gallery: function(props) {
      return <Gallery {...props} imgs={postImages} />;
    },
    Button,
    YouTube,
    cite: Citation
  };
}

export default generateShortcodes;
