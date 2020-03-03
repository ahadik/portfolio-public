import React from "react";
import { Link } from 'gatsby';
import Img from "gatsby-image";
import classnames from 'classnames';
import PropTypes from 'prop-types';

import Lightbox from '~components/Lightbox';

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

    this.openPreview = this.openPreview.bind(this);
    this.closePreview = this.closePreview.bind(this);

    this.state = {
      isPreview: false,
      imageStack: [
        {
          image: this.props.image,
          caption: this.props.caption,
          to: this.props.to,
          href: this.props.href,
          imgId: getImgIdFromProps(this.props)
        }
      ]
    }
  }

  componentDidMount() {
    document.addEventListener('keydown', this._handleKeyDown);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this._handleKeyDown);
    clearTimeout(this.newImgTimeout);
  }

  openPreview() {
    this.setState({ isPreview: true });
  }

  closePreview() {
    this.setState({ isPreview: false });
  }

  render() {

    const { swapDelay, proportion, image, hasShadow, maxHeight, caption, to, href, allowPreview, ...props } = this.props;

    // if there's more than one image in the stack, and the first image has a different id, then remove it in a few seconds.
    if ((this.state.imageStack.length > 1) && (this.state.imageStack[0].imgId !== getImgIdFromProps(this.props))) {
      this.newImgTimeout = setTimeout(() => {
        this.setState((state) => { return { imageStack: state.imageStack.slice(1) }});
      }, swapDelay)
    }

    const ratio = proportion || (1/image.aspectRatio);

    return (
      <div className="image stack__children--2">
        <div
          className={classnames('image__viewport', { 'image__viewport--shadow': hasShadow })}
          style={{
            paddingBottom: `${ratio * 100}%`,
            maxHeight: maxHeight
          }}
        >
          <If condition={this.state.isPreview}>
            <Lightbox onClose={this.closePreview}>
              <div className="image__preview-container">
                <div className="image__preview" style={{ maxWidth: image.presentationWidth || '70%' }}>
                  <Img fluid={image} imgStyle={{ objectFit: 'contain' }} style={{ position: 'absolute', height: '100%', width: '100%' }} />
                </div>
                <If condition={caption}>
                  <p className="caption monospace full-width image__preview-caption">{caption}</p>
                </If>
              </div>
            </Lightbox>
          </If>
          {
            this.state.imageStack.map((img) => {
              return (
                <div className={classnames('image__wrapper', { 'image__wrapper--no-preview': !allowPreview })} key={img.imgId} style={{ animationDuration: `${swapDelay}ms` }} onClick={allowPreview ? this.openPreview : undefined}>
                  <If condition={to || href}>
                    <Choose>
                      <When condition={to}>
                        <Link to={to} className="image__link"><span className="image__link-span" /></Link>
                      </When>
                      <When condition={href}>
                        <a href={href} target="_blank" rel="noopener noreferrer" className="image__link" ><span className="image__link-span" /></a>
                      </When>
                    </Choose>
                  </If>
                  <Img fluid={img.image} {...props} />
                </div>
              );
            })
          }
        </div>
        
        <If condition={caption}>
          <p className="caption monospace full-width image__caption">{caption}</p>
        </If>
      </div>
    );
  }
}

Image.propTypes = {
  image: PropTypes.instanceOf(Object).isRequired,
  caption: PropTypes.string,
  to: PropTypes.string,
  href: PropTypes.string,
  swapDelay: PropTypes.number,
  proportion: PropTypes.number,
  hasShadow: PropTypes.bool,
  maxHeight: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  allowPreview: PropTypes.bool
}

Image.defaultProps = {
  swapDelay: 800,
  allowPreview: true
}

export default Image;
