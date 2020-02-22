import React from 'react';
import Img from "gatsby-image";
import { Link } from "gatsby";

import './ArticleCard.scss';

const ArticleCard = (props) => {
  return (
    <div className="article-card">
      <Link to={props.link}><span className="article-card__link" /></Link>
      <div className="article-card__info">
        <h5 className="serif invert article-card__title">{props.title}</h5>
        <div className="stack__children--3">
          <p className="caption monospace invert-secondary article-card__date"><b>{props.date}</b></p>
          <p className="caption monospace invert-secondary article-card__date">{props.categories.join(', ')}</p>
        </div>
      </div>
      <div className="article-card__background">
        <Img fluid={props.image.childImageSharp.fluid} style={{ paddingBottom: '100%', height: 0 }} />
      </div>
    </div>
  );
};

export default ArticleCard;
