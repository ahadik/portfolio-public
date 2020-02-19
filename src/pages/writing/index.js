import React from 'react';
import { graphql } from "gatsby"

import Page from "../../components/Page/Page";
import SEO from "../../components/seo";

const Blog = ({ data }) => {
  return (
    <Page>
      <SEO title="About" />
      <div className="row">
        {
          data.allMdx.edges.map(({ node }) => {
            return (
              <div className="col-12">
                <h4>{node.frontmatter.title}</h4>
                <h5>{node.frontmatter.date}</h5>
                <p>{node.excerpt}</p>
              </div>
            );
          })
        }
      </div>
    </Page>
  );
}

export default Blog;
export const  query = graphql`
  query {
    allMdx {
      totalCount
      edges {
        node {
          excerpt
          frontmatter {
            title
            date(formatString: "MMMM DD, YYYY")
          }
        }
      }
    }
  }
`;
