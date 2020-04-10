import React from "react";
import { graphql } from "gatsby";
import { MDXRenderer } from "gatsby-plugin-mdx";
import { MDXProvider } from "@mdx-js/react";
import _ from 'lodash';

import { default as CoreImage } from "~components/Image";
import Categories from "~components/Categories";
import Stat from "~components/Stat";

import { unitToString } from "~services/units";

import MasterTemplate from '../MasterTemplate';

import './adventure-template.scss';

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
            distance,
            elevation,
            maxElevation,
            categories,
            allCategories,
            excerpt,
            featuredImgFluid,
            postMedia,
            shortcodes
          }
        ) => {
          const distanceStat = distance && { header: 'Distance', value: unitToString(distance) };
          const elevationStat = elevation && { header: 'Elevation Gain', value: unitToString(elevation) };
          const maxElevationStat = maxElevation && { header: 'Max Elevation', value: unitToString(maxElevation) };

          

          return (
            <article className="adventure-content">
              <section className="adventure-content__header">
                <div className="row">
                  <div className="col-8 col-offset-2 tablet-col-12 mobile-col-12">
                    <h1 className="adventure-content__title">{title}</h1>
                    <If condition={subtitle}>
                      <h5 className="secondary">{subtitle}</h5>
                    </If>
                    <div className="adventure-content__details stack__children--4">
                      <p className="monospace secondary caption">
                        {date}
                      </p>
                      <div className="inline__children--6 adventure-content__stats">
                        {_.compact([distanceStat, elevationStat, maxElevationStat]).map((stat) => {
                          return <Stat {...stat} key={stat.header} />
                        })}
                      </div>
                    </div>
                    <div className="stack__children--6 adventure-content__categories">
                      <Categories categoryIds={categories} categories={allCategories} />
                      <If condition={excerpt}>
                        <p className="secondary">{excerpt}</p>
                      </If>
                    </div>
                  </div>
                </div>
                <If condition={featuredImgFluid}>
                  <div className="grid-break-screen-width">
                    <div className="adventure-content__featured-image">
                      <CoreImage image={featuredImgFluid} imgStyle={{ maxHeight: '80vh' }} imgId="featured_image" disablePreview />
                    </div>
                  </div>
                </If>
              </section>
              <section className="row adventure-content__body">
                <div className="col-8 col-offset-2 tablet-col-12 mobile-col-12">
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
