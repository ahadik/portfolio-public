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

import Header from "../Header/Header";
import Footer from './Footer';

import './Page.scss';

class Page extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      prevScrollPos: window.pageYOffset,
      visible: true
    }

    this.handleScroll = _.throttle(this.handleScroll.bind(this), 250);

    window.addEventListener('scroll', this.handleScroll);
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
          <>
            <Header siteTitle={data.site.siteMetadata.title} visible={this.state.visible} />
            <main className="page__main-content">{this.props.children}</main>
            <Footer />
          </>
        )
      }}
      />
    )
  }
}

Page.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Page;
