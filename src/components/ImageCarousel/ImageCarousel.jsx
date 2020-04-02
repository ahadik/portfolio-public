import React from 'react';
import PropTypes from 'prop-types';

import Image from '~components/Image';

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

  advanceSlide() {
    this.setState((currState) => {
      const maxSlide = this.props.images.length;
      return {
        slide: (this.state.slide + 1) % maxSlide
      }
    }, () => {
      if (this.props.didAdvance) {
        this.props.didAdvance(this.state.slide);
      }

      this.advanceTimeout = setTimeout(this.advanceSlide, this.props.duration);
    });
  }

  render() {
    return (
      <div className="image-carousel">
        <Image
          image={this.props.images[this.state.slide].img}
          caption={this.props.images[this.state.slide].caption}
          imgId={this.props.images[this.state.slide].id}
          maxHeight={this.props.imageHeight}
        />
      </div>
    );
  }
};

ImageCarousel.defaultProps = {
  duration: 5000
}

ImageCarousel.propTypes = {
  images: PropTypes.arrayOf(PropTypes.instanceOf(Object)),
  maxImageHeight: PropTypes.string
}

export default ImageCarousel;
