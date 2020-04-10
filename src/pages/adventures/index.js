import React from 'react';
import { graphql } from "gatsby"
import _ from 'lodash';

import Page from "~components/Page";
import SEO from "~components/seo";
import ArticleBanner from "~components/ArticleBanner";
import { getCategoryFromId } from '~components/Categories';
import FilteredContent from '~components/FilteredContent';
import withLocationHOC from '~components/withLocationHOC';

import './style.scss';

class AdventuresPage extends React.Component {

  constructor(props) {
    super(props);

    this.allCategories = this.props.data.allCategoriesJson.nodes[0].categories;

    this.filteredContentRef = React.createRef();
  }

  render() {
    return (
      <Page pageClass="adventures-page">
        <SEO title="Adventures" thumbnail={this.props.data.thumbnail} />
        <FilteredContent
          ref={this.filteredContentRef}
          edges={this.props.data.allMdx.edges}
          allCategories={this.allCategories}
          queryStringFilter={this.props.search.filter && this.props.search.filter.split(',')}
          renderer={
            ({ node }) => {
              return (
                <div
                  className="col-12 adventures-page__article-banner"
                  key={node.id}
                >
                  <ArticleBanner
                    title={node.frontmatter.title}
                    date={node.frontmatter.date}
                    image={node.frontmatter.previewImage}
                    distance={node.frontmatter.distance}
                    elevation={node.frontmatter.elevation}
                    maxElevation={node.frontmatter.maxElevation}
                    categories={node.frontmatter.categories.map((catId) => {
                      return getCategoryFromId(catId, this.allCategories).name
                    })}
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

export default withLocationHOC(AdventuresPage);
export const  query = graphql`
  query {
    thumbnail: file(relativePath: { eq: "adventures-preview-image.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 500) {
          ...GatsbyImageSharpFluid
          presentationWidth
        }
      }
    }
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
      filter: { fields: { slug: { glob: "/adventures/*" } } }
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
            distance
            elevation
            maxElevation
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
