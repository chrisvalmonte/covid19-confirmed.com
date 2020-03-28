import React, { useState } from 'react';

import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import MenuIcon from '@material-ui/icons/Menu';

import clsx from 'clsx';

import { usePageTemplateStyles } from './PageTemplate.styles';

export function PageTemplate({ children }) {
  const classes = usePageTemplateStyles();

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const _toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

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
            TODO: Show stuff
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
            TODO: Show stuff
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
