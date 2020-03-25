import { graphql, Link } from 'gatsby';
import { kebabCase } from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';

import Layout from '../components/layout';
import SEO from '../components/seo';

// Components
const Tags = ({ pageContext, data }) => {
    const { tag, currentPage, numPages } = pageContext;
    const { edges } = data.allMarkdownRemark;
    const isFirst = currentPage === 1;
    const isLast = currentPage === numPages;
    const tagSlug = '/tags/' + kebabCase(tag) + '/';
    const prevPage =
        currentPage - 1 === 1
            ? tagSlug
            : tagSlug + 'page/' + (currentPage - 1) + '/';
    const nextPage = tagSlug + 'page/' + (currentPage + 1) + '/';
    const seoTitle = isFirst
        ? `Posts tagged with "${tag}"`
        : `Page ${currentPage} of posts tagged with "${tag}"`;

    return (
        <Layout>
            <SEO title={seoTitle} />
            <h1 className="text-4xl font-bold mt-4 xl:mt-8 mb-16">
                Posts tagged with "{tag}"
            </h1>
            {edges.map(({ node }) => {
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
};

Tags.propTypes = {
    pageContext: PropTypes.shape({
        tag: PropTypes.string.isRequired,
    }),
    data: PropTypes.shape({
        allMarkdownRemark: PropTypes.shape({
            totalCount: PropTypes.number.isRequired,
            edges: PropTypes.arrayOf(
                PropTypes.shape({
                    node: PropTypes.shape({
                        frontmatter: PropTypes.shape({
                            title: PropTypes.string.isRequired,
                            description: PropTypes.string.isRequired,
                            date: PropTypes.any.isRequired,
                        }),
                        fields: PropTypes.shape({
                            slug: PropTypes.string.isRequired,
                        }),
                    }),
                }).isRequired
            ),
        }),
    }),
};

export default Tags;

export const pageQuery = graphql`
    query($tag: String, $skip: Int!, $limit: Int!) {
        allMarkdownRemark(
            sort: { fields: [frontmatter___date], order: DESC }
            filter: { frontmatter: { tags: { in: [$tag] } } }
            limit: $limit
            skip: $skip
        ) {
            totalCount
            edges {
                node {
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
