import React from 'react';

import {storiesOf} from '@storybook/react';

storiesOf('The App', module)
  .add('font sizes', () => {
    return (
      <article>
        <header>Header text</header>
        <h1>H1 text</h1>
        <h2>H2 text</h2>
        <h3>H3 text</h3>
        <div>body text</div>
      </article>
    );
  });
