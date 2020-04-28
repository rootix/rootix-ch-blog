import { graphql, Link } from 'gatsby';
import kebabCase from 'lodash/kebabCase';
import React from 'react';

import Bio from '../components/bio';
import Layout from '../components/layout';
import SEO from '../components/seo';

class PostTemplate extends React.Component {
    render() {
        const post = this.props.data.markdownRemark;
        const { previous, next } = this.props.pageContext;

        return (
            <Layout>
                <SEO
                    title={post.frontmatter.title}
                    description={post.frontmatter.description || post.excerpt}
                />
                <article>
                    <header>
                        <h1 className="text-4xl font-bold mt-4 xl:mt-8 mb-2">
                            {post.frontmatter.title}
                        </h1>
                        <p className="text-sm leading-loose mb-8 text-gray-800">
                            {post.frontmatter.date}
                        </p>
                    </header>
                    <section
                        className="markdown"
                        dangerouslySetInnerHTML={{ __html: post.html }}
                    />

                    {post.frontmatter.tags.map((tag) => {
                        return (
                            <Link
                                key={tag}
                                className="text-sm font-semibold mr-2"
                                to={`/tags/${kebabCase(tag)}/`}
                            >
                                #{tag}
                            </Link>
                        );
                    })}

                    <footer className="mt-8 mb-8">
                        <Bio />
                    </footer>
                </article>

                <nav>
                    <ul className="flex flex-wrap justify-between mb-8">
                        <li>
                            {previous && (
                                <Link to={previous.fields.slug} rel="prev">
                                    ← {previous.frontmatter.title}
                                </Link>
                            )}
                        </li>
                        <li>
                            {next && (
                                <Link to={next.fields.slug} rel="next">
                                    {next.frontmatter.title} →
                                </Link>
                            )}
                        </li>
                    </ul>
                </nav>
            </Layout>
        );
    }
}

export default PostTemplate;

export const pageQuery = graphql`
    query BlogPostBySlug($slug: String!) {
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
                date(formatString: "DD MMMM YYYY")
                description
                tags
            }
        }
    }
`;
