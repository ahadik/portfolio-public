import React from "react";
import { graphql } from 'gatsby';
import { MDXRenderer } from "gatsby-plugin-mdx";
import { MDXProvider } from "@mdx-js/react"

import {default as CoreImage} from '~components/Image';

import MasterTemplate from '../MasterTemplate';

import './page-template.scss';

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
            excerpt,
            featuredImgFluid,
            postMedia,
            shortcodes
          }
        ) => {
          return (
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
              <section className="page-content__body row">
                <div className="col-8 col-offset-2 mobile-col-12 tablet-col-12">
                  <Choose>
                    <When condition={post}>
                      <MDXProvider components={shortcodes}>
                        <MDXRenderer images={postMedia}>{post.body}</MDXRenderer>
                      </MDXProvider>
                    </When>
                    <Otherwise>
                      <div dangerouslySetInnerHTML={{  __html: post.html }} />
                    </Otherwise>
                  </Choose>
                </div>
              </section>
            </article>
          );
        }}
      />
    );
  }
  return null;
}

export const query = graphql`
  query($id: String!, $featureImageWidth: Int = 1300) {
    allCategoriesJson {
      ...Categories
    }
    mdx(id: { eq: $id }) {
      ...ContentMDX
    }
  }
`
