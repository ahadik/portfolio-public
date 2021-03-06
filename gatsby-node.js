/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */
const path = require('path');
const { createFilePath } = require('gatsby-source-filesystem');

exports.onCreateWebpackConfig = ({ stage, loaders, actions }) => {
  actions.setWebpackConfig({
    resolve: {
      alias: {
        "~components": path.resolve(__dirname, "src/components"),
        "~services": path.resolve(__dirname, "src/services"),
        "~images": path.resolve(__dirname, "src/images"),
        "~templates": path.resolve(__dirname, "src/templates"),
        "~static": path.resolve(__dirname, "static")
      }
    }
  });

  if (stage === "build-html") {
    /*
     * During the build step, `auth0-js` will break because it relies on
     * browser-specific APIs. Fortunately, we don’t need it during the build.
     * Using Webpack’s null loader, we’re able to effectively ignore `auth0-js`
     * during the build. (See `src/utils/auth.js` to see how we prevent this
     * from breaking the app.)
     */
    actions.setWebpackConfig({
      module: {
        rules: [
          {
            test: /auth0-js/,
            use: loaders.null(),
          },
        ],
      },
    })
  }
};


exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions;

  if ((node.internal.type === 'Mdx') && (getNode(node.parent).sourceInstanceName !== 'images')) {
    // get the name of the gatsby-source-filesystem entry that resulted in this node being queried
    const instanceType = getNode(node.parent).sourceInstanceName;
    const slug = createFilePath({ node, getNode, basePath: `pages` });

    const getSlug = (instanceType, slug) => {
      switch (instanceType) {
        case 'products':
          return `/work${slug}`;
        case 'caseStudies':
          return `/work${slug}`;
        case 'restrictedCaseStudies':
          return `/work/restricted${slug}`;
        case 'adventures':
          return `/adventures${slug}`;
        case 'writing':
          return `/writing${slug}`;
        case 'pages':
          return slug;
      }
    }

    const getWidth = (instanceType) => {
      switch (instanceType) {
        case 'adventures':
          return 2000;
      }
    }

    createNodeField({
      node,
      name: 'slug',
      value: getSlug(instanceType, slug)
    });

    createNodeField({
      node,
      name: 'featureImageWidth',
      value: getWidth(instanceType) || 1300
    });
    
  }
}

const templateByInstanceName = (node) => {
  switch (node.parent.sourceInstanceName) {
    case 'caseStudies':
      return './src/templates/written/template.jsx';
    case 'products':
      return './src/templates/product/template.jsx';
    case 'adventures':
      return './src/templates/adventure/template.jsx';
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
            id
            parent {
              ... on File {
                sourceInstanceName
              }
            }
            fields {
              slug,
              featureImageWidth
            }
          }
        }
      }
    }
  `);

  result.data.allMdx.edges.forEach(({ node }) => {
    if (!node.fields.slug.match(/^\/work\/restricted/)) {
      createPage({
        path: node.fields.slug,
        component: path.resolve(templateByInstanceName(node)),
        matchPath: node.fields.slug.match(/^\/work\/restricted/) && "/work/restricted/*",
        context: {
          id: node.id,
          slug: node.fields.slug,
          featureImageWidth: node.fields.featureImageWidth
        }
      })
    }
  });
}
