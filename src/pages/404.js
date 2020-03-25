import { graphql } from 'gatsby';
import React from 'react';

import Layout from '../components/layout';
import SEO from '../components/seo';

class NotFoundPage extends React.Component {
    render() {
        return (
            <Layout>
                <SEO title="404: Not Found" />
                <h1 className="text-5xl font-black mt-16 mb-8">Not Found</h1>
                <p className="mb-8">
                    You just hit a route that doesn&#39;t exist... the sadness.
                </p>
            </Layout>
        );
    }
}

export default NotFoundPage;

export const pageQuery = graphql`
    query {
        site {
            siteMetadata {
                title
            }
        }
    }
`;
