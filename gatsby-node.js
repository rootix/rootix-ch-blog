const path = require(`path`);
const loadash = require('lodash');
const limax = require('limax');

exports.createPages = async ({ graphql, actions }) => {
    const { createPage } = actions;

    const content = await graphql(
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
                                template
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

    if (content.errors) {
        throw content.errors;
    }

    const posts = content.data.allMarkdownRemark.edges.filter(
        (e) => e.node.frontmatter.template === 'post'
    );
    const tags = content.data.tagsGroup.group;

    createBlog(posts, tags);
    createPages(
        content.data.allMarkdownRemark.edges.filter(
            (e) => e.node.frontmatter.template === 'page'
        )
    );

    function createBlog(posts, tags) {
        const postListTemplate = path.resolve(
            `./src/templates/post-list-template.js`
        );
        const postTemplate = path.resolve(`./src/templates/post-template.js`);
        const tagTemplate = path.resolve('src/templates/tag-template.js');

        const postsPerPage = 10;

        // Create blog posts list pages
        const numPages = Math.ceil(posts.length / postsPerPage);
        Array.from({ length: numPages }).forEach((_, i) => {
            createPage({
                path: i === 0 ? `/` : `/page/${i + 1}/`,
                component: postListTemplate,
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
                component: postTemplate,
                context: {
                    slug: post.node.fields.slug,
                    previous,
                    next,
                },
            });
        });

        // Extract tag data from query

        // Make tag pages
        tags.forEach((tag) => {
            const postsWithTag = posts.filter(
                (p) => p.node.frontmatter.tags.indexOf(tag.fieldValue) != -1
            );
            const numPagesForTag = Math.ceil(
                postsWithTag.length / postsPerPage
            );
            Array.from({ length: numPagesForTag }).forEach((_, i) => {
                createPage({
                    path:
                        i === 0
                            ? `/tags/${loadash.kebabCase(tag.fieldValue)}/`
                            : `/tags/${loadash.kebabCase(
                                  tag.fieldValue
                              )}/page/${i + 1}/`,
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
    }

    function createPages(pages) {
        const pageTemplate = path.resolve(`./src/templates/page-template.js`);
        pages.forEach((page) => {
            createPage({
                path: page.node.fields.slug,
                component: pageTemplate,
                context: {
                    slug: page.node.fields.slug,
                },
            });
        });
    }
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
