import React from 'react';

import Link from '~components/Link';

const Citation = (props) => {
  if (props.children.length === 1) {
    return <span> — <Link href={props.children.props.href}><span className="monospace">{props.children.props.children}</span></Link></span>;
  }
  return <span className="monospace"> — {props.children}</span>;
}

export default Citation;
