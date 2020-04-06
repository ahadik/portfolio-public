import React from "react";
import { graphql } from "gatsby";
import { MDXRenderer } from "gatsby-plugin-mdx";
import { MDXProvider } from "@mdx-js/react"

import Categories from "~components/Categories";
import Link from "~components/Link";
import Image from "~components/Image";

import MasterTemplate from '../MasterTemplate';

import './style.scss';

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
            features,
            allCategories,
            excerpt,
            featuredImgFluid,
            postMedia,
            shortcodes
          }
        ) => {
          return (
            <article className="product-content">
              <section className="desktop row product-content__header">
                <div className="col-6">
                  <If condition={featuredImgFluid}>
                    <Image fillContainer image={featuredImgFluid} imgId="featured_image" />
                  </If>
                </div>
                <div className="col-6">
                  <h1 className="product-content__title">{title}</h1>
                  <If condition={subtitle}>
                    <h5 className="secondary">{subtitle}</h5>
                  </If>
                  <p className="monospace secondary caption product-content__date">{date}</p>
                  <div className="product-content__details stack__children--4">
                    <Categories categoryIds={categories} categories={allCategories} />
                    <If condition={excerpt}>
                      <p className="secondary">{excerpt}</p>
                    </If>
                    <If condition={features}>
                      <ul>
                        {features.map((feature) => {return <li>{feature}</li>})}
                      </ul>
                    </If>
                  </div>
                </div>
              </section>
              <section className="mobile-and-tablet product-content__header stack__children--6">
                <div className="row">
                  <div className="col-12 stack__children--2">
                    <div>
                      <h1 className="product-content__title">{title}</h1>
                      <If condition={subtitle}>
                        <h5 className="secondary">{subtitle}</h5>
                      </If>
                      <p className="monospace secondary caption product-content__date">{date}</p>
                    </div>
                    <Categories categoryIds={categories} categories={allCategories} />
                  </div>
                </div>
                <div className="row grid-break-screen-width">
                  <div className="col-12">
                    <Image image={featuredImgFluid} imgId="featured_image" />
                  </div>
                </div>
                <div className="row">
                  <div className="col-12">
                    <If condition={excerpt}>
                      <p className="secondary">{excerpt}</p>
                    </If>
                    <If condition={features}>
                      <ul>
                        {features.map((feature) => {return <li>{feature}</li>})}
                      </ul>
                    </If>
                  </div>
                </div>
              </section>
              <If condition={categories.includes('transcriptic')}>
                <div className="col-8 col-offset-2 mobile-col-12 tablet-col-12 stack__item--4">
                  <p className="serif">👋 This project is from my time at Transcriptic. Before you get going, you might check out this quick <Link to="/transcriptic">primer on Transcriptic and Strateos</Link>.</p>
                </div>
              </If>
              <section className="product-content__body row">
                <div className="col-12">
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
              </section>
            </article>
          );
        }}
      />
    );
  }
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
