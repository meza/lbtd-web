import React from 'react';
import Styles from './App.scss';

export default () => {
  return (
    <main className={Styles.main}>
      <header className={Styles.header}/>
      <article className={Styles.content}>
        New website coming soon
      </article>
      <footer className={Styles.footer}/>
    </main>
  );
};
