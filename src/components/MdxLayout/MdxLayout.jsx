import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import './MdxLayout.scss';

const numCols = 12;

// Takes in a layout string of format "x:y:z" and returns an array of column widths for a 12 column grid
const parseLayout = (layout) => {
  const values = layout.split(':').map(num => parseInt(num))
  // sum the values in the array
  const valueSum = values.reduce((agg, num) => agg + num );
  // test if the values passed in add up to a divisor of 12.
  if (valueSum > 12) {
    return values;
  }

  if ((numCols % valueSum) !== 0) {
    // if not, throw an error because this layout can't be expanded to a 12 column layout
    console.error(`Layout of ${layout} can't be expanded to fit a 12 column grid (sum is not divisor of 12).`);
    return undefined;
  }

  const multiplier = numCols / valueSum;

  return values.map(num => num * multiplier);
};

const MdxLayout = ({
  children,
  layout,
  tabletLayout,
  fullWidth,
  screenWidth,
  showBorderTop,
  showBorderBottom,
  className,
  padTop,
  padBottom,
  padBoth,
  verticalCenter,
  isMedia,
  ...props
}) => {
  let defaultLayout;
  if (!layout) {
    // create a default layout that best fits all the children in to a single row.
    defaultLayout = new Array(React.Children.count(children)).fill(Math.floor(numCols / React.Children.count(children)));
  }
  // if a layout prop was passed, then parse it, otherwise use the default layout.
  const parsedLayout = layout ? parseLayout(layout) : defaultLayout;
  const parsedTabletLayout = tabletLayout && parseLayout(tabletLayout);

  if (parsedLayout.length < React.Children.count(children)) {
    console.error(`Layout of ${layout} defines fewer columns than the number of provided children.`);
    return children;
  }

  const classes = {
    'grid-break-8-to-12': fullWidth,
    'mdx-layout--border-top': showBorderTop,
    'mdx-layout--border-bottom': showBorderBottom,
    'mdx-layout--pad-top': padTop || padBoth,
    'mdx-layout--pad-bottom': padBottom || padBoth,
    'mdx-layout--screen-width': screenWidth,
    'mdx-layout--media': isMedia,
    'row': !screenWidth // if this layout is set to be full screen width, then the row will be rendered on a child.
  };

  if (className) {
    classes[className] = true;
  }

  const renderChildren = () => {
    return (
      React.Children.map(children, (child, index) => {
        const classNameObject = {
          'mdx-layout__child--vertical-center': verticalCenter
        };
        if (parsedTabletLayout) {
          classNameObject[`tablet-col-${parsedTabletLayout[index]}`] = !!parsedTabletLayout;
        }
        return (
          <div
            className={
              classnames(
                'mobile-col-12',
                `col-${parsedLayout[index]}`,
                classNameObject
              )
            }
          >
            {child}
          </div>
        );
      })
    )
  };

  return (
    <div
      className={
        classnames(
          'mdx-layout',
          classes
        )
      }
      {...props}
    >
      <Choose>
        <When condition={screenWidth}>
          <div className="row">
            {renderChildren()}
          </div>
        </When>
        <Otherwise>
          {renderChildren()}
        </Otherwise>
      </Choose>
    </div>
  );
};

MdxLayout.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)]),
  layout: PropTypes.string,
  tabletLayout: PropTypes.string,
  fullWidth: PropTypes.bool,
  screenWidth: PropTypes.bool,
  showBorderTop: PropTypes.bool,
  showBorderBottom: PropTypes.bool,
  padTop: PropTypes.bool,
  padBottom: PropTypes.bool,
  padBoth: PropTypes.bool,
  isMedia: PropTypes.bool,
  className: PropTypes.string
};

const MdxMedia = (props) => {
  return <MdxLayout isMedia {...props} />;
}

export { MdxMedia, MdxLayout };
