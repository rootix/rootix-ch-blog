import { graphql, Link } from 'gatsby';
import React from 'react';

import Layout from '../components/layout';
import SEO from '../components/seo';

class BlogIndex extends React.Component {
    render() {
        const { data } = this.props;
        const posts = data.allMarkdownRemark.edges;
        const { currentPage, numPages } = this.props.pageContext;
        const isFirst = currentPage === 1;
        const isLast = currentPage === numPages;
        const prevPage =
            currentPage - 1 === 1 ? '/' : 'page/' + (currentPage - 1) + '/';
        const nextPage = 'page/' + (currentPage + 1) + '/';

        const seoTitle = isFirst ? 'All Posts' : 'Page ' + currentPage;

        return (
            <Layout>
                <SEO title={seoTitle} />
                {posts.map(({ node }) => {
                    const title = node.frontmatter.title || node.fields.slug;
                    return (
                        <article key={node.fields.slug}>
                            <header>
                                <h3 className="text-2xl font-bold mt-2 mb-1">
                                    <Link to={node.fields.slug}>{title}</Link>
                                </h3>
                                <p className="text-sm leading-loose mb-2 text-gray-800">
                                    {node.frontmatter.date}
                                </p>
                            </header>
                            <section>
                                <p
                                    className="mb-8"
                                    dangerouslySetInnerHTML={{
                                        __html:
                                            node.frontmatter.description ||
                                            node.excerpt,
                                    }}
                                />
                            </section>
                        </article>
                    );
                })}

                <nav>
                    <ul className="flex flex-wrap justify-between mb-8">
                        <li>
                            {!isFirst && (
                                <Link to={prevPage} rel="prev">
                                    ← Newer Posts
                                </Link>
                            )}
                        </li>
                        <li>
                            {!isLast && (
                                <Link to={nextPage} rel="next">
                                    Older Posts →
                                </Link>
                            )}
                        </li>
                    </ul>
                </nav>
            </Layout>
        );
    }
}

export default BlogIndex;

export const pageQuery = graphql`
    query pageListQuery($skip: Int!, $limit: Int!) {
        site {
            siteMetadata {
                title
            }
        }
        allMarkdownRemark(
            sort: { fields: [frontmatter___date], order: DESC }
            limit: $limit
            skip: $skip
        ) {
            edges {
                node {
                    excerpt
                    fields {
                        slug
                    }
                    frontmatter {
                        date(formatString: "DD MMMM YYYY")
                        title
                        description
                    }
                }
            }
        }
    }
`;
