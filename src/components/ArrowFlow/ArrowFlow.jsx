import React from 'react';
import PropTypes from 'prop-types';

import './ArrowFlow.scss';

const ArrowFlow = ({ children, itemSize, itemStyle, itemClass, ...props }) => {
  let itemStylePrime = itemStyle || {};
  
  if (itemSize) {
    if (itemSize.width) {
      itemStylePrime.maxWidth = itemSize.width;
      itemStylePrime.width = '100%';
    }

    if (itemSize.height) {
      itemStylePrime.maxHeight = itemSize.height;
      itemStylePrime.height = '100%';
    }
  }

  return (
    <div className="arrow-flow inline__children--6" {...props}>
      {
        React.Children.map(children, (child, index) => {
          return (
            <>
              <Choose>
                <When condition={itemSize || itemStyle || itemClass}>
                  <div className={itemClass || ''} style={itemStylePrime}>
                    {child}
                  </div>
                </When>
                <Otherwise>
                  {child}
                </Otherwise>
              </Choose>
              <If condition={index !== (React.Children.count(children) - 1)}>
                <h5><i className="fal fa-long-arrow-right" /></h5>
              </If>
            </>
          )
        })
      }
    </div>
  );
}

ArrowFlow.propTypes = {
  itemSize: PropTypes.shape({
    width: PropTypes.number,
    height: PropTypes.number
  })
}

export default ArrowFlow;
