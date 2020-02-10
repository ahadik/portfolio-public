import React from 'react';
import classnames from 'classnames';

import './MobileMenuToggle.scss';

const MobileMenuToggle = ({ isOpen }) => {
  return (
    <div className={classnames('mobile-menu-toggle', {'mobile-menu-toggle--close': isOpen})}>
      <span className="mobile-menu-toggle__bar" />
      <span className="mobile-menu-toggle__bar" />
      <span className="mobile-menu-toggle__bar" />
    </div>
  );
};

export default MobileMenuToggle;
