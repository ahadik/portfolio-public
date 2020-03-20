import React from 'react';
import { graphql } from "gatsby"

import Page from "~components/Page/Page";
import SEO from "~components/seo";
import Image from '~components/Image';

import './about.scss';

const AboutPage = (props) => {
  return (
    <Page>
      <SEO title="About" />
      <div className="row about-page">
        <div className="col-6 mobile-col-12 about-page__header-image">
          <Image image={props.data.portrait.childImageSharp.fluid} imgId="paperangel" />
        </div>
        <div className="col-5 mobile-col-12  about-page__header-title">
          <h3 className="serif bold">Alex is a designer and software engineer who lives in San Francisco and works at Transcriptic.</h3>
        </div>
      </div>
      <div className="row row--large-spacing">
        <div className="col-8 col-offset-2 mobile-col-12 mobile-col-offset-0 serif">
          <p>Working in a Computational Biology lab at Brown University, I wondered why all our laboratory software was
            so hard to use. It didn’t seem like it needed to be that way – and I wanted to make it better. Before I
            knew it, I was neck deep in the design world – taking classes at RISD and launching apps with friends.
          </p>
          <p>After graduating in 2015 with a Bachelor of Science in Computational Biology, I found a healthy mix of
            engineering and design at IBM Design. There I grew my design research and thinking experience, and honed
            my UX and front-end engineering skills. I missed the life sciences though, and Transcriptic offered
            the perfect next step.
          </p>
          <p>I joined Transcriptic in 2016 as their first and only designer. Since then, I've built our design
            team and discipline establishing – among other things – a product development process grounded in user
            research, a design system called Amino, and strong brand identity.
          </p>
        </div>
      </div>
    </Page>
  );
}

export default AboutPage;
export const pageQuery = graphql`
query AboutQuery {
  portrait: file(relativePath: { eq: "paperangel.jpg" }) {
    childImageSharp {
      fluid(maxWidth: 1000) {
        ...GatsbyImageSharpFluid
        presentationWidth
      }
    }
  }
}`;
