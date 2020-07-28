const activeEnv = process.env.GATSBY_ACTIVE_ENV || process.env.NODE_ENV || "development";

require("dotenv").config({
  path: `.env.${activeEnv}`,
});

const siteUrl = process.env.SITE_URL;


module.exports = {
  siteMetadata: {
    title: `Alex Hadik`,
    description: `Alex is a designer and software engineer who lives in Cambridge and studies at the MIT Sloan School of Management.`,
    author: { name: 'Alex Hadik', email: 'alex@alexhadik.com'},
    email: 'alex@alexhadik.com',
    siteUrl: siteUrl,
    socialLinks: {
      linkedin: 'https://www.linkedin.com/in/alexhadik',
      instagram: 'https://www.instagram.com/alexhadik',
      github: 'https://github.com/ahadik',
      email: 'mailto:alex@alexhadik.com',
      vimeo: 'https://vimeo.com/user850540'
    },
    keywords: ['designer', 'engineer', 'ux', 'front-end', 'photography', 'life science', 'biology', 'robotics', 'automation', 'MIT', 'MBA', 'Sloan', 'product']
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-sitemap`,
      options: {
        exclude: [`/work/restricted`]
      }
    },
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        // graphQL query to get siteMetadata
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                author {
                  name
                  email
                }
              }
            }
          }
        `,
        feeds: [
          // an array of feeds, I just have one below
          {
            serialize: ({ query: { site, allMdx } }) => {
              const { siteMetadata : { siteUrl } } = site;
              return allMdx.edges.map(edge => {
                const { 
                  node: { 
                    frontmatter: {
                      title, 
                      date,
                      author: { name, email }, 
                      previewImage,
                      featuredAlt
                    },
                    excerpt, 
                    fields: {
                      slug
                    }
                  } 
                } = edge;
                return Object.assign({}, edge.node.frontmatter, {
                  title,
                  description: excerpt,
                  date,
                  url: siteUrl + slug,
                  guid: siteUrl + slug,
                  author: `${email} ( ${name} )`,
                  image: {
                    url: previewImage.publicURL,
                    title: featuredAlt,
                    link: siteUrl + slug
                  }
                })
              })
            },
            // query to get blog post data
            query: `
              {
                allMdx(
                  filter: { fields: { slug: { glob: "/writing/*" } } }
                  sort: { order: DESC, fields: [frontmatter___date] },
                ) {
                  edges {
                    node {
                      excerpt
                      fields {
                        slug
                      }
                      frontmatter {
                        date
                        title
                        previewImage {
                          publicURL
                        }
                        featuredAlt
                        author {
                          name
                          email
                        }
                      }
                    }
                  }
                }
              }
            `,
            output: "/rss.xml",
            title: `Alex Hadik | RSS Feed`,
          },
        ],
      },
    },
    {
      resolve: 'gatsby-plugin-robots-txt',
      options: {
        host: siteUrl,
        resolveEnv: () => process.env.GATSBY_ACTIVE_ENV,
        env: {
          local: {
            policy: [{ userAgent: '*', disallow: ['/'] }]
          },
          staging: {
            policy: [{ userAgent: '*', disallow: ['/'] }]
          },
          production: {
            policy: [{ userAgent: '*', allow: '/' }]
          }
        },
        sitemap: `${siteUrl}/sitemap.xml`,
        policy: [{ userAgent: '*', allow: '/' }]
      }
    },
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
