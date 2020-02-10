import React from "react"
import { graphql } from "gatsby"

import Page from "../components/Page/Page";
import SEO from "../components/seo";
import ImageCarousel from '../components/ImageCarousel';

class HomePage extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      slide: 0
    }

    this.wordCatalog = [
      {
        verb: 'design',
        subject: 'humans',
        title: 'a UX Designer',
        purpose: 'help robots and people to work together'
      },
      {
        verb: 'code',
        subject: 'humans',
        title: 'a Software Engineer',
        purpose: 'help designers and engineers to work together'
      },
      {
        verb: 'build',
        subject: 'humans',
        title: 'a Maker',
        purpose: 'create whatever it is I happen to be curious about'
      },
      {
        verb: 'explore',
        subject: 'fun',
        title: 'an Adventurer',
        purpose: 'hike, ski and climb the Sierras'
      },
      {
        verb: 'photograph',
        subject: 'fun',
        title: 'a Photographer',
        purpose: 'document life\'s fleeting moments'
      },
      {
        verb: 'cook',
        subject: 'people',
        title: 'a Food Enthusiast',
        purpose: 'eat far more than I should'
      }
    ];

    this.SLIDE_DURATION = 10000;

    this.currentWords = this.currentWords.bind(this);
  }

  currentWords() {
    return this.wordCatalog[this.state.slide];
  }

  render() {
    return (
      <Page>
        <SEO title="Home" />
        <div className="row">
          <div className="col-4 mobile-col-12">
            <p className="monospace">Hello, my name is</p>
            <h1 className="headline serif">Alex Hadik.</h1>
          </div>
        </div>
        <div className="row">
          <div className="col-4 mobile-col-12 stack__children--8">
            <h4 className="serif">I like to {this.currentWords().verb} things for {this.currentWords().subject}.</h4>
            <p className="serif">I'm {this.currentWords().title} living in San Francisco – where I {this.currentWords().purpose}.</p>
          </div>
          <div className="col-8 mobile-col-12">
            <If condition={this.props.data}>
              <ImageCarousel
                duration={this.SLIDE_DURATION}
                didAdvance={(slide) => { this.setState({ slide: slide }); }}
                images={[
                  {
                    img: this.props.data.imageOne.childImageSharp.fluid,
                    caption: 'Automation scheduling dashboard for Strateos.',
                    id: 'dashboard'
                  },
                  {
                    img: this.props.data.imageTwo.childImageSharp.fluid,
                    caption: 'Operator Workcell Dashboard for Strateos robotic workcell.',
                    id: 'workcell'
                  },
                  {
                    img: this.props.data.imageThree.childImageSharp.fluid,
                    caption: 'Wooden stereo monitors.',
                    id: 'monitors'
                  },
                  {
                    img: this.props.data.imageFour.childImageSharp.fluid,
                    caption: 'Liquid courage before sumitting Mount Shasta.',
                    id: 'shasta'
                  },
                  {
                    img: this.props.data.imageFive.childImageSharp.fluid,
                    caption: 'Sunset at Canyon Creek Lakes in the Shasta-Trinity National Forest.',
                    id: 'canyon'
                  },
                  {
                    img: this.props.data.imageSix.childImageSharp.fluid,
                    caption: 'Grilled Oysters at Hog Island Oyster Company in Bolinas, CA.',
                    id: 'oysters'
                  }
                ]}
                />
            </If>
          </div>
        </div>
      </Page>
    )
  }
}

export default HomePage;
export const pageQuery = graphql`
query IndexQuery {
  imageOne: file(relativePath: { eq: "workcell-dashboard.jpg" }) {
    childImageSharp {
      fluid(maxWidth: 1000) {
        ...GatsbyImageSharpFluid
      }
    }
  }
  imageTwo: file(relativePath: { eq: "workcell.jpg" }) {
    childImageSharp {
      fluid(maxWidth: 1000) {
        ...GatsbyImageSharpFluid
      }
    }
  }
  imageThree: file(relativePath: { eq: "speaker.jpg" }) {
    childImageSharp {
      fluid(maxWidth: 1000) {
        ...GatsbyImageSharpFluid
      }
    }
  }
  imageFour: file(relativePath: { eq: "shasta.jpg" }) {
    childImageSharp {
      fluid(maxWidth: 1000) {
        ...GatsbyImageSharpFluid
      }
    }
  }
  imageFive: file(relativePath: { eq: "canyon-creek.jpg" }) {
    childImageSharp {
      fluid(maxWidth: 1000) {
        ...GatsbyImageSharpFluid
      }
    }
  }
  imageSix: file(relativePath: { eq: "oyster.jpg" }) {
    childImageSharp {
      fluid(maxWidth: 1000) {
        ...GatsbyImageSharpFluid
      }
    }
  }
}
`;
