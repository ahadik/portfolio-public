import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import Image from '~components/Image';

import './ImageCarousel.scss';

const Navigation = ({ slideIndex, numSlides, onNav }) => {
  return (
    <div className="image-carousel__nav inline__children--3">
      {[...Array(numSlides).keys()].map((undefined, index) => {
        return (
          <div
            key={index}
            className={classnames('image-carousel__nav-item',
              { 'image-carousel__nav-item--active': index === slideIndex })
            }
            onClick={() => { onNav(index) }}
          />
        );
      })}
    </div>
  );
}

class ImageCarousel extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      slide: 0
    }

    this.advanceSlide = this.advanceSlide.bind(this);
  }

  componentDidMount() {
    this.advanceTimeout = setTimeout(this.advanceSlide, this.props.duration);
  }

  componentWillUnmount() {
    clearTimeout(this.advanceTimeout);
  }

  advanceSlide(index) {
    const setStateCb = () => {
      if (this.props.didAdvance) {
        this.props.didAdvance(this.state.slide);
      }

      this.advanceTimeout = setTimeout(this.advanceSlide, this.props.duration);
    };

    if (index !== undefined) {
      clearTimeout(this.advanceTimeout);

      this.setState({
        slide: index
      }, setStateCb);
    } else {
      this.setState((currState) => {
        const maxSlide = this.props.images.length;
        return {
          slide: (currState.slide + 1) % maxSlide
        }
      }, setStateCb);
    }
  }

  render() {
    return (
      <div className="image-carousel">
        <Image
          image={this.props.images[this.state.slide].img}
          imgId={this.props.images[this.state.slide].id}
          to={this.props.images[this.state.slide].to}
          fillContainer
          disablePreview
          isFullScreenWidth
        />
        <p className="monospace caption image-carousel__caption">{this.props.images[this.state.slide].caption}</p>
        <Navigation
          slideIndex={this.state.slide}
          numSlides={this.props.images.length}
          onNav={(slideIndex) => { this.advanceSlide(slideIndex) }}
        />
      </div>
    );
  }
};

ImageCarousel.defaultProps = {
  duration: 5000
}

ImageCarousel.propTypes = {
  images: PropTypes.arrayOf(PropTypes.instanceOf(Object))
}

export default ImageCarousel;
