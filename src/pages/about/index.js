import React from 'react';
import { graphql } from "gatsby"

import Page from "~components/Page/Page";
import SEO from "~components/seo";
import Image from '~components/Image';
import Button from '~components/Button';
import Link from "~components/Link";

import Resume from "~static/alex-hadik-resume.pdf";

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
          <h3 className="serif bold">Alex is a designer and software engineer who lives in San Francisco and works at <Link to="/transcriptic">Transcriptic</Link>.</h3>
          <Button variant="green" iconLeft="fal fa-arrow-down" hasBorder href={Resume}>Download Resume</Button>
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
          <p><Link to="/transcriptic/role">I joined Transcriptic in 2016</Link> as their first and only designer. Since then, I've built our design
            team and discipline establishing – among other things – <Link to="/work/chemical-synthesis">a product development process</Link> grounded in user
            research, <Link to="/work/amino">a design system</Link> called Amino, and a <Link to="/work/transcriptic-photography">strong brand identity</Link>.
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
