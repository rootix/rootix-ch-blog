import { Link } from 'gatsby';
import React from 'react';

class Header extends React.Component {
    render() {
        return (
            <header className="mt-8 mb-16">
                <div className="relative flex justify-center xl:fixed xl:top-1 xl:left-3">
                    <Link
                        className="text-6xl font-bold font-serif"
                        to={`/`}
                        title="Rootix Blog"
                    >
                        &lt;R /&gt;
                    </Link>
                </div>
            </header>
        );
    }
}

export default Header;
