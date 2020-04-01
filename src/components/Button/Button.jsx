import React from 'react';
import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import './Button.scss';

const Button = ({ children, iconLeft, iconRight, variant, appearance, hasBorder, onClick, to, href, animateRight, small }) => {

  function buttonClasses(...additionalClasses) {
    return classnames(
      'button',
      'inline__children--3',
      `button--${variant}`,
      `button--${appearance}`,
      ...additionalClasses,
      {
        'button--bordered': hasBorder,
        'button--animate': animateRight,
        'button--small': small
      }
    );
  }

  function content() {
    return (
      <>
        <If condition={iconLeft}>
          <i className={classnames(iconLeft, 'button__icon', 'button__icon-left')} />
        </If>
        <span>{children}</span>
        <If condition={iconRight}>
          <i className={
            classnames(iconRight, 'button__icon', 'button__icon-right')
          }/>
        </If>
      </>
    )
  }

  return (
    <Choose>
      <When condition={onClick}>
        <button className={buttonClasses()} onClick={onClick}>
          {content()}
        </button>
      </When>
      <When condition={to}>
        <Link to={to} activeClassName="button--active" className={buttonClasses()}>
          {content()}
        </Link>
      </When>
      <When condition={href}>
        <a href={href} target="_blank" rel="noreferrer noopener" className={buttonClasses()}>{content()}</a>
      </When>
    </Choose>
  );
};

Button.defaultProps = {
  variant: 'black',
  appearance: 'label',
  hasBorder: false
}

Button.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node.isRequired,
    PropTypes.arrayOf(PropTypes.node)
  ]).isRequired,
  iconLeft: PropTypes.string,
  iconRight: PropTypes.string,
  variant: PropTypes.oneOf(['black', 'blue', 'green', 'white']),
  appearance: PropTypes.oneOf(['label', 'fill']),
  hasBorder: PropTypes.bool,
  onClick: PropTypes.func,
  to: PropTypes.string,
  href: PropTypes.string,
  animateRight: PropTypes.bool,
  small: PropTypes.bool
}

export default Button;
