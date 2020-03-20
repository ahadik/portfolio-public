import React from 'react';
import PropTypes from 'prop-types';

import './ColorViz.scss';

const sampleCurve = (x, exponent = 2, min, max) => {
  
  const midPoint = 128;
  const xScalar = 127/(Math.pow(5, exponent));
  
  const func = (xPrime, scalar) => {
    return scalar * Math.pow((xPrime - ((xPrime - 5) / -10)), exponent);
  }

  const limit = (val) => {
    if (val < min) { return min; }
    if (val > max) { return max; }
    return val;
  }
  
  if (x > 4.5) {
    return limit(midPoint + func((x - 4), xScalar));
  }
  
  if (x < 4.5) {
    return limit(midPoint - func(((x - 5) * -1), xScalar));
  }
}

const colorFromVal = (val) => {
  return `rgb(${val}, ${val}, ${val})`;
}

const Sample = ({ orientation, y }) => {
  const sampleColor = colorFromVal(y);
  const xOffset = y/255*100;
  return (
    <div className={`sample sample--${orientation}`} style={{ left: `${xOffset}%` }}>
      <div className="sample__box" style={{ backgroundColor: sampleColor }} />
      <div className="sample__picker" style={{ backgroundColor: sampleColor }} />
    </div>
  );
}

const Swatch = ({ backgroundColor }) => {
  return <div className="color-viz-swatch" style={{ backgroundColor }} />;
}

class ColorViz extends React.Component {
  constructor(props) {
    super(props);

    this.initialExponent = props.initialExponent;
    
    this.state = {
      exponent: props.initialExponent
    }
  }
  
  render() {
    return (
      <div className="color-viz">
        <p className="sans-serif color-viz__title"><b>Sample Curve:</b> x<sup style={{ width: '3.25ch', display: 'inline-block' }}>{(Math.round(this.state.exponent * 100) / 100).toFixed(2)}</sup></p>
        <If condition={!this.props.isStatic}>
          <div className="color-viz__control">
            <span className="monospace">x<sup>0</sup></span>
            <input
              type="range"
              min="0.01"
              max="4"
              step="0.01"
              value={this.state.exponent}
              onChange={(e) => { this.setState({ exponent: e.target.value }) }}
              class="color-viz__input"
              id="myRange"
            />
            <span className="monospace">x<sup>4</sup></span>
            <i className="color-viz__reset fas fa-redo-alt" onClick={() => { this.setState({ exponent: this.initialExponent })}} />
          </div>
        </If>
        <div className="color-viz__samples">
          {[...Array(10).keys()].map((x) => {
            return <Sample orientation="top" y={sampleCurve(x, this.state.exponent, this.props.darkLimit, this.props.lightLimit)} />;
          })}
        </div>
        <div className="scale" />
        <div className="color-viz__palette">
        {[...Array(10).keys()].map((x) => {
            return <Swatch backgroundColor={colorFromVal(sampleCurve(x, this.state.exponent, this.props.darkLimit, this.props.lightLimit))} />;
          })}
        </div>
      </div>
    );
  }
}

ColorViz.propTypes = {
  initialExponent: PropTypes.number,
  lightLimit: PropTypes.number,
  darkLimit: PropTypes.number
}

ColorViz.defaultProps = {
  initialExponent: 1,
  lightLimit: 255,
  darkLimit: 0
}

export default ColorViz;
