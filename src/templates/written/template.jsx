import React from "react";
import { graphql } from "gatsby";
import { MDXRenderer } from "gatsby-plugin-mdx";

import './styling.scss';

import Image from "~components/Image";
import Page from "~components/Page";
import Categories from "~components/Categories";
import Link from "~components/Link";

export default ({ data }) => {
  if (data) {
    const post = data.mdx;
    const featuredImgFluid = post.frontmatter.featuredImage && post.frontmatter.featuredImage.childImageSharp.fluid;
    const { title, date, excerpt, categories, images } = post.frontmatter;
    const allCategories = data.allWorkCategoriesJson.nodes[0].categories.entries;
    const postImages = {};

    if (images) {
      images.forEach((img) => {
        if (img) {
          postImages[img.name] = {
            fluid: img.childImageSharp && img.childImageSharp.fluid,
            publicURL: img.publicURL
          }
        }
      })
    }

    return (
      <Page>
        <div className="row written-content">
          <div className="written-content__header col-8 col-offset-2 mobile-col-12">
            <h1 className="written-content__title">{title}</h1>
            <p className="monospace secondary caption written-content__date">{date}</p>
            <div className="stack__children--6 written-content__categories">
              <Categories categoryIds={categories} categories={allCategories} />
              <If condition={excerpt}>
                <p>{excerpt}</p>
              </If>
            </div>
          </div>
          <If condition={featuredImgFluid}>
            <div className="written-content__featured-image col-12">
              <Image image={featuredImgFluid} imgId="featured_image" />
            </div>
          </If>
          <If condition={categories.includes('transcriptic')}>
            <div className="col-8 col-offset-2 mobile-col-12 stack__item--4">
              <p className="serif">👋 Before you get going, you might check out this quick <Link to="/transcriptic">primer on Transcriptic and Strateos</Link>.</p>
            </div>
          </If>
          <div className="written-content__body serif col-8 col-offset-2 mobile-col-12">
            <Choose>
              <When condition={post}>
                <MDXRenderer images={postImages}>{post.body}</MDXRenderer>
              </When>
              <Otherwise>
                <div dangerouslySetInnerHTML={{  __html: post.html }} />
              </Otherwise>
            </Choose>
          </div>
        </div>
      </Page>
    )
  }

  return null;
}

export const query = graphql`
  query($slug: String!) {
    allWorkCategoriesJson {
      nodes {
        categories {
          entries {
            icon
            id
            name
          }
        }
      }
    }
    mdx(fields: { slug: { eq: $slug } }) {
      body
      frontmatter {
        title
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
