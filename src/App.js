import React, { useEffect, useState } from 'react';
import ReactGA from 'react-ga';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Dashboard from './Dashboard';
import Map from './Map';
import NotFound from './NotFound';
import PageTemplate from './PageTemplate';
import { getTotals } from './services';

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
  const [totals, setTotals] = useState({
    active: 489310,
    cases: 642531,
    deaths: 19197,
    prevActive: 0,
    prevCases: 0,
    prevDeaths: 0,
    prevRecovered: 0,
    recovered: 134024,
    updated: null,
  });

  // On mount
  useEffect(() => {
    // Initialize Google Analytics
    ReactGA.initialize(process.env.REACT_APP_GOOGLE_ANALYTICS_TRACKING_ID);
    ReactGA.pageview(window.location.pathname + window.location.search);

    // Get total counts
    const _totalData = async () => {
      const {
        data: { active, cases, deaths, recovered, updated },
      } = await getTotals();

      setTotals({
        active,
        cases,
        deaths,
        prevActive: totals.active,
        prevCases: totals.cases,
        prevDeaths: totals.deaths,
        prevRecovered: totals.recovered,
        recovered,
        updated,
      });
    };

    _totalData();
  }, []); // eslint-disable-line

  return (
    <Router>
      <PageTemplate totals={totals}>
        <Switch>
          <Route
            exact
            path={paths.dashboard.path}
            render={_props => <Dashboard totals={totals} />}
          />
          <Route component={Map} exact path={paths.map.path} />
          <Route component={NotFound} />
        </Switch>
      </PageTemplate>
    </Router>
  );
}

export default App;
