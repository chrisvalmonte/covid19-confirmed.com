import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import CountUp from 'react-countup';
import numeral from 'numeral';

const useStyles = makeStyles({
  content: {
    paddingLeft: '16px',
    paddingRight: '16px',
    paddingTop: '16px',
    '&:last-child': {
      paddingBottom: 0,
    },
  },
  count: {
    fontWeight: 'bold',
  },
  pos: {
    marginBottom: '12px',
  },
  root: {
    backgroundColor: 'transparent',
    border: 0,
    boxShadow: 'none',
    width: '100%',
    '&:first-child > *': {
      paddingTop: 0,
    },
  },
});

export default function CountCard({ count, countColor, prevCount, title }) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardContent className={classes.content}>
        {title}

        <Typography
          className={classes.count}
          component="h2"
          style={{ color: countColor }}
          variant="h4"
        >
          <CountUp
            end={count}
            formattingFn={number => numeral(number).format('0,0')}
            start={prevCount}
            useEasing={false}
          />
        </Typography>
      </CardContent>
    </Card>
  );
}
