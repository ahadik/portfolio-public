import React from "react";
import { graphql } from "gatsby";
import { MDXRenderer } from "gatsby-plugin-mdx";
import { MDXProvider } from "@mdx-js/react"

import {default as CoreImage} from '~components/Image';
import Page from "~components/Page/Page";
import SEO from "~components/seo";
import generateShortcodes from '~templates/shortcodes';

import './style.scss';

export default ({ data }) => {
  if (data) {
    const post = data.mdx;
    let featuredImgFluid = post.frontmatter.featuredImage && post.frontmatter.featuredImage.childImageSharp.fluid;
    // If for some reason a featured image can't be found, use the previewImage as backup.
    if (!featuredImgFluid) {
      featuredImgFluid = post.frontmatter.previewImage && post.frontmatter.previewImage.childImageSharp.fluid;
    }
    const { title, subtitle, excerpt, images, videos } = post.frontmatter;
    const postMedia = {images: {}, videos: {}};

    if (images) {
      images.forEach((img) => {
        if (img) {
          postMedia.images[img.name] = {
            fluid: img.childImageSharp && img.childImageSharp.fluid,
            publicURL: img.publicURL
          }
        }
      })
    }

    if (videos) {
      videos.forEach((vid) => {
        if (vid) {
          postMedia.videos[vid.name] = {
            publicURL: vid.publicURL
          }
        }
      })
    }

    const shortcodes = generateShortcodes(postMedia);

    return (
      <Page>
        <SEO
          title={title}
          description={excerpt}
          thumbnail={post.frontmatter.featuredImage || post.frontmatter.previewImage}
        />
        <article className="page-content">
          <section className="page-content__header">
            <div className="row">
              <div className="col-8 col-offset-2 mobile-col-12 tablet-col-12">
                <h1 className="page-content__title">{title}</h1>
                <If condition={subtitle}>
                  <h5 className="secondary">{subtitle}</h5>
                </If>
                <If condition={excerpt}>
                  <p className="secondary">{excerpt}</p>
                </If>
              </div>
            </div>
            <If condition={featuredImgFluid}>
              <div className="row desktop">
                <div className="page-content__featured-image col-12">
                  <CoreImage image={featuredImgFluid} imgId="featured_image" disablePreview />
                </div>
              </div>
              <div className="row mobile-and-tablet grid-break-screen-width">
                <div className="page-content__featured-image col-12">
                  <CoreImage image={featuredImgFluid} imgId="featured_image" disablePreview />
                </div>
              </div>
            </If>
          </section>
          <section className="page-content__body serif col-8 col-offset-2 mobile-col-12 tablet-col-12">
            <Choose>
              <When condition={post}>
                <MDXProvider components={shortcodes}>
                  <MDXRenderer images={postImages}>{post.body}</MDXRenderer>
                </MDXProvider>
              </When>
              <Otherwise>
                <div dangerouslySetInnerHTML={{  __html: post.html }} />
              </Otherwise>
            </Choose>
          </section>
        </article>
      </Page>
    )
  }

  return null;
}

export const query = graphql`
  query($slug: String!) {
    allCategoriesJson {
      nodes {
        categories {
          icon
          id
          name
        }
      }
    }
    mdx(fields: { slug: { eq: $slug } }) {
      body
      tableOfContents
      timeToRead
      frontmatter {
        title
        subtitle
        date(formatString: "MMMM DD, YYYY")
        excerpt
        featuredImage {
          childImageSharp {
            fluid(maxWidth: 1300) {
              ...GatsbyImageSharpFluid
              presentationWidth
            }
          }
        }
        previewImage {
          childImageSharp {
            fluid(maxWidth: 1300) {
              ...GatsbyImageSharpFluid
              presentationWidth
            }
          }
        }
        videos {
          relativePath
        }
        images {
          name
          childImageSharp {
            fluid(maxWidth: 1300) {
              ...GatsbyImageSharpFluid
              presentationWidth
            }
          }
          extension
          publicURL
        }
      }
    }
  }
`
