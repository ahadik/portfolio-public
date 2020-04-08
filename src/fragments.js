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
      features
      featuredImage {
        childImageSharp {
          fluid(maxWidth: 1300) {
            ...GatsbyImageSharpFluid
            presentationWidth
          }
        }
      }
      previewImage {
        childImageSharp {
          fluid(maxWidth: 1300) {
            ...GatsbyImageSharpFluid
            presentationWidth
          }
        }
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