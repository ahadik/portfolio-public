import { graphql } from 'gatsby';

export const categoriesQuery = graphql`
  fragment Categories on CategoriesJsonConnection {
    nodes {
      categories {
        icon
        id
        name
      }
    }
  }
`

export const contentMdxQuery = graphql`
  fragment ContentMDX on Mdx {
    body
    tableOfContents
    timeToRead
    frontmatter {
      title
      subtitle
      date(formatString: "MMMM DD, YYYY")
      excerpt
      categories
      distance
      elevation
      maxElevation
      features
      featuredImage {
        childImageSharp {
          fluid(maxWidth: $featureImageWidth) {
            ...GatsbyImageSharpFluid
            presentationWidth
          }
        }
      }
      previewImage {
        childImageSharp {
          fluid(maxWidth: $featureImageWidth) {
            ...GatsbyImageSharpFluid
            presentationWidth
          }
        }
      }
      featuredVimeo
      featuredAttribution {
        name
        url
      }
      videos {
        name,
        publicURL
      }
      images {
        name
        childImageSharp {
          fluid(maxWidth: 1300) {
            ...GatsbyImageSharpFluid
            presentationWidth
          }
        }
        extension
        publicURL
      }
    }
  }
`
