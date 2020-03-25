import { graphql, useStaticQuery } from 'gatsby';
import Image from 'gatsby-image';
import React from 'react';

/**
 * Bio component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */
const Bio = () => {
    const data = useStaticQuery(graphql`
        query BioQuery {
            avatar: file(absolutePath: { regex: "/bio.jpg/" }) {
                childImageSharp {
                    fixed {
                        ...GatsbyImageSharpFixed
                    }
                }
            }
            site {
                siteMetadata {
                    author
                    social {
                        twitter
                    }
                }
            }
        }
    `);

    const { author, social } = data.site.siteMetadata;
    return (
        <div className="flex mb-10 px-2 py-2 rounded overflow-hidden shadow-xs bg-gray-100">
            <Image
                className="mr-4 mb-0 rounded-full"
                fixed={data.avatar.childImageSharp.fixed}
                alt={author}
                style={{
                    width: 50,
                    minWidth: 50,
                    height: 50,
                }}
            />
            <p>
                Hi, i'm <strong>{author}</strong>. You found my (B)log which is
                mainly about my dev journey with Angular, .NET and everything
                else that interests me. <br />
                You can follow or interact with me on Twitter&nbsp;
                <a href={`https://twitter.com/${social.twitter}`}>
                    @{social.twitter}
                </a>
            </p>
        </div>
    );
};

export default Bio;
