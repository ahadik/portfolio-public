const activeEnv = process.env.GATSBY_ACTIVE_ENV || process.env.NODE_ENV || "development";

require("dotenv").config({
  path: `.env.${activeEnv}`,
})

const siteUrl = process.env.SITE_URL;


module.exports = {
  siteMetadata: {
    title: `Alex Hadik`,
    description: `Alex is a designer and software engineer who lives in San Francisco and works at Transcriptic.`,
    author: `@ahadik`,
    siteUrl: siteUrl
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-page-creator`,
      options: {
        path: `${__dirname}/src/pages`,
        ignore: [`**/components/**/*.(js|ts)?(x)`],
        // See pattern syntax recognized by micromatch
        // https://www.npmjs.com/package/micromatch#matching-features
      },
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        // The property ID; the tracking code won't be generated without it
        trackingId: "UA-66429551-2",
        // Defines where to place the tracking script - `true` in the head and `false` in the body
        head: true
      }
    },
    {
      resolve: `gatsby-plugin-create-client-paths`,
      options: { prefixes: [`/work/restricted/*`] },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `caseStudies`,
        path: `${__dirname}/src/content/work/posts/`,
        ignore: [`${__dirname}/src/content/work/posts/restricted/**`]
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `restrictedCaseStudies`,
        path: `${__dirname}/src/content/work/posts/restricted/`
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `products`,
        path: `${__dirname}/src/content/work/products/`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `writing`,
        path: `${__dirname}/src/content/writing/posts/`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `adventures`,
        path: `${__dirname}/src/content/adventures/journal/`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `pages`,
        path: `${__dirname}/src/content/`,
        ignore: [`${__dirname}/src/content/work/posts/**`, `${__dirname}/src/content/writing/posts/**`]
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/pages/`,
        ignore: [`**/*.mdx`]
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/content/`,
        ignore: [`**/*.mdx`]
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images/`
      },
    },
    {
      resolve: `gatsby-transformer-json`,
      options: {
        typeName: `CategoriesJson`,
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `data`,
        path: `${__dirname}/src/data/`
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: 'gatsby-plugin-mdx',
      options: {
        gatsbyRemarkPlugins: [
          {
            resolve: `gatsby-remark-prismjs`,
            options: {
              showLineNumbers: true
            }
          },
          `gatsby-remark-slug`
        ]
      }
    },
    {
      resolve: 'gatsby-plugin-sass',
      options: {
        data: `@import '${__dirname}/src/styles/global-utils';`,
      }
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Alex Hadik Portfolio`,
        short_name: `Alex Hadik`,
        start_url: `/`,
        background_color: `#014958`,
        theme_color: `#014958`,
        display: `minimal-ui`,
        icon: `src/images/icon.png`, // This path is relative to the root of the site.
      }
    },
    {
      resolve: "gatsby-plugin-react-svg",
      options: {
        rule: {
          include: /images/
        }
      }
    }
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ]
}
