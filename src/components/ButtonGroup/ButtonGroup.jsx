import React from 'react';
import classnames from 'classnames';

import './ButtonGroup.scss';

const ButtonGroup = ({ children, orientation }) => {
  return (
    <div
      className={classnames(
        'button-group',
        'stack__children--6',
        {
          'button-group--vertical': orientation == 'vertical',
          'button-group--horizontal': orientation == 'horizontal'
        }
      )}>
        {children}
    </div>
  );
}

export default ButtonGroup;
