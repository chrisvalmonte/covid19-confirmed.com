import React, { useState } from 'react';
import moment from 'moment';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import DateFnsUtils from '@date-io/date-fns';
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';

const useStyles = makeStyles(theme => ({
  formControl: {
    width: '145px',
    [theme.breakpoints.up('sm')]: {
      width: '200px',
      '&:first-child': {
        marginRight: '32px',
      },
    },
  },
  root: {
    justifyContent: 'space-around',
    padding: '8px',
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      justifyContent: 'flex-start',
      margin: '16px 0',
      paddingLeft: '52px',
    },
  },
}));

export const useHistoryChartFilters = () => {
  const [country, setCountry] = useState([]);
  const [startDateFilter, setStartDateFilter] = useState(moment('02/01/2020'));
  const [endDateFilter, setEndDateFilter] = useState(moment());

  return {
    country,
    endDateFilter,
    setCountry,
    setEndDateFilter,
    setStartDateFilter,
    startDateFilter,
  };
};

export default function HistoryChartFilters({
  endDateFilter,
  setEndDateFilter,
  setStartDateFilter,
  startDateFilter,
}) {
  const classes = useStyles();

  const pickerProps = {
    autoOk: true,
    disableFuture: true,
    disableToolbar: true,
    format: 'MM/dd/yyyy',
    margin: 'normal',
    variant: 'inline',
  };

  return (
    <Grid className={classes.root} component="section" container>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <FormControl className={classes.formControl}>
          <KeyboardDatePicker
            {...pickerProps}
            label="Start Date"
            onChange={setStartDateFilter}
            value={startDateFilter}
            KeyboardButtonProps={{
              'aria-label': 'change start date',
            }}
          />
        </FormControl>

        <FormControl className={classes.formControl}>
          <KeyboardDatePicker
            {...pickerProps}
            format="MM/dd/yyyy"
            label="End Date"
            onChange={setEndDateFilter}
            value={endDateFilter}
          />
        </FormControl>
      </MuiPickersUtilsProvider>
    </Grid>
  );
}
