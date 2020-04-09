import React from "react";
import { graphql } from "gatsby";
import { MDXRenderer } from "gatsby-plugin-mdx";
import { MDXProvider } from "@mdx-js/react"

import { default as CoreImage } from "~components/Image";
import Categories from "~components/Categories";
import Link from "~components/Link";

import MasterTemplate from '../MasterTemplate';

import './written-template.scss';

export default ({ data }) => {
  if (data) {
    return (
      <MasterTemplate
        data={data}
        render={(
          {
            post,
            title,
            subtitle,
            date,
            categories,
            allCategories,
            excerpt,
            featuredImgFluid,
            postMedia,
            shortcodes
          }
        ) => {
          return (
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
                <div className="col-8 col-offset-2 mobile-col-12 tablet-col-12 stack__item--8">
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
          );
        }}
      />
    );
  }
  return null;
}

export const query = graphql`
  query($slug: String!) {
    allCategoriesJson {
      ...Categories
    }
    mdx(fields: { slug: { eq: $slug } }) {
      ...ContentMDX
    }
  }
`
