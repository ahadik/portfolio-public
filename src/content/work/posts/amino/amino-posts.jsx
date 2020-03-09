import React from 'react';
import { StaticQuery, graphql } from 'gatsby';

import Link from "~components/Link";

class AminoPosts extends React.Component {
  render() {
    return (
      <StaticQuery
        query={graphql`
        query {
          allMdx(filter: {
            fields: {slug: {ne: "/work/amino/"}},
            fileAbsolutePath: {regex: "\/work/posts/amino/"}}
          ) {
            edges {
              node {
                fields {
                  slug
                }
                frontmatter {
                  title
                }
              }
            }
          }
        }
      `}
      render={(data) => {
        return (
          <ol>
            {data.allMdx.edges.map((edge) => <li><Link to={edge.node.fields.slug}>{edge.node.frontmatter.title}</Link></li>)}
          </ol>
        )
      }}
      />
    );
  }
}

export default AminoPosts;
