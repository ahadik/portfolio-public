import React from 'react';
import classnames from 'classnames';
import { Link } from 'gatsby';
import Img from "gatsby-image";

import Categories from '~components/Categories';

import './ArticleListItem.scss';

const ArticleListItem = ({ image, title, subtitle, excerpt, categories, publishDate, timeToRead, slug, isHeadline, allCategories }) => {
  return (
    <div className={classnames('article-list-item', 'row', { 'article-list-item--headline': isHeadline })}>
      <div className={classnames(isHeadline ? 'col-6' : 'col-4', 'mobile-col-12', 'tablet-col-5','article-list-item__image')}>
        <Link to={slug}>
          <Img fluid={image.childImageSharp.fluid} className="article-list-item__gatsby-image" />
        </Link>
      </div>
      <div className={classnames(isHeadline ? 'col-6' : 'col-7', 'mobile-col-12')}>
        <Link to={slug}>
          <div className="article-list-item__details">
            <Choose>
              <When condition={isHeadline}>
                <h3>{title}</h3>
                <h4 className="secondary">{subtitle}</h4>
                <p className="monospace secondary caption">{publishDate} | {timeToRead} minute read</p>
              </When>
              <Otherwise>
                <h4>{title}</h4>
                <h5 className="secondary">{subtitle}</h5>
                <p className="monospace secondary caption">{publishDate} | {timeToRead} minute read</p>
              </Otherwise>
            </Choose>
            <div className="article-list-item__categories">
              <Categories categoryIds={categories} categories={allCategories} />
            </div>
            <p className="article-list-item__excerpt">{excerpt}</p>
          </div>
        </Link>
      </div>
    </div>
  )
};

export default ArticleListItem;
