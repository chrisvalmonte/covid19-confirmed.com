import React, { useEffect } from 'react';
import ReactGA from 'react-ga';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Dashboard from './Dashboard';
import Map from './Map';
import NotFound from './NotFound';
import PageTemplate from './PageTemplate';

import './App.css';
import '../node_modules/react-vis/dist/style.css';

export const paths = {
  dashboard: {
    name: 'Dashboard',
    path: '/dashboard',
  },
  map: {
    name: 'World Map',
    path: '/',
  },
};

function App() {
  // Initialize Google Analytics when app mounts
  useEffect(() => {
    ReactGA.initialize(process.env.REACT_APP_GOOGLE_ANALYTICS_TRACKING_ID);
    ReactGA.pageview(window.location.pathname + window.location.search);
  }, []);

  return (
    <Router>
      <PageTemplate>
        <Switch>
          <Route component={Dashboard} exact path={paths.dashboard.path} />
          <Route component={Map} exact path={paths.map.path} />
          <Route component={NotFound} />
        </Switch>
      </PageTemplate>
    </Router>
  );
}

export default App;
