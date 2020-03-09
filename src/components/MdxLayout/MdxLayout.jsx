import React from 'react';
import classnames from 'classnames';

import './MdxLayout.scss';

const numCols = 12;

// Takes in a layout string of format "x:y:z" and returns an array of column widths for a 12 column grid
const parseLayout = (layout) => {
  const values = layout.split(':').map(num => parseInt(num))
  // sum the values in the array
  const valueSum = values.reduce((agg, num) => agg + num );
  // test if the values passed in add up to a divisor of 12.
  if ((numCols % valueSum) !== 0) {
    // if not, throw an error because this layout can't be expanded to a 12 column layout
    console.error(`Layout of ${layout} can't be expanded to fit a 12 column grid (sum is not divisor of 12).`);
    return undefined;
  }

  const multiplier = numCols / valueSum;

  return values.map(num => num * multiplier);
};

const MdxLayout = ({children, layout, fullWidth, showBorderTop, showBorderBottom, className}) => {
  let defaultLayout;
  if (!layout) {
    // create a default layout that best fits all the children in to a single row.
    defaultLayout = new Array(React.Children.count(children)).fill(Math.floor(numCols / React.Children.count(children)));
  }
  // if a layout prop was passed, then parse it, otherwise use the default layout.
  const parsedLayout = layout ? parseLayout(layout) : defaultLayout;

  if (parsedLayout.length < React.Children.count(children)) {
    console.error(`Layout of ${layout} defines fewer columns than the number of provided children.`);
    return children;
  }

  const classes = {
    'grid-break-8-to-12': fullWidth,
    'mdx-layout--border-top': showBorderTop,
    'mdx-layout--border-bottom': showBorderBottom,
  };

  if (className) {
    classes[className] = true;
  }

  return (
    <div
      className={
        classnames(
          'mdx-layout',
          'row',
          classes
        )
      }
    >
      {React.Children.map(children, (child, index) => {
        return (
          <div className={`mobile-col-12 col-${parsedLayout[index]}`}>
            {child}
          </div>
        );
      })}
    </div>
  );
};

export default MdxLayout;
