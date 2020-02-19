import React from "react";
import Img from "gatsby-image";

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

 // If an imgId isn't passed as a prop, try to create an ID from the image details itself
 const getImgIdFromProps = (props) => {
   return props.imgId || props.image.src || props.image.srcSet;
 }

class Image extends React.Component {

  static getDerivedStateFromProps(props, state) {

    if (state.imageStack.filter((img) => { return img.imgId === getImgIdFromProps(props) }).length === 0) {
      state.imageStack.push({
        image: props.image,
        caption: props.caption,
        imgId: getImgIdFromProps(props)
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
          imgId: getImgIdFromProps(this.props)
        }
      ]
    }
  }

  componentWillUnmount() {
    clearTimeout(this.newImgTimeout);
  }

  render() {
    // if there's more than one image in the stack, and the first image has a different id, then remove it in a few seconds.
    if ((this.state.imageStack.length > 1) && (this.state.imageStack[0].imgId !== getImgIdFromProps(this.props))) {
      this.newImgTimeout = setTimeout(() => {
        this.setState((state) => { return { imageStack: state.imageStack.slice(1) }});
      }, this.props.swapDelay)
    }

    const proportion = this.props.proportion || (1/this.props.image.aspectRatio);

    return (
      <div className="image stack__children--2">
        <div
          className="image__viewport"
          style={{
            paddingBottom: `${proportion * 100}%`,
            maxHeight: this.props.maxHeight
          }}
        >
          {
            this.state.imageStack.map((img) => {
              return (
                <div className="image__wrapper" key={img.imgId} style={{ animationDuration: `${this.props.swapDelay}ms` }}>
                  <Img fluid={img.image} />
                </div>
              );
            })
          }
        </div>
        
        <If condition={this.props.caption}>
          <p className="caption monospace full-width">{this.props.caption}</p>
        </If>
      </div>
    );
  }
}

Image.defaultProps = {
  swapDelay: 800
}

export default Image;
