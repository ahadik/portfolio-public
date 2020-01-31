import React from 'react';

import './ColorTable.scss';

const Swatch = ({ shade, color }) => {
  return (
    <div className={`swatch swatch__${color}--${shade}`} />
  );
}

const ColorRow = ({ shade }) => {
  return (
    <div className="color-row">
      <Swatch shade={shade} color="gray" />
      <Swatch shade={shade} color="blue" />
      <Swatch shade={shade} color="green" />
      <Swatch shade={shade} color="gold" />
      <Swatch shade={shade} color="pink" />
    </div>
  );
};

const ColorTable = () => {
  return (
    <div className="color-table">
      <div>
        <span className="color-table__column-caption monospace caption">Gray</span>
        <span className="color-table__column-caption monospace caption">Blue</span>
        <span className="color-table__column-caption monospace caption">Green</span>
        <span className="color-table__column-caption monospace caption">Gold</span>
        <span className="color-table__column-caption monospace caption">Pink</span>
      </div>
      <div>
        <p className="color-table__row-caption caption monospace">Dark</p>
        <ColorRow shade="dark" />
      </div>
      <div>
        <p className="color-table__row-caption caption monospace">Medium</p>
        <ColorRow shade="medium" />
      </div>
      <div>
        <p className="color-table__row-caption caption monospace">Light</p>
        <ColorRow shade="light" />
      </div>
    </div>
  );
}

export default ColorTable;