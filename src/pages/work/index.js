import React from 'react';
import { graphql } from "gatsby"
import _ from 'lodash';

import Page from "../../components/Page/Page";
import SEO from "../../components/seo";
import ArticleCard from "../../components/ArticleCard";
import Filter from '../../components/Filter';
import { getCategoryFromId } from '../../components/Categories';

class WorkPage extends React.Component {

  constructor(props) {
    super(props);

    this.allCategories = this.props.data.allWorkCategoriesJson.nodes[0].categories.entries;

    this.state = {
      selected: []
    }

    this.getPostsForFilter = this.getPostsForFilter.bind(this);
  }

  getPostsForFilter() {
    // If there are no filters selected, return all the posts
    if (this.state.selected.length === 0) {
      return this.props.data.allMdx.edges;
    }
    return this.props.data.allMdx.edges.filter(({ node }) => {
      for (let i = 0; i < node.frontmatter.categories.length; i++) {
        if (!!_.intersection(this.state.selected, node.frontmatter.categories).length) {
          return true;
        }
      }
      return false;
    });
  }

  render() {
    // Filter the list of all categories down to only those that are present in the posts returned by GraphQL
    // If a post has a category that isn't present in the allCategories list, an error is thrown.
    const postCategories = _.uniq(this.props.data.allMdx.edges.reduce(
      (acc, { node }) => {
        // loop over every category on the node's frontmatter
        node.frontmatter.categories.forEach((postCatId) => {

          if (!this.allCategories.find((category) => { return category.id === postCatId })) {
            console.error(`The category ID ${postCatId} was found on post ${node.fileAbsolutePath}`);
          }
        });
        return acc.concat(node.frontmatter.categories)
      },
      []
    ));
    const categories = this.allCategories.filter((category) => {
      return postCategories.includes(category.id);
    });

    return (
      <Page>
        <SEO title="About" />
        <div className="row">
          <div className="col-12">
            <Filter
              allOptions={this.allCategories}
              options={categories}
              onToggleSelect={(id, isSelected) => {
                if (isSelected) {
                  this.setState((currState) => {
                    return { selected: currState.selected.concat(id) };
                  });
                } else {
                  this.setState((currState) => {
                    return { selected: currState.selected.filter((catId) => { return catId !== id })}
                  });
                }
              }}
              selected={this.state.selected}
            />
          </div>
        </div>
        <div className="row">
          {
            this.getPostsForFilter().map(({ node }) => {
              return (
                <div className="col-4 mobile-col-12" style={{ marginTop: 15 }} key={node.id}>
                  <ArticleCard
                    title={node.frontmatter.title}
                    date={node.frontmatter.date}
                    image={node.frontmatter.featuredImage}
                    categories={node.frontmatter.categories.map((catId) => { return getCategoryFromId(catId, this.allCategories).name })}
                    link={node.fields.slug}
                  />
                </div>
              );
            })
          }
        </div>
      </Page>
    );
  }
}

export default WorkPage;
export const  query = graphql`
  query {
    allWorkCategoriesJson {
      nodes {
        categories {
          entries {
            icon
            id
            name
          }
        }
      }
    }
    allMdx(
      filter: { fileAbsolutePath: {regex : "\/work/"} }
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
            featuredImage {
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
