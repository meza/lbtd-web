import {addParameters, configure} from '@storybook/react';
import {themes} from '@storybook/theming';
import {INITIAL_VIEWPORTS} from "@storybook/addon-viewport/src/defaults";

// automatically import all files ending in *.stories.js
const req = require.context('../stories', true, /\.stories\.js$/);

function loadStories() {
  req.keys().forEach(filename => req(filename));
}

const newViewports = {
  galaxyS5Portrait: {
    name: 'Galaxy S5 - Portrait',
    styles: {
      width: '360px',
      height: '640px',
    },
  },
  pixel2XL: {
    name: 'Pixel 2 XL',
    styles: {
      width: '411px',
      height: '823px',
    },
  },
  ipad: {
    name: 'Pixel 2 XL',
    styles: {
      width: '768px',
      height: '1024px',
    },
  },
};

addParameters({
  viewport: {
    viewports: {
      ...INITIAL_VIEWPORTS,
      ...newViewports
    }
  },
  options: {
    theme: themes.dark,
  },
});

configure(loadStories, module);
