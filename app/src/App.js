import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { Map } from './Map';
import { News } from './News';
import { PageTemplate } from './PageTemplate';

import styles from './App.css'; // eslint-disable-line

export const paths = {
  map: {
    name: 'World Map',
    path: '/',
  },
  news: {
    name: 'News Feed',
    path: '/news',
  },
};

function App() {
  return (
    <Router>
      <PageTemplate>
        <Switch>
          <Route exact path={paths.map.path}>
            {/* TODO: Add back once app deployed. Preserving API calls */}
            {/* <Map /> */}
          </Route>

          <Route exact path={paths.news.path}>
            <News />
          </Route>
        </Switch>
      </PageTemplate>
    </Router>
  );
}

export default App;
