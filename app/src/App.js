import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { Map } from './Map';
import { News } from './News';
import { NotFound } from './NotFound';
import { PageTemplate } from './PageTemplate';

import styles from './App.css'; // eslint-disable-line

export const paths = {
  dashboard: {
    name: 'Dashboard',
    path: '/dashboard',
  },
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
          <Route component={Map} exact path={paths.map.path} />
          <Route component={News} exact path={paths.news.path} />
          <Route component={NotFound} />
        </Switch>
      </PageTemplate>
    </Router>
  );
}

export default App;
