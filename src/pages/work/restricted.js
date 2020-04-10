import React from 'react';
import { Router, Redirect } from "@reach/router";
import { graphql } from 'gatsby';

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
              />
            );
        }
      })}
      <Redirect from="/work/restricted" to="/work" default noThrow />
    </Router>
  );
}

export default Restricted;

export const  query = graphql`
  query($featureImageWidth: Int = 1300) {
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
