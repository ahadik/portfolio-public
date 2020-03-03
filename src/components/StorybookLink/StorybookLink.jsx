import React from 'react';
import PropTypes from 'prop-types';

import Button from '~components/Button';

const StorybookLink = ({ href }) => {
  return (
    <Button
      href={href}
      iconLeft="fab fa-react"
      iconRight="fal fa-long-arrow-right"
      animateRight
    >See Live in Storybook</Button>
  );
}

StorybookLink.propTypes = {
  href: PropTypes.string.isRequired
};

export default StorybookLink;
