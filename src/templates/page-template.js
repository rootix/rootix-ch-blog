import { graphql } from 'gatsby';
import React from 'react';

import Layout from '../components/layout';
import SEO from '../components/seo';

class PageTemplate extends React.Component {
    render() {
        const page = this.props.data.markdownRemark;

        return (
            <Layout>
                <SEO
                    title={page.frontmatter.title}
                    description={page.frontmatter.description || page.excerpt}
                />
                <article>
                    <header>
                        <h1 className="text-4xl font-bold mt-4 xl:mt-8 mb-2">
                            {page.frontmatter.title}
                        </h1>
                    </header>
                    <section
                        className="markdown"
                        dangerouslySetInnerHTML={{ __html: page.html }}
                    />
                </article>
            </Layout>
        );
    }
}

export default PageTemplate;

export const pageQuery = graphql`
    query PageBySlug($slug: String!) {
        site {
            siteMetadata {
                title
            }
        }
        markdownRemark(fields: { slug: { eq: $slug } }) {
            id
            excerpt(pruneLength: 160)
            html
            frontmatter {
                title
            }
        }
    }
`;
