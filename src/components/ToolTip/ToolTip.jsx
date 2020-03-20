import React from 'react';
import Tooltip from 'rc-tooltip';
import PropTypes from 'prop-types';

import './ToolTip.scss';

const ToolTip = ({ content, children }) => {
  return (
    <Tooltip placement="top" overlayClassName="tool-tip__tip serif caption" prefixCls="rc-tooltip-dark" overlay={<span className="tool-tip__text">{content}</span>} arrowContent={<div className="rc-tooltip-arrow-inner"></div>}>
      <span className="tool-tip__spawner">{children}</span>
    </Tooltip>
  );
}

ToolTip.propTypes = {
  content: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node
  ]).isRequired,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node)
  ]).isRequired
}

export default ToolTip;
