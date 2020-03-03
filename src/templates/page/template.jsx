import React from "react";
import { graphql } from "gatsby";
import { MDXRenderer } from "gatsby-plugin-mdx";

import Image from '../../components/Image';
import Page from "../../components/Page/Page";

import './style.scss';

export default ({ data }) => {
  if (data) {
    const post = data.mdx;
    const featuredImgFluid = post.frontmatter.featuredImage && post.frontmatter.featuredImage.childImageSharp.fluid;
    const { title, subtitle, excerpt, featuredImgCaption, images } = post.frontmatter;
    const postImages = {};

    if (images) {
      images.forEach((img) => {
        if (img && img.childImageSharp) {
          postImages[img.name] = img.childImageSharp.fluid
        }
      })
    }

    return (
      <Page>
        <div className="row page-content">
          <div className="page-content__header col-8 col-offset-2 mobile-col-12">
            <h1 className="page-content__title">{title}</h1>
            <If condition={subtitle}>
              <h5 className="secondary">{subtitle}</h5>
            </If>
            <div className="stack__children--6 written-content__categories">
              <If condition={excerpt}>
                <p>{excerpt}</p>
              </If>
            </div>
          </div>
          <If condition={featuredImgFluid}>
            <div className="page-content__featured-image col-12">
              <Image image={featuredImgFluid} imgId="featured_image" caption={featuredImgCaption} />
            </div>
          </If>
          <div className="page-content__body serif col-8 col-offset-2 mobile-col-12">
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
        images {
          name
          childImageSharp {
            fluid(maxWidth: 1300) {
              ...GatsbyImageSharpFluid
              presentationWidth
            }
          }
        }
      }
    }
  }
`
