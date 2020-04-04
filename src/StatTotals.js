import React from 'react';
import { useLocation } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import green from '@material-ui/core/colors/green';
import grey from '@material-ui/core/colors/grey';
import red from '@material-ui/core/colors/red';
import yellow from '@material-ui/core/colors/yellow';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

import { paths } from './App';
import CountCard from './CountCard';

const useStyles = makeStyles(theme => ({
  countTitle: {
    color: grey[200],
    fontSize: '14px',
    marginBottom: '-2px',
  },

  totals: {
    [theme.breakpoints.up('md')]: {
      transform: 'translateX(0)',
      transitionDuration: theme.transitions.duration.standard,
      transitionProperty: 'height, margin, transform, opacity',
      transitionTimingFunction: theme.transitions.easing.easeInOut,
      height: 'auto',
      marginBottom: '32px',
      opacity: 1,
      paddingLeft: '12px',
    },
  },

  totalsHide: {
    [theme.breakpoints.up('md')]: {
      height: 0,
      marginBottom: 0,
      opacity: 0,
      transform: 'translateX(-50px)',
      transitionProperty: 'height, transform',
    },
  },
}));

export default function StateTotals({ totals }) {
  const classes = useStyles();

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
  const { pathname } = useLocation();

  return (
    <section
      className={clsx(
        classes.totals,
        pathname === paths.dashboard.path && classes.totalsHide,
      )}
    >
      {renderedTotals.map(({ id, title, ...data }) => (
        <CountCard
          key={id}
          title={
            <Typography className={classes.countTitle} gutterBottom>
              {title}
            </Typography>
          }
          {...data}
        />
      ))}
    </section>
  );
}