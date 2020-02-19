import React from "react";
import { graphql } from "gatsby";
import { MDXRenderer } from "gatsby-plugin-mdx";

import Image from '../components/Image';
import Page from "../components/Page/Page";
import Categories from '../components/Categories';

export default ({ data }) => {
  const post = data.mdx;
  const featuredImgFluid = post.frontmatter.featuredImage && post.frontmatter.featuredImage.childImageSharp.fluid;
  const { title, date, excerpt, categories, featuredImgCaption, images } = post.frontmatter;
  const allCategories = data.allWorkCategoriesJson.nodes[0].categories.entries;
  const postImages = {};

  if (images) {
    images.forEach((img) => {
      if (img.childImageSharp) {
        postImages[img.name] = img.childImageSharp.fluid
      }
    })
  }

  return (
    <Page>
      <div className="row">
        <div className="col-8 col-offset-2 mobil-col-12">
          <h1 className="serif">{title}</h1>
          <p className="monospace secondary caption">{date}</p>
          <div className="stack__children--6">
            <Categories categoryIds={categories} categories={allCategories} />
            <If condition={excerpt}>
              <p>{excerpt}</p>
            </If>
          </div>
        </div>
        <If condition={featuredImgFluid}>
          <div className="col-12">
            <Image image={featuredImgFluid} imgId="featured_image" proportion={.4} caption={featuredImgCaption} />
          </div>
        </If>
        <div className="serif col-8 col-offset-2 mobil-col-12">
          <Choose>
            <When condition={post}>
              <MDXRenderer test={{hello: 'world'}} images={postImages}>{post.body}</MDXRenderer>
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
        featuredImgCaption
        featuredImage {
          childImageSharp {
            fluid(maxWidth: 1440) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        images {
          name
          childImageSharp {
            fluid(maxWidth: 1440) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`
