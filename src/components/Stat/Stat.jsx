import React from 'react';
import classnames from 'classnames';

import './Stat.scss';

const Stat = ({ header, value, invert }) => {
  return (
    <div className="stat">
      <p className={classnames('caption', 'stat__header', {'invert' : invert})}>{header}</p>
      <p className={classnames('caption', 'stat__value', {'invert' : invert})}>{value}</p>
    </div>
  );
}

export default Stat;
