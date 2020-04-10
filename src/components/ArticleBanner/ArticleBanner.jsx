import React from 'react';
import Img from "gatsby-image";
import { Link } from "gatsby";
import PropTypes from 'prop-types';
import _ from 'lodash';

import Stat from "~components/Stat";

import { unitToString } from "~services/units";

import './ArticleBanner.scss';

const ArticleBanner = (props) => {

  const { distance, elevation, maxElevation } = props;

  const distanceStat = distance && { header: 'Dist.', value: unitToString(distance) };
  const elevationStat = elevation && { header: 'Gain', value: unitToString(elevation) };
  const maxElevationStat = maxElevation && { header: 'Max Elev. ', value: unitToString(maxElevation) };

  return (
    <article className="article-banner">
      <Choose>
        <When condition={props.onClick}>
          <a onClick={props.onClick}><span className="article-banner__link" /></a>
        </When>
        <Otherwise>
          <Link to={props.link}><span className="article-banner__link" /></Link>
        </Otherwise>
      </Choose>
      <div className="article-banner__info">
        <div className="article-banner__details">
          <h5 className="serif invert article-banner__title">{props.title}</h5>
          <div className="stack__children--1">
            <p className="caption monospace invert-secondary">
              {props.categories.sort().join(', ')}
            </p>
            <p className="caption monospace invert-secondary">
              {props.date}
            </p>
          </div>
        </div>
        <div className="article-banner__stats inline__children--6 tablet-and-desktop">
          {_.compact([distanceStat, elevationStat, maxElevationStat]).map((stat) => {
            return <Stat {...stat} invert key={stat.header} />
          })}
        </div>
      </div>
      <div className="article-banner__background">
        <If condition={props.image}>
          <Img fluid={props.image.childImageSharp.fluid} style={{ width: '100%', height: '100%' }} />
        </If>
      </div>
    </article>
  );
};

ArticleBanner.propTypes = {
  title: PropTypes.string,
  date: PropTypes.string,
  image: PropTypes.instanceOf(Object),
  categories: PropTypes.instanceOf(Array),
  link: PropTypes.string,
  onClick: PropTypes.func
}

export default ArticleBanner;
