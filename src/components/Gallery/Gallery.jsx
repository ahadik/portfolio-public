import React from 'react';
import PropTypes from 'prop-types';
import Img from "gatsby-image";
import classnames from 'classnames';

import Lightbox from '~components/Lightbox';

import './Gallery.scss';

// Renders only Image children, and sets up an auto-layout such that all children are in a row on desktop, and stacked on mobile.
class Gallery extends React.Component {
  
  constructor(props) {
    super(props);

    this.state = {
      activePreview: undefined
    }

    this.flipPreview = this.flipPreview.bind(this);
    this.closePreview = this.closePreview.bind(this);
  }

  flipPreview(image) {
    this.setState({ activePreview: image });
  }

  closePreview() {
    this.setState({ activePreview: undefined });
  }

  render() {
    const { children, caption, itemsPerRow, imgs, style } = this.props;
    return (
      <div
        style={style}
        className={classnames(
          'gallery',
          {
            'gallery--wrapping': !!itemsPerRow
          }
        )}
      >
        <div className="tablet-and-desktop">
          <If condition={this.state.activePreview}>
            <Lightbox onClose={this.closePreview}>
              <div className="gallery__preview-content">
                <div className="gallery__preview-image-container">
                  <div className="gallery__preview-image" style={{ maxWidth: this.state.activePreview.presentationWidth || '70%' }}>
                    <Choose>
                      <When condition={this.state.activePreview.fluid}>
                        <Img
                          fluid={this.state.activePreview.fluid}
                          imgStyle={{ objectFit: 'contain' }}
                          style={{ position: 'absolute', height: '100%', width: '100%' }}
                          disablePreview
                        />
                      </When>
                      <When condition={this.state.activePreview.publicURL}>
                        <img src={this.state.activePreview.publicURL} style={{ position: 'absolute', height: '100%', width: '100%', objectFit: 'contain' }} />
                      </When>
                    </Choose>
                  </div>
                  <If condition={caption}>
                    <p className="caption monospace full-width gallery__preview-caption">{caption}</p>
                  </If>
                </div>
                <div className="gallery__preview-strip">
                  {React.Children.map(children, (child) => {
                    if((child.props.mdxType === 'Image') && child.props.name) {
                      const image = imgs[child.props.name];
                      return (
                        <div className="gallery__preview-thumbnail" onClick={() => this.flipPreview(image)}>
                          <Choose>
                            <When condition={image.fluid}>
                              <Img fluid={image.fluid} imgStyle={{ objectFit: 'contain' }} style={{width: `calc(${image.fluid.aspectRatio} * 7rem)` }} />
                            </When>
                            <When condition={image.publicURL}>
                              <img src={image.publicURL} />
                            </When>
                          </Choose>
                        </div>
                      );
                    }
                  })}
                </div>
              </div>
            </Lightbox>
          </If>
        </div>
        <div className="gallery__body">
          {React.Children.map(children, (child) => {
            if((child.props.mdxType === 'Image') && child.props.name) {
              const image = imgs[child.props.name];

              const standardItem = (
                <div
                  className="gallery__item"
                  onClick={() => this.flipPreview(image)}
                  style={{
                    flexGrow: image.aspectRatio || image.fluid.aspectRatio || 1,
                    flexBasis: itemsPerRow && `calc(${100 / itemsPerRow}% - 16px)`
                  }}
                >
                  {React.cloneElement(child, { disablePreview: true })}
                </div>
              );

              if (!itemsPerRow || typeof itemsPerRow === 'number') {
                return standardItem;
              }
              
              if(itemsPerRow.tablet && itemsPerRow.desktop) {
                return (
                  <>
                    <div
                      className="gallery__item mobile"
                      onClick={() => this.flipPreview(image)}
                    >
                      {React.cloneElement(child, { disablePreview: true })}
                    </div>
                    <div
                      className="gallery__item tablet"
                      onClick={() => this.flipPreview(image)}
                      style={{
                        flexGrow: image.aspectRatio || image.fluid.aspectRatio || 1,
                        flexBasis: (itemsPerRow.tablet && (itemsPerRow.tablet !== 'all')) && `calc(${100 / itemsPerRow.tablet}% - 16px)`
                      }}
                    >
                      {React.cloneElement(child, { disablePreview: true })}
                    </div>
                    <div
                      className="gallery__item desktop"
                      onClick={() => this.flipPreview(image)}
                      style={{
                        flexGrow: image.aspectRatio || image.fluid.aspectRatio || 1,
                        flexBasis: (itemsPerRow.desktop && (itemsPerRow.desktop !== 'all')) && `calc(${100 / itemsPerRow.desktop}% - 16px)`
                      }}
                    >
                      {React.cloneElement(child, { disablePreview: true })}
                    </div>
                  </>
                )
              }

              return standardItem;
              
            }
          })}
        </div>
        <If condition={caption}>
          <p className="monospace caption gallery__caption">{caption}</p>
        </If>
      </div>
    );
  }
}

Gallery.propTypes = {
  caption: PropTypes.string,
  itemsPerRow: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.shape({
      desktop: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.oneOf(['all'])
      ]),
      tablet: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.oneOf(['all'])
      ])
    })
  ]),
  style: PropTypes.instanceOf(Object)
}

export default Gallery;
