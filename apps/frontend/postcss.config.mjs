/** @type {import('postcss-load-config').Config} */
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';

const config = {
  plugins: [
    tailwindcss,
    autoprefixer,
    process.env.NODE_ENV === 'production' && cssnano
  ].filter(Boolean) 
};

export default config;
