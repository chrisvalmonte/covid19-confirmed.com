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
  datePicker: {
    marginTop: '32px',
  },
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    padding: '0 8px',
    [theme.breakpoints.up('sm')]: {
      flexDirection: 'row',
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
    className: classes.datePicker,
    disableFuture: true,
    disableToolbar: true,
    format: 'MM/dd/yyyy',
    margin: 'normal',
    variant: 'inline',
  };

  return (
    <Grid className={classes.root} component="section" item>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <FormControl>
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

        <FormControl>
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
