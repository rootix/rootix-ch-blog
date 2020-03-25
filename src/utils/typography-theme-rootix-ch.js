import verticalRhythm from 'compass-vertical-rhythm';
import gray from 'gray-percentage';
import { MOBILE_MEDIA_QUERY } from 'typography-breakpoint-constants';

const theme = {
    title: 'Ocean Beach',
    baseFontSize: '18px',
    baseLineHeight: 1.58,
    headerFontFamily: ['Roboto Slab', 'sans-serif'],
    bodyFontFamily: ['Roboto', 'serif'],
    headerColor: 'hsla(0,0%,0%,0.9)',
    bodyColor: 'hsla(0,0%,18%,1)',
    headerWeight: 700,
    bodyWeight: 400,
    boldWeight: 700,
    overrideStyles: ({ adjustFontSizeTo, scale, rhythm }, options) => {
        const linkColor = '#000000';
        const accentColor = '#186db6';
        const vr = verticalRhythm({
            baseFontSize: '17px',
            baseLineHeight: '28px',
        });
        return {
            a: {
                color: linkColor,
                textDecoration: 'none',
                backgroundImage: `linear-gradient(to top, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0) 1px, ${accentColor} 2px, rgba(0, 0, 0, 0) 3px)`, // eslint-disable-line
            },
            'a:hover,a:active': {
                color: accentColor,
            },
            'a.icon': {
                backgroundImage: 'none',
            },
            'h1,h2,h3,h4,h5,h6': {
                marginTop: rhythm(2),
            },
            // children ol, ul
            'li>ol,li>ul': {
                marginLeft: '20px',
                marginBottom: 0,
            },
            // Blockquote styles.
            blockquote: {
                ...scale(1 / 5),
                borderLeft: `${rhythm(6 / 16)} solid ${accentColor}`,
                color: gray(35),
                paddingLeft: rhythm(10 / 16),
                fontStyle: 'italic',
                marginLeft: 0,
                marginRight: 0,
            },
            'blockquote > :last-child': {
                marginBottom: 0,
            },
            'blockquote cite': {
                ...adjustFontSizeTo(options.baseFontSize),
                color: options.bodyColor,
                fontStyle: 'normal',
                fontWeight: options.bodyWeight,
            },
            'blockquote cite:before': {
                content: '"— "',
            },
            [MOBILE_MEDIA_QUERY]: {
                html: {
                    ...vr.establishBaseline(),
                },
                blockquote: {
                    borderLeft: `${rhythm(3 / 16)} solid ${accentColor}`,
                    color: gray(41),
                    paddingLeft: rhythm(9 / 16),
                    fontStyle: 'italic',
                    marginLeft: rhythm(-3 / 4),
                    marginRight: 0,
                },
            },
        };
    },
};

export default theme;
