import React from 'react';

import Page from "~components/Page/Page";
import SEO from "~components/seo";

import generateShortcodes from '~templates/shortcodes';

const MasterTemplate = ({data, render}) => {
  const post = data.mdx;
  let featuredImgFluid = post.frontmatter.featuredImage && post.frontmatter.featuredImage.childImageSharp.fluid;
  // If for some reason a featured image can't be found, use the previewImage as backup.
  if (!featuredImgFluid) {
    featuredImgFluid = post.frontmatter.previewImage && post.frontmatter.previewImage.childImageSharp.fluid;
  }
  const { title, date, excerpt, categories, features, images, subtitle, videos } = post.frontmatter;
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
        title={title}
        description={excerpt}
        thumbnail={post.frontmatter.featuredImage || post.frontmatter.previewImage}
      />
      {render({
        post,
        title,
        subtitle,
        date,
        categories,
        features,
        allCategories,
        excerpt,
        featuredImgFluid,
        postMedia,
        shortcodes
      })}
    </Page>
  );
}

export default MasterTemplate;
