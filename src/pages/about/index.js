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
    <Page pageClass="about-page">
      <SEO thumbnail={props.data.portrait} title="About Alex" />
      <section className="row mobile grid-break-screen-width">
        <div className="col-12">
          <Image image={props.data.portrait.childImageSharp.fluid} imgId="paperangel" isFullScreenWidth />
        </div>
      </section>
      <section className="row mobile">
        <div className="col-12">
          <h5 className="serif bold">Alex is a designer and software engineer who lives in Cambridge and studies at <Link href="https://mitsloan.mit.edu/">MIT Sloan</Link>.</h5>
        </div>
      </section>
      <article className="row">
        <div className="col-6 tablet-and-desktop">
          <Image image={props.data.portrait.childImageSharp.fluid} fillContainer imgId="paperangel" />
        </div>
        <section className="col-5 mobile-col-12  about-page__header-title stack__children--6">
          <div>
            <div className="desktop">
              <h3 className="serif bold">Alex is a designer and software engineer who lives in Cambridge and studies at <Link href="https://mitsloan.mit.edu/">MIT Sloan</Link>.</h3>
            </div>
            <div className="tablet">
              <h5 className="serif bold">Alex is a designer and software engineer who lives in Cambridge and studies at <Link href="https://mitsloan.mit.edu/">MIT Sloan</Link>.</h5>
            </div>
          </div>
          <Button variant="green" iconLeft="fal fa-arrow-down" hasBorder href={Resume}>Download Resume</Button>
        </section>
      </article>
      <article className="row row--large-spacing">
        <section className="col-8 col-offset-2 tablet-col-12 tablet-col-offset-0 mobile-col-12 mobile-col-offset-0 serif">
          <p>Working in a Computational Biology lab at Brown University, I wondered why all our laboratory software was
            so hard to use. It didn’t seem like it needed to be that way – and I wanted to make it better. Before I
            knew it, I was neck deep in the design world – taking classes at RISD and launching apps with friends.
          </p>
          <p>After graduating in 2015 with a Bachelor of Science in Computational Biology, I found a healthy mix of
            engineering and design at IBM Design. There I grew my design research and thinking experience, and honed
            my UX and front-end engineering skills. I missed the life sciences though, and Transcriptic offered
            the perfect next step.
          </p>
          <p><Link to="/transcriptic/role">I joined Transcriptic in 2016</Link> as their first and only designer. While there, I built the design team and discipline establishing – among other things – <Link to="/work/restricted/chemical-synthesis">a product development process</Link> grounded in user research, <Link to="/work/amino">a design system</Link> called Amino, and a <Link to="/work/transcriptic-photography">strong brand identity</Link>.
          </p>
          <p>In August 2020, I decided to take a step away from the startup world, and started the MBA program at the MIT Sloan School of Management. At Sloan I'm excited to focus on product management and strategy. In 2022 I intend to return to world of biotech to continue building new tools for scientists.</p>
        </section>
      </article>
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
