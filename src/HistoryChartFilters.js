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
  const [minDate, setMinDate] = useState(startDateFilter);

  return {
    country,
    endDateFilter,
    minDate,
    setCountry,
    setEndDateFilter,
    setMinDate,
    setStartDateFilter,
    startDateFilter,
  };
};

export default function HistoryChartFilters({
  endDateFilter,
  minDate,
  setEndDateFilter,
  setStartDateFilter,
  startDateFilter,
}) {
  const classes = useStyles();

  const pickerProps = {
    autoOk: true,
    disableToolbar: true,
    format: 'MM/dd/yyyy',
    margin: 'normal',
    maxDateMessage: 'Cannot filter chart by this date.',
    minDateMessage: 'Cannot filter chart by this date.',
    variant: 'inline',
  };

  return (
    <Grid className={classes.root} component="section" container>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <FormControl className={classes.formControl}>
          <KeyboardDatePicker
            {...pickerProps}
            label="Start Date"
            maxDate={moment(endDateFilter).subtract(1, 'days')}
            minDate={minDate}
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
            label="End Date"
            maxDate={moment()}
            minDate={moment(startDateFilter).add(1, 'days')}
            onChange={setEndDateFilter}
            value={endDateFilter}
            KeyboardButtonProps={{
              'aria-label': 'change end date',
            }}
          />
        </FormControl>
      </MuiPickersUtilsProvider>
    </Grid>
  );
}
