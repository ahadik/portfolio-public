import React from 'react';
import { Router } from "@reach/router";

import WrittenTemplate from '~templates/written/template';

import PrivateRoute from "~components/PrivateRoute";

const Restricted = ({ data }) => {
  return(
    <Router>
      {data.allMdx.edges.map(({ node }) => {
        switch(node.parent.sourceInstanceName) {
          case 'restrictedCaseStudies':
            return(
              <PrivateRoute
                path={node.fields.slug}
                key={node.id}
                component={() => <WrittenTemplate data={{ mdx: node, allCategoriesJson: data.allCategoriesJson }} /> }
              />);
        }
      })}
    </Router>
  );
}

export default Restricted;

export const  query = graphql`
  query {
    allCategoriesJson {
      ...Categories
    }
    allMdx(
      filter: { fields: { slug: { glob: "/work/restricted/**/*" } } }
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      totalCount
      edges {
        node {
          parent {
            ... on File {
              sourceInstanceName
            }
          }
          fields {
            slug
          }
          id
          ...ContentMDX
        }
      }
    }
  }
`;
