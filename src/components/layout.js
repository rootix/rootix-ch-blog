import React from 'react';

import Footer from './footer';
import Header from './header';

class Layout extends React.Component {
    render() {
        const { children } = this.props;

        return (
            <>
                <Header />
                <div className="max-w-2xl mx-auto px-5 xl:mt-16 mb-4">
                    <main>{children}</main>
                    <Footer />
                </div>
            </>
        );
    }
}

export default Layout;
