import React from "react"
import Img from "gatsby-image"

import './Image.scss';

/*
 * This component is built using `gatsby-image` to automatically serve optimized
 * images with lazy loading and reduced file sizes. The image is loaded using a
 * `useStaticQuery`, which allows us to load the image from directly within this
 * component, rather than having to pass the image data down from pages.
 *
 * For more information, see the docs:
 * - `gatsby-image`: https://gatsby.dev/gatsby-image
 * - `useStaticQuery`: https://www.gatsbyjs.org/docs/use-static-query/
 */

class Image extends React.Component {
  static getDerivedStateFromProps(props, state) {

    if (state.imageStack.filter((img) => { return img.imgId === props.imgId }).length === 0) {
      state.imageStack.push({
        image: props.image,
        caption: props.caption,
        imgId: props.imgId
      });
    }

    return state;
  }

  constructor(props) {
    super(props);

    this.state = {
      imageStack: [
        {
          image: this.props.image,
          caption: this.props.caption,
          imgId: this.props.imgId
        }
      ]
    }
  }

  render() {
    // if there's more than one image in the stack, and the first image has a different id, then remove it in a few seconds.
    if ((this.state.imageStack.length > 1) && (this.state.imageStack[0].imgId !== this.props.imgId)) {
      setTimeout(() => {
        this.setState((state) => { return { imageStack: state.imageStack.slice(1) }});
      }, this.props.swapDelay)
    }

    return (
      <div className="image stack__children--2">
        <div
          className="image__viewport"
          style={{ paddingBottom: this.props.proportion && `${this.props.proportion * 100}%` }}
        >
          {
            this.state.imageStack.map((img) => {
              return (
                <div className="image__wrapper" key={img.imgId} style={{ animationDuration: `${this.props.swapDelay}ms` }}>
                  <Img fluid={img.image} ref={img.ref} />
                </div>
              );
            })
          }
        </div>
        
        <If condition={this.props.caption}>
          <p className="caption monospace">{this.props.caption}</p>
        </If>
      </div>
    );
  }
}

Image.defaultProps = {
  proportion: (2/3),
  swapDelay: 800
}

export default Image;
