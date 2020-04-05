/**
 * Page component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react";
import PropTypes from "prop-types";
import _ from 'lodash';
import { StaticQuery, graphql } from "gatsby";
import classnames from 'classnames';

import Header from "../Header/Header";
import Footer from './Footer';

import './Page.scss';

class Page extends React.Component {
  constructor(props) {
    super(props);

    let prevScrollPos;

    this.handleScroll = _.throttle(this.handleScroll.bind(this), 250);

    if (typeof window !== `undefined`) {
      window.addEventListener('scroll', this.handleScroll);
      prevScrollPos = window.pageYOffset;
    }

    this.state = {
      prevScrollPos,
      visible: true
    }
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll() {
    const { prevScrollPos } = this.state;
    const currScrollPos = window.pageYOffset;

    if ((currScrollPos > prevScrollPos) && (currScrollPos > 150)) {
      this.setState({ visible: false, prevScrollPos: currScrollPos })
    } else {
      this.setState({ visible: true, prevScrollPos: currScrollPos })
    }
  }

  render() {
    return (
      <StaticQuery
        query={graphql`
        query SiteTitleQuery {
          site {
            siteMetadata {
              title
            }
          }
        }
      `}
      render={(data) => {
        return (
          <div className={classnames('page', this.props.pageClass)}>
            <Header siteTitle={data.site.siteMetadata.title} visible={this.state.visible} isIntro={this.props.isLanding} />
            <main className="page__main-content">{this.props.children}</main>
            <Footer />
          </div>
        )
      }}
      />
    )
  }
}

Page.propTypes = {
  children: PropTypes.node.isRequired,
  isLanding: PropTypes.bool,
  pageClass: PropTypes.string
}

export default Page;
