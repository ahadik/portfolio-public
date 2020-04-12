import React from 'react';
import { Helmet } from 'react-helmet';

export default React.memo(
  ({
    author,
    canonicalUrl,
    datePublished,
    defaultTitle,
    description,
    image,
    isArticle,
    organization,
    title,
    url,
  }) => {
    const baseSchema = [
      {
        '@context': 'http://schema.org',
        '@type': 'WebSite',
        url,
        name: title,
        alternateName: defaultTitle,
      },
    ];

    const schema = isArticle
      ? [
          ...baseSchema,
          {
            '@context': 'http://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              {
                '@type': 'ListItem',
                position: 1,
                item: {
                  '@id': url,
                  name: title,
                  image,
                },
              },
            ],
          },
          {
            '@context': 'http://schema.org',
            '@type': 'BlogPosting',
            url,
            name: title,
            alternateName: defaultTitle,
            headline: title,
            image: {
              '@type': 'ImageObject',
              url: image,
            },
            description,
            author: {
              "@type": "Person",
              name: author.name,
              email: author.email,
            },
            publisher: {
              "@type": "Organization",
              url: organization.url,
              logo: {
                "@type": "ImageObject",
                url: organization.logo.url,
                width: organization.logo.width,
                height: organization.logo.height,
              },
              name: organization.name,
            },
            mainEntityOfPage: {
              '@type': 'WebSite',
              '@id': canonicalUrl,
            },
            datePublished,
          },
        ]
      : baseSchema;

    return (
      <Helmet>
        {/* Schema.org tags */}
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
      </Helmet>
    );
  },
);