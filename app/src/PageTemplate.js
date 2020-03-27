import React, { useState } from 'react';

import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import MenuIcon from '@material-ui/icons/Menu';

import clsx from 'clsx';

import { usePageTemplateStyles } from './PageTemplate.styles';

export function PageTemplate({ children }) {
  const classes = usePageTemplateStyles();

  const [isDrawerOpen, setIsDrawerOpen] = useState(true);

  const _openDrawer = () => {
    setIsDrawerOpen(true);
  };

  const _closeDrawer = () => {
    setIsDrawerOpen(false);
  };

  return (
    <article className={classes.root}>
      <CssBaseline />

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
            onClick={_openDrawer}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            className={classes.title}
            color="inherit"
            component="h1"
            noWrap
            variant="h6"
          >
            COVID-19 Tracker
          </Typography>
        </Toolbar>
      </AppBar>

      <Drawer
        classes={{
          paper: clsx(
            classes.drawerPaper,
            !isDrawerOpen && classes.drawerPaperClose,
          ),
        }}
        open={isDrawerOpen}
        variant="permanent"
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={_closeDrawer}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
      </Drawer>

      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        {children}
      </main>
    </article>
  );
}
