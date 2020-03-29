import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import MenuIcon from '@material-ui/icons/Menu';
import PublicIcon from '@material-ui/icons/Public';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import green from '@material-ui/core/colors/green';
import grey from '@material-ui/core/colors/grey';
import red from '@material-ui/core/colors/red';
import yellow from '@material-ui/core/colors/yellow';
import clsx from 'clsx';
import moment from 'moment';

import logo from './logo.svg';
import { paths } from './App';
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

  const drawerContent = (
    <>
      <List className={classes.links}>
        <NavLink
          activeClassName={classes.linkActive}
          className={classes.link}
          exact
          to={paths.map.path}
        >
          <ListItem button>
            <ListItemIcon>
              <PublicIcon style={{ color: grey[100] }} />
            </ListItemIcon>
            <ListItemText primary={paths.map.name} />
          </ListItem>
        </NavLink>

        <NavLink
          activeClassName={classes.linkActive}
          className={classes.link}
          exact
          to={paths.news.path}
        >
          <ListItem button>
            <ListItemIcon>
              <MenuBookIcon style={{ color: grey[100] }} />
            </ListItemIcon>
            <ListItemText primary={paths.news.name} />
          </ListItem>
        </NavLink>
      </List>

      {renderedTotals.map(({ id, ...data }) => (
        <CountCard key={id} {...data} />
      ))}

      <Typography className={classes.lastUpdated}>
        {totals.updated
          ? `Last Update: ${moment(totals.updated).format('MM/DD/YYYY')} at
                ${moment(totals.updated).format('h:mmA')}`
          : 'Finding statistics...'}
      </Typography>
    </>
  );

  return (
    <article className={classes.root}>
      <CssBaseline />

      <Hidden mdUp>
        <AppBar
          className={clsx(classes.appBar, isDrawerOpen && classes.appBarShift)}
          position="absolute"
        >
          <Toolbar className={classes.toolbar}>
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

            <img alt="COVID-19" className={classes.toolbarLogo} src={logo} />
          </Toolbar>
        </AppBar>
      </Hidden>

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
            onOpen={_toggleDrawer}
            open={isDrawerOpen}
            variant="temporary"
          >
            {drawerContent}
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
            <img alt="COVID-19" className={classes.drawerLogo} src={logo} />
            {drawerContent}
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
