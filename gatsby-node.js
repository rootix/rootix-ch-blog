const path = require(`path`);
const loadash = require('lodash');
const limax = require('limax');

exports.createPages = async ({ graphql, actions }) => {
    const { createPage } = actions;

    const blogPostList = path.resolve(`./src/templates/blog-post-list.js`);
    const blogPost = path.resolve(`./src/templates/blog-post.js`);
    const tagTemplate = path.resolve('src/templates/tags.js');

    const result = await graphql(
        `
            {
                allMarkdownRemark(
                    sort: { fields: [frontmatter___date], order: DESC }
                    limit: 1000
                ) {
                    edges {
                        node {
                            fields {
                                slug
                            }
                            frontmatter {
                                title
                                tags
                            }
                        }
                    }
                }
                tagsGroup: allMarkdownRemark(limit: 2000) {
                    group(field: frontmatter___tags) {
                        fieldValue
                    }
                }
            }
        `
    );

    if (result.errors) {
        throw result.errors;
    }

    const posts = result.data.allMarkdownRemark.edges;
    const postsPerPage = 10;

    // Create blog posts list pages
    const numPages = Math.ceil(posts.length / postsPerPage);
    Array.from({ length: numPages }).forEach((_, i) => {
        createPage({
            path: i === 0 ? `/` : `/page/${i + 1}/`,
            component: blogPostList,
            context: {
                limit: postsPerPage,
                skip: i * postsPerPage,
                numPages,
                currentPage: i + 1,
            },
        });
    });

    // Create blog posts pages.
    posts.forEach((post, index) => {
        const previous =
            index === posts.length - 1 ? null : posts[index + 1].node;
        const next = index === 0 ? null : posts[index - 1].node;
        createPage({
            path: post.node.fields.slug,
            component: blogPost,
            context: {
                slug: post.node.fields.slug,
                previous,
                next,
            },
        });
    });

    // Extract tag data from query
    const tags = result.data.tagsGroup.group;
    // Make tag pages
    tags.forEach((tag) => {
        const postsWithTag = posts.filter(
            (p) => p.node.frontmatter.tags.indexOf(tag.fieldValue) != -1
        );
        const numPagesForTag = Math.ceil(postsWithTag.length / postsPerPage);
        Array.from({ length: numPagesForTag }).forEach((_, i) => {
            createPage({
                path:
                    i === 0
                        ? `/tags/${loadash.kebabCase(tag.fieldValue)}/`
                        : `/tags/${loadash.kebabCase(tag.fieldValue)}/page/${
                              i + 1
                          }/`,
                component: tagTemplate,
                context: {
                    tag: tag.fieldValue,
                    limit: postsPerPage,
                    skip: i * postsPerPage,
                    numPages: numPagesForTag,
                    currentPage: i + 1,
                },
            });
        });
    });
};

exports.onCreateNode = ({ node, actions, _ }) => {
    const { createNodeField } = actions;

    if (node.internal.type === `MarkdownRemark`) {
        createNodeField({
            name: `slug`,
            node,
            value: `/${limax(node.frontmatter.title)}/`,
        });
    }
};
