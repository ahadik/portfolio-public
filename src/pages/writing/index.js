import React from 'react';
import { graphql } from "gatsby"

import Page from "~components/Page/Page";
import SEO from "~components/seo";
import ArticleListItem from "~components/ArticleListItem";
import FilteredContent from "~components/FilteredContent";
import withLocationHOC from '~components/withLocationHOC';

const Blog = ({ data, search }) => {
  const allCategories = data.allCategoriesJson.nodes[0].categories;
  const edges = data.allMdx.edges;
  const firstNode = edges[0].node;
  return (
    <Page>
      <SEO title="About" />
      <h6 style={{ marginBottom: '0.5rem' }}>New post!</h6>
      <ArticleListItem
        isHeadline
        title={firstNode.frontmatter.title}
        subtitle={firstNode.frontmatter.subtitle}
        excerpt={firstNode.frontmatter.excerpt}
        publishDate={firstNode.frontmatter.date}
        timeToRead={firstNode.timeToRead}
        image={firstNode.frontmatter.previewImage}
        categories={firstNode.frontmatter.categories}
        slug={firstNode.fields.slug}
        allCategories={allCategories}
      />
      <FilteredContent
        edges={data.allMdx.edges.filter(({ node }) => {
          return node.id !== firstNode.id;
        })}
        allCategories={allCategories}
        queryStringFilter={search.filter && search.filter.split(',')}
        renderer={
          ({ node }) => {
            return (
              <div className="col-12" style={{ marginTop: 60 }} key={node.id}>
                <ArticleListItem
                  title={node.frontmatter.title}
                  subtitle={node.frontmatter.subtitle}
                  excerpt={node.frontmatter.excerpt}
                  publishDate={node.frontmatter.date}
                  timeToRead={node.timeToRead}
                  image={node.frontmatter.previewImage}
                  categories={node.frontmatter.categories}
                  slug={node.fields.slug}
                  allCategories={allCategories}
                />
              </div>
            );
          }
        }
      />
    </Page>
  );
}

export default withLocationHOC(Blog);
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
      filter: { fields: { slug: { glob: "/writing/*" } } }
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      totalCount
      edges {
        node {
          id
          timeToRead
          fields {
            slug
          }
          fileAbsolutePath
          frontmatter {
            title
            subtitle
            excerpt
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
