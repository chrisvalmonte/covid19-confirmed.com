import React, { useEffect, useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import green from '@material-ui/core/colors/green';
import grey from '@material-ui/core/colors/grey';
import red from '@material-ui/core/colors/red';
import yellow from '@material-ui/core/colors/yellow';
import clsx from 'clsx';

import { CountCard } from './CountCard';
import { getTotals } from './services';
import { usePageTemplateStyles } from './PageTemplate.styles';

export function PageTemplate({ children }) {
  const classes = usePageTemplateStyles();

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const _toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const [totals, setTotals] = useState({
    active: 0,
    cases: 0,
    deaths: 0,
    prevActive: 0,
    prevCases: 0,
    prevDeaths: 0,
    prevRecovered: 0,
    recovered: 0,
    updated: null,
  });

  // Get total counts when component mounts
  useEffect(() => {
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

  const renderedTotals = [
    {
      count: totals.active,
      countColor: red[500],
      id: 'total--active',
      prevCount: totals.prevActive,
      title: 'Active Cases',
    },
    {
      count: totals.deaths,
      countColor: yellow[500],
      id: 'total--deaths',
      prevCount: totals.prevDeaths,
      title: 'Deaths',
    },
    {
      count: totals.recovered,
      countColor: green[400],
      id: 'total--recovered',
      prevCount: totals.prevRecovered,
      title: 'Recovered',
    },
    {
      count: totals.cases,
      countColor: grey[100],
      id: 'total--cases',
      prevCount: totals.prevCases,
      title: 'Total Confirmed',
    },
  ];

  return (
    <article className={classes.root}>
      <CssBaseline />

      <AppBar
        className={clsx(classes.appBar, isDrawerOpen && classes.appBarShift)}
        position="absolute"
      >
        <Toolbar className={classes.toolbar}>
          <Hidden mdUp>
            <IconButton
              aria-label="open drawer"
              className={clsx(
                classes.menuButton,
                isDrawerOpen && classes.menuButtonHidden,
              )}
              color="inherit"
              edge="start"
              onClick={_toggleDrawer}
            >
              <MenuIcon />
            </IconButton>
          </Hidden>

          <Typography
            className={classes.title}
            color="inherit"
            component="h1"
            noWrap
            variant="h6"
          >
            COVID-19 Confirmed
          </Typography>
        </Toolbar>
      </AppBar>

      <nav className={classes.drawer} aria-label="site navigation">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden mdUp implementation="css">
          <SwipeableDrawer
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Used for better performance on mobile
            }}
            onClose={_toggleDrawer}
            open={isDrawerOpen}
            variant="temporary"
          >
            {renderedTotals.map(({ id, ...data }) => (
              <CountCard {...data} />
            ))}
          </SwipeableDrawer>
        </Hidden>

        <Hidden smDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            open
            variant="permanent"
          >
            {renderedTotals.map(({ id, ...data }) => (
              <CountCard key={id} {...data} />
            ))}
          </Drawer>
        </Hidden>
      </nav>

      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        {children}
      </main>
    </article>
  );
}
