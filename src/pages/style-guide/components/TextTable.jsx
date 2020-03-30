import React from 'react';
import classnames from 'classnames';

import './TextTable.scss';

const TextTableColumn = ({ format, font }) => {
  const classes = {
    'mobile': format === 'mobile'
  };

  return(
    <div
      className={
        classnames(
          'text-table-column',
          classes
        )
      }
    >
      <div><p className="monospace text-table-column__header">{format}</p></div>
      <div className="text-table-column__cell"><h1 className={classnames(font, 'headline')}>Headline</h1></div>
      <div className="text-table-column__cell"><h1 className={classnames(font)}>Heading 1</h1></div>
      <div className="text-table-column__cell"><h2 className={classnames(font)}>Heading 2</h2></div>
      <div className="text-table-column__cell"><h3 className={classnames(font)}>Heading 3</h3></div>
      <div className="text-table-column__cell"><h4 className={classnames(font)}>Heading 4</h4></div>
      <div className="text-table-column__cell"><h5 className={classnames(font)}>Heading 5</h5></div>
      <div className="text-table-column__cell"><h6 className={classnames(font)}>Heading 6</h6></div>
      <div className="text-table-column__cell"><p className={classnames(font)}>Paragraph</p></div>
      <div className="text-table-column__cell"><span className={classnames(font)}>Base</span></div>
      <div className="text-table-column__cell"><p className={classnames(font, 'caption')}>Caption</p></div>
    </div>
  );
}

const TextTable = ({ font }) => {
  return (
    <div className="text-table">
      <TextTableColumn format="desktop" font={font} />
      <TextTableColumn format="mobile" font={font} />
    </div>
  );
};

export default TextTable;
