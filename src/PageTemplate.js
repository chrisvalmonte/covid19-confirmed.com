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

import useMediaQuery from '@material-ui/core/useMediaQuery';
import clsx from 'clsx';
import moment from 'moment';

import logo from './logo.svg';

import { usePageTemplateStyles } from './PageTemplate.styles';
import SiteLinks from './SiteLinks';
import StatTotals from './StatTotals';

export default function PageTemplate({ children, totals }) {
  const classes = usePageTemplateStyles();
  const isMediumBreakpoint = useMediaQuery('(min-width: 960px)');

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const _toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  // Fix bug when user opens sidebar on a small screen and then enlarges the browser window
  useEffect(() => {
    isMediumBreakpoint && isDrawerOpen && setIsDrawerOpen(false);
  }, [isDrawerOpen, isMediumBreakpoint, setIsDrawerOpen]);

  const lastUpdatedContent = (
    <Typography className={classes.lastUpdated}>
      {totals.updated
        ? `Last Update: ${moment(totals.updated).format('MM/DD/YYYY')} at
                ${moment(totals.updated).format('h:mmA')}`
        : 'Finding statistics...'}
    </Typography>
  );

  return (
    <div className={classes.root}>
      <CssBaseline />

      <Hidden mdUp>
        <AppBar className={classes.appBar}>
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
            <SiteLinks />
            <StatTotals totals={totals} />
            {lastUpdatedContent}
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
            <StatTotals totals={totals} />
            <SiteLinks />
            {lastUpdatedContent}
          </Drawer>
        </Hidden>
      </nav>

      <main className={classes.content}>{children}</main>
    </div>
  );
}
