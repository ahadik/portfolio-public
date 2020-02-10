import React from 'react';
import { Link } from 'gatsby';

import './Link.scss';

const Link = ({ to, children }) => {
  return (
  <span className="link"><Link to={to}>{children}</Link></span>
  );
}

export default Link;
