import React from 'react';

import './Divider.scss';

const Divider = ({ weight }) => {
  return <span className={`divider ${weight && `divider--${weight}`}`} />;
};

export default Divider;