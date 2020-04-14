/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet";
import { useStaticQuery, graphql } from "gatsby";

import SchemaOrg from "~components/SchemaOrg";

import Logo from "~static/logo.png";

function SEO({ description, lang, meta, title, thumbnail, author, isArticle, datePublished, keywords, location }) {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            author {
              name
              email
            }
            description
            siteUrl
            socialLinks {
              linkedin
              instagram
              github
              email
              vimeo
            }
            keywords
          }
        }
      }
    `
  );

  const seo = {
    title: title || site.siteMetadata.title,
    description: description || site.siteMetadata.description,
    image: `${site.siteMetadata.siteUrl}${thumbnail && thumbnail.childImageSharp.fluid.src}`,
    author: author || site.siteMetadata.author,
    keywords: keywords || site.siteMetadata.keywords,
    datePublished
  }

  return (
    <>
      <Helmet
        htmlAttributes={{
          lang,
        }}
        title={seo.title}
        titleTemplate={`%s | ${site.siteMetadata.title}`}
        meta={[
          {
            name: `description`,
            content: seo.description,
          },
          {
            name: "keywords",
            content: seo.keywords.join(","),
          },
          {
            property: `og:title`,
            content: seo.title,
          },
          {
            property: `og:description`,
            content: seo.description,
          },
          {
            property: `og:type`,
            content: isArticle ? 'article' : 'website',
          },
          {
            property: `og:image`,
            content: seo.image
          },
          {
            name: `twitter:card`,
            content: `summary`,
          },
          {
            name: `twitter:creator`,
            content: isArticle ? seo.author : site.siteMetadata.author,
          },
          {
            name: `twitter:title`,
            content: seo.title,
          },
          {
            name: `twitter:description`,
            content: seo.description,
          },
          {
            name: `twitter:image`,
            content: seo.image
          }
        ].concat(meta)}
      />
      <SchemaOrg
        isArticle={isArticle}
        url={site.siteMetadata.siteUrl}
        title={seo.title}
        image={seo.image}
        description={seo.description}
        datePublished={seo.datePublished}
        canonicalUrl={site.siteMetadata.siteUrl}
        author={isArticle ? seo.author : site.siteMetadata.author}
        organization={{ name: 'Alex Hadik', url: site.siteMetadata.siteUrl, logo: { url: `${site.siteMetadata.siteUrl}${Logo}`, width: '1884px', height: '400px' } }}
        defaultTitle={seo.title}
      />
    </>
  );
}

SEO.defaultProps = {
  lang: `en`,
  meta: [],
  description: ``
}

SEO.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string.isRequired,
  keywords: PropTypes.string,
  title: PropTypes.string,
  thumbnail: PropTypes.string,
  isArticle: PropTypes.bool,
  author: PropTypes.shape({ name: PropTypes.string, email: PropTypes.string }),
  datePublished: PropTypes.string,
  dateModified: PropTypes.string
}

export default SEO
