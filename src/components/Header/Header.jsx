import { Link } from "gatsby";
import PropTypes from "prop-types"
import React from "react"
import classnames from 'classnames';

import MobileMenuToggle from './MobileMenuToggle';
import Logo from './Logo';

import './Header.scss';

const HeaderLinks = [
  {
    name: 'Work',
    to: '/work'
  },
  {
    name: 'Adventures',
    to: '/adventures'
  },
  {
    name: 'Writing',
    to: '/writing'
  },
  {
    name: 'About',
    to: '/about'
  }
]

const HeaderPageTitle = () => {
  return (
    <div className="header-page-title">
      {HeaderLinks.map((link) => {
        return (
          <Link
            key={link.to}
            to={link.to}
            className="header-page-title__item monospace"
            activeClassName="header-page-title__item--active"
            partiallyActive
          >{link.name}</Link>
        )
      })}
    </div>
  );
}

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
      {HeaderLinks.map((link) => {
        return (
          <li className="header-menu__item" key={link.to}>
            <Link to={link.to} activeClassName="header-menu__link--active" partiallyActive>{link.name}</Link>
          </li>
        );
      })}
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
      <header className={classnames('header', {'header--visible': this.props.visible})}>
        <div className="header__content">
          <div className="header__left-content">
            <Logo title={this.props.siteTitle} />
          </div>
          <div className="header__right-content">
            <div className="header__desktop-nav tablet-and-desktop">
              <HeaderMenu />
            </div>
            <div className="header__mobile-toggle mobile inline__children--5" onClick={this.toggleMenu}>
              <HeaderPageTitle />
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
  siteTitle: PropTypes.string
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
