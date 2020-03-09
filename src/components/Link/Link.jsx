import React from 'react';
import { Link as GatsbyLink } from 'gatsby';
import PropTypes from 'prop-types';

import './Link.scss';

const Link = ({ to, href, children, ...props }) => {
  return (
    <Choose>
      <When condition={to}>
        <GatsbyLink className="link" to={to} {...props}>{children}</GatsbyLink>
      </When>
      <When condition={href}>
        <a className="link" href={href} target="_blank" rel="noopener noreferrer">{children}</a>
      </When>
    </Choose>
  );
}

Link.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node)
  ]).isRequired,
  href: PropTypes.string,
  to: PropTypes.string
}

export default Link;
