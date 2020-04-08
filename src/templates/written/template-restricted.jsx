import React from "react";
import { graphql } from "gatsby";

import { isAuthenticated } from "~services/auth"

import LoginDialog from "~components/LoginDialog";

import Template from './template';

export default ({ data, location }) => {
  console.log(data);
  if (!isAuthenticated()) {
    return <LoginDialog redirectPath={location.pathname} />;
  }
  if (data) {
    return <Template data={data} />;
  }
  return null;
}

export const query = graphql`
  query($slug: String!) {
    allCategoriesJson {
      ...Categories
    }
    mdx(fields: { slug: { eq: $slug } }) {
      ...ContentMDX
    }
  }
`
