/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */
const path = require('path');
const { createFilePath } = require('gatsby-source-filesystem');

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions;

  if ((node.internal.type === 'Mdx') && (getNode(node.parent).sourceInstanceName !== 'images')) {
    // get the name of the gatsby-source-filesystem entry that resulted in this node being queried
    const instanceType = getNode(node.parent).sourceInstanceName;
    const slug = createFilePath({ node, getNode, basePath: `pages` });

    createNodeField({
      node,
      name: 'slug',
      value: `/${instanceType}${slug}`
    });
  }
}

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;
  const result = await graphql(`
    query {
      allMdx {
        edges {
          node {
            fields {
              slug
            }
          }
        }
      }
    }
  `);

  result.data.allMdx.edges.forEach(({ node }) => {
    createPage({
      path: node.fields.slug,
      component: path.resolve('./src/templates/workTemplate.jsx'),
      context: {
        slug: node.fields.slug
      }
    })
  });
}
