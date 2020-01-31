import React from 'react';
import classnames from 'classnames';

import './TextTable.scss';

const TextTableColumn = ({ format, font }) => {
  const classes = {
    'mobile': format === 'mobile'
  };

  classes[font] = font;

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
      <div className="text-table-column__cell"><h1 className="headline">Headline</h1></div>
      <div className="text-table-column__cell"><h1>Heading 1</h1></div>
      <div className="text-table-column__cell"><h2>Heading 2</h2></div>
      <div className="text-table-column__cell"><h3>Heading 3</h3></div>
      <div className="text-table-column__cell"><h4>Heading 4</h4></div>
      <div className="text-table-column__cell"><h5>Heading 5</h5></div>
      <div className="text-table-column__cell"><h6>Heading 6</h6></div>
      <div className="text-table-column__cell"><p>Paragraph</p></div>
      <div className="text-table-column__cell"><span>Base</span></div>
      <div className="text-table-column__cell"><p className="caption">Caption</p></div>
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
