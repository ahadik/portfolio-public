import React from 'react';
import Img from "gatsby-image";
import { Link } from "gatsby";

import './ArticleCard.scss';

const ArticleCard = (props) => {
  return (
    <article className="article-card">
      <Link to={props.link}><span className="article-card__link" /></Link>
      <div className="article-card__info">
        <h5 className="serif invert article-card__title">{props.title}</h5>
        <div className="stack__children--1">
          <p className="caption monospace invert-secondary article-card__categories">{props.categories.sort().join(', ')}</p>
        </div>
      </div>
      <div className="article-card__background">
        <If condition={props.image}>
          <Img fluid={props.image.childImageSharp.fluid} style={{ paddingBottom: '100%', height: 0 }} />
        </If>
      </div>
    </article>
  );
};

export default ArticleCard;
