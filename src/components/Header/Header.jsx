import { Link } from "gatsby";
import PropTypes from "prop-types"
import React from "react"
import classnames from 'classnames';

import MobileMenuToggle from './MobileMenuToggle';

import './Header.scss';

const HeaderPageTitle = () => {
  return (
    <div className="header-page-title">
      <Link to="/work" className="header-page-title__item monospace" activeClassName="header-page-title__item--active" partiallyActive>Work</Link>
      <Link to="/writing" className="header-page-title__item monospace" activeClassName="header-page-title__item--active" partiallyActive>Writing</Link>
      <Link to="/about" className="header-page-title__item monospace" activeClassName="header-page-title__item--active" partiallyActive>About</Link>
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
      <li className="header-menu__item"><Link to="/work" activeClassName="header-menu__link--active" partiallyActive>Work</Link></li>
      <li className="header-menu__item"><Link to="/writing" activeClassName="header-menu__link--active" partiallyActive>Writing</Link></li>
      <li className="header-menu__item"><Link to="/about" activeClassName="header-menu__link--active" partiallyActive>About</Link></li>
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
            <h4 className="header__title serif">
              <Link to="/">
                {this.props.siteTitle}
              </Link>
            </h4>
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
