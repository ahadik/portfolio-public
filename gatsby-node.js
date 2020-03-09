/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */
const path = require('path');
const { createFilePath } = require('gatsby-source-filesystem');

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      alias: {
        "~components": path.resolve(__dirname, "src/components"),
        "~images": path.resolve(__dirname, "src/images")
      }
    }
  });
};


exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions;

  if ((node.internal.type === 'Mdx') && (getNode(node.parent).sourceInstanceName !== 'images')) {
    // get the name of the gatsby-source-filesystem entry that resulted in this node being queried
    const instanceType = getNode(node.parent).sourceInstanceName;
    const slug = createFilePath({ node, getNode, basePath: `pages` });

    createNodeField({
      node,
      name: 'slug',
      value: (instanceType === 'pages') ? slug : `/${instanceType}${slug}`
    });

    
  }
}

const templateByInstanceName = (node) => {
  console.log(node.parent.sourceInstanceName, node.fields.slug);
  switch (node.parent.sourceInstanceName) {
    case 'work':
      return './src/templates/written/template.jsx';
    case 'writing':
      return './src/templates/written/template.jsx';
    case 'pages':
      return './src/templates/page/template.jsx';
  }
}


exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;
  const result = await graphql(`
    query {
      allMdx {
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
          }
        }
      }
    }
  `);

  result.data.allMdx.edges.forEach(({ node }) => {
    createPage({
      path: node.fields.slug,
      component: path.resolve(templateByInstanceName(node)),
      context: {
        slug: node.fields.slug
      }
    })
  });
}
