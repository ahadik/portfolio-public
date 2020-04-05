import React from "react";
import { graphql } from "gatsby";
import { MDXRenderer } from "gatsby-plugin-mdx";
import { MDXProvider } from "@mdx-js/react"

import './styling.scss';

import { default as CoreImage } from "~components/Image";
import Page from "~components/Page";
import Categories from "~components/Categories";
import Link from "~components/Link";
import SEO from "~components/seo";
import generateShortcodes from '~templates/shortcodes';

export default ({ data }) => {

  if (data) {
    const post = data.mdx;
    let featuredImgFluid = post.frontmatter.featuredImage && post.frontmatter.featuredImage.childImageSharp.fluid;
    if (!featuredImgFluid) {
      featuredImgFluid = post.frontmatter.previewImage && post.frontmatter.previewImage.childImageSharp.fluid;
    }
    const { title, date, excerpt, categories, images, subtitle, videos } = post.frontmatter;
    const allCategories = data.allCategoriesJson.nodes[0].categories;
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
        <article className="written-content">
          <section className="written-content__header">
            <div className="row">
              <div className="col-8 col-offset-2 mobile-col-12 tablet-col-12">
                <h1 className="written-content__title">{title}</h1>
                <If condition={subtitle}>
                  <h5 className="secondary">{subtitle}</h5>
                </If>
                <p className="monospace secondary caption written-content__date">{date} | {post.timeToRead} minute read</p>
                <div className="stack__children--6 written-content__categories">
                  <Categories categoryIds={categories} categories={allCategories} />
                  <If condition={excerpt}>
                    <p className="secondary">{excerpt}</p>
                  </If>
                </div>
              </div>
            </div>
            <If condition={featuredImgFluid}>
              <div className="row desktop">
                <div className="written-content__featured-image col-12">
                  <CoreImage image={featuredImgFluid} imgId="featured_image" disablePreview />
                </div>
              </div>
              <div className="mobile-and-tablet grid-break-screen-width">
                <div className="written-content__featured-image">
                  <CoreImage image={featuredImgFluid} imgId="featured_image" disablePreview />
                </div>
              </div>
            </If>
          </section>
          <If condition={categories.includes('transcriptic')}>
            <div className="col-8 col-offset-2 mobile-col-12 tablet-col-12 stack__item--4">
              <p className="serif">👋 This project is from my time at Transcriptic. Before you get going, you might check out this quick <Link to="/transcriptic">primer on Transcriptic and Strateos</Link>.</p>
            </div>
          </If>
          <div className="written-content__body serif col-8 col-offset-2 mobile-col-12 tablet-col-12">
            <Choose>
              <When condition={post}>
                <MDXProvider components={shortcodes}>
                  <MDXRenderer media={postMedia}>{post.body}</MDXRenderer>
                </MDXProvider>
              </When>
              <Otherwise>
                <div dangerouslySetInnerHTML={{  __html: post.html }} />
              </Otherwise>
            </Choose>
          </div>
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
        categories
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
          name,
          publicURL
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
