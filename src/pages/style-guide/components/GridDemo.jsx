import React from 'react';

import './GridDemo.scss';

const GridDemo = () => {
  return (
    <div className="grid-demo">
      <div className="row grid-demo__row grid-demo__row--background">
        <div className="grid-demo__column col-1" />
        <div className="grid-demo__column col-1" />
        <div className="grid-demo__column col-1" />
        <div className="grid-demo__column col-1" />
        <div className="grid-demo__column col-1" />
        <div className="grid-demo__column col-1" />
        <div className="grid-demo__column col-1" />
        <div className="grid-demo__column col-1" />
        <div className="grid-demo__column col-1" />
        <div className="grid-demo__column col-1" />
        <div className="grid-demo__column col-1" />
        <div className="grid-demo__column col-1" />
      </div>
      <div className="grid-demo__overlay">
        <div className="row grid-demo__row">
          <div className="grid-demo__column col-2" />
          <div className="grid-demo__column col-2" />
          <div className="grid-demo__column col-2" />
          <div className="grid-demo__column col-2" />
          <div className="grid-demo__column col-2" />
          <div className="grid-demo__column col-2" />
        </div>
        <div className="row grid-demo__row">
          <div className="grid-demo__column col-3" />
          <div className="grid-demo__column col-3" />
          <div className="grid-demo__column col-3" />
          <div className="grid-demo__column col-3" />
        </div>
        <div className="row grid-demo__row">
          <div className="grid-demo__column col-4" />
          <div className="grid-demo__column col-4" />
          <div className="grid-demo__column col-4" />
        </div>
        <div className="row grid-demo__row">
          <div className="grid-demo__column col-6" />
          <div className="grid-demo__column col-6" />
        </div>
        <div className="row grid-demo__row">
          <div className="grid-demo__column col-12" />
        </div>
        <div className="row grid-demo__row">
          <div className="grid-demo__column col-11 col-offset-1" />
        </div>
        <div className="row grid-demo__row">
          <div className="grid-demo__column col-10 col-offset-2" />
        </div>
        <div className="row grid-demo__row">
          <div className="grid-demo__column col-9 col-offset-3" />
        </div>
        <div className="row grid-demo__row">
          <div className="grid-demo__column col-8 col-offset-4" />
        </div>
        <div className="row grid-demo__row">
          <div className="grid-demo__column col-7 col-offset-5" />
        </div>
        <div className="row grid-demo__row">
          <div className="grid-demo__column col-6 col-offset-6" />
        </div>
        <div className="row grid-demo__row">
          <div className="grid-demo__column col-5 col-offset-7" />
        </div>
        <div className="row grid-demo__row">
          <div className="grid-demo__column col-4 col-offset-8" />
        </div>
        <div className="row grid-demo__row">
          <div className="grid-demo__column col-3 col-offset-9" />
        </div>
        <div className="row grid-demo__row">
          <div className="grid-demo__column col-2 col-offset-10" />
        </div>
        <div className="row grid-demo__row">
          <div className="grid-demo__column col-1 col-offset-11" />
        </div>
      </div>
    </div>
  );
}

export default GridDemo;