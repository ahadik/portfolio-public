import React from 'react';

import Page from "~components/Page/Page";
import SEO from "~components/seo";

import generateShortcodes from '~templates/shortcodes';

const MasterTemplate = ({data, render, location}) => {
  const post = data.mdx;

  if (post) {
    let featuredImgFluid = post.frontmatter.featuredImage && post.frontmatter.featuredImage.childImageSharp.fluid;
    // If for some reason a featured image can't be found, use the previewImage as backup.
    if (!featuredImgFluid) {
      featuredImgFluid = post.frontmatter.previewImage && post.frontmatter.previewImage.childImageSharp.fluid;
    }

    const { featuredImage, previewImage, images, videos, ...remainingFrontmatter } = post.frontmatter;
    const allCategories = data.allCategoriesJson.nodes[0].categories;
    const postMedia = {images: {}, videos: {}};

    if (images) {
      images.forEach((img) => {
        if (img) {
          postMedia.images[img.name] = {
            fluid: img.childImageSharp && img.childImageSharp.fluid,
            publicURL: img.publicURL
          }
        }
      })
    }

    if (videos) {
      videos.forEach((vid) => {
        if (vid) {
          postMedia.videos[vid.name] = {
            publicURL: vid.publicURL
          }
        }
      })
    }

    const shortcodes = generateShortcodes(postMedia);

    return (
      <Page>
        <SEO
          title={remainingFrontmatter.title}
          description={remainingFrontmatter.excerpt}
          thumbnail={featuredImage || previewImage}
          keywords={remainingFrontmatter.keywords}
          author={remainingFrontmatter.author}
          datePublished={remainingFrontmatter.date}
          location={location}
          isArticle
        />
        {render({
          post,
          allCategories,
          featuredImgFluid,
          postMedia,
          shortcodes,
          ...remainingFrontmatter
        })}
      </Page>
    );
  }
  return null;
}

export default MasterTemplate;
