import Typography from 'typography';

import RootixTheme from './typography-theme-rootix-ch';

const typography = new Typography(RootixTheme);

// Hot reload typography in development.
if (process.env.NODE_ENV !== `production`) {
    typography.injectStyles();
}

export default typography;
export const rhythm = typography.rhythm;
export const scale = typography.scale;
