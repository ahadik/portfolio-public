import { Link } from "gatsby";
import PropTypes from "prop-types"
import React from "react"
import classnames from 'classnames';

import MobileMenuToggle from './MobileMenuToggle';

import './Header.scss';

const HeaderMenu = ({ orientation }) => {
  return (
    <ul className={
      classnames(
        'header-menu',
        {
          'header-menu--horizontal': orientation === 'horizontal',
          'header-menu--vertical': orientation === 'vertical'
        }
      )
    }>
      <li className="header-menu__item"><Link to="/work">Work</Link></li>
      <li className="header-menu__item"><Link to="/writing">Writing</Link></li>
      <li className="header-menu__item"><Link to="/about">About</Link></li>
    </ul>
  );
}

HeaderMenu.defaultProps = {
  orientation: "horizontal"
}

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      mobileMenuOpen: false
    };

    this.toggleMenu = this.toggleMenu.bind(this);
  }

  toggleMenu() {
    this.setState((currState) => {
      return {
        mobileMenuOpen: !currState.mobileMenuOpen
      }
    })
  }

  render() {
    return (
      <header className="header">
        <div className="header__content">
          <div className="header__left-content">
            <h6 className="header__title serif">
              <Link to="/">
                {this.props.siteTitle}
              </Link>
            </h6>
          </div>
          <div className="header__right-content">
            <div className="header__desktop-nav desktop">
              <HeaderMenu />
            </div>
            <div className="header__mobile-toggle mobile" onClick={this.toggleMenu}>
              <MobileMenuToggle isOpen={this.state.mobileMenuOpen} />
            </div>
            <div className={classnames('header__mobile-nav', 'mobile', { 'header__mobile-nav--open': this.state.mobileMenuOpen })}>
              <HeaderMenu orientation="vertical" />
            </div>
          </div>
        </div>
      </header>
    );
  }
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
