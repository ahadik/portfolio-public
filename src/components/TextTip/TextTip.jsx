import React from 'react';
import Tooltip from 'rc-tooltip';
import PropTypes from 'prop-types';

import './TextTip.scss';

const TextTip = ({ content, children }) => {
  return (
    <Tooltip placement="top" overlayClassName="text-tip__tip serif caption" overlay={<span>{content}</span>} arrowContent={<div className="rc-tooltip-arrow-inner"></div>}>
      <span className="text-tip__spawner">{children}</span>
    </Tooltip>
  );
}

TextTip.propTypes = {
  content: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node
  ]).isRequired,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node)
  ]).isRequired
}

export default TextTip;
