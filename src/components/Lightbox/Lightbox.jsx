import React from 'react';
import PropTypes from 'prop-types';

import './Lightbox.scss';

class Lightbox extends React.Component {

  constructor(props) {
    super(props);

    this._handleKeyDown = this._handleKeyDown.bind(this);
  }

  componentDidMount() {
    document.addEventListener('keydown', this._handleKeyDown);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this._handleKeyDown);
  }

  _handleKeyDown(event) {
    const ESCAPE_KEY = 27;
    switch( event.keyCode ) {
      case ESCAPE_KEY:
        this.props.onClose();
        break;
      default: 
        break;
    }
  }

  render() {

    const { children, onClose } = this.props;
  
    return (
      <div className="lightbox">
        <i className="fal fa-times lightbox__close-icon" onClick={onClose} />
        {children}
      </div>
    );
  }
}

Lightbox.propTypes = {
  onClose: PropTypes.func.isRequired
}

export default Lightbox;
