import React from 'react';
import { graphql } from "gatsby"
import _ from 'lodash';

import Page from "~components/Page";
import SEO from "~components/seo";
import ArticleCard from "~components/ArticleCard";
import Button from "~components/Button";
import { getCategoryFromId } from '~components/Categories';
import FilteredContent from '~components/FilteredContent';
import withLocationHOC from '~components/withLocationHOC';

import Transcriptic from '~images/tx-logo.svg';

import './style.scss';

class WorkPage extends React.Component {

  constructor(props) {
    super(props);

    this.allCategories = this.props.data.allCategoriesJson.nodes[0].categories;

    this.filteredContentRef = React.createRef();
  }

  render() {

    return (
      <Page>
        <SEO title="Work" />
        <div className="row">
          <div className="col-12 transcriptic-block">
            <div className="row">
              <div className="col-12 transcriptic-block__logo">
                <Transcriptic />
              </div>
            </div>
            <div className="row">
              <div className="col-12 transcriptic-block__content inline__children--4">
                <p className="invert monospace caption transcriptic-block__text">For the past 3+ years, I’ve been building and leading the Design Team at Transcriptic. If you’d like to learn about Transcriptic and my work there, you might start with some of these quick options.</p>
                <div className="inline__children--4 transcriptic-block__buttons">
                  <Button iconLeft="fal fa-book" hasBorder variant="white" to={"/transcriptic" } small>Read the Transcriptic Primer</Button>
                  <Button iconLeft="fal fa-filter" hasBorder variant="white" onClick={() => { this.filteredContentRef.current.setFilter('transcriptic') }} small>Filter to Transcriptic Work</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <FilteredContent
          ref={this.filteredContentRef}
          edges={this.props.data.allMdx.edges}
          allCategories={this.allCategories}
          queryStringFilter={this.props.search.filter && this.props.search.filter.split(',')}
          renderer={
            ({ node }) => {
              return (
                <div className="col-4 tablet-col-6 mobile-col-12" style={{ marginTop: 15 }} key={node.id}>
                  <ArticleCard
                    title={node.frontmatter.title}
                    date={node.frontmatter.date}
                    image={node.frontmatter.previewImage}
                    categories={node.frontmatter.categories.map((catId) => { return getCategoryFromId(catId, this.allCategories).name })}
                    link={node.fields.slug}
                  />
                </div>
              );
            }
          }
        />
      </Page>
    );
  }
}

export default withLocationHOC(WorkPage);
export const  query = graphql`
  query {
    allCategoriesJson {
      nodes {
        categories {
          icon
          id
          name
        }
      }
    }
    allMdx(
      filter: { fields: { slug: { glob: "/work/*" } } }
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      totalCount
      edges {
        node {
          id
          excerpt
          fields {
            slug
          }
          fileAbsolutePath
          frontmatter {
            title
            date(formatString: "MMMM DD, YYYY")
            categories
            previewImage {
              childImageSharp {
                fluid(maxHeight: 480) {
                  ...GatsbyImageSharpFluid
                  presentationWidth
                }
              }
            }
          }
        }
      }
    }
  }
`;
