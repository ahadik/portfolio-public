import React from 'react';
import classnames from 'classnames';

import './Tag.scss';

const Tag = ({ icon, name, onClose }) => {
  return (
    <div className="option-tag inline__children--2">
      <If condition={icon}>
        <i className={classnames('option-tagtag__icon', icon)} />
      </If>
      <span className="monospace caption">{name}</span>
      <If condition={onClose}>
      <i className="option-tagtag__times-icon fal fa-times" onClick={onClose} />
      </If>
    </div>
  );
};

export default Tag;
