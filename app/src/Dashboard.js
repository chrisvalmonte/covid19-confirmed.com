import React, { useEffect, useState } from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import grey from '@material-ui/core/colors/grey';
import { makeStyles } from '@material-ui/core/styles';
import {
  HorizontalGridLines,
  LineMarkSeries,
  VerticalGridLines,
  XAxis,
  XYPlot,
  YAxis,
} from 'react-vis';

import { DataTable } from './DataTable';
import { getCountries, getHistory } from './services';
import { rootStyles } from './App';

const useStyles = makeStyles(() => ({
  root: {
    ...rootStyles,
    backgroundColor: grey[100],
  },
}));

export function Dashboard() {
  const classes = useStyles();

  const [countryTableBodyRows, setCountryTableBodyRows] = useState([]);
  const [todayTableBodyRows, setTodayTableBodyRows] = useState([]);
  const [history, setHistory] = useState([]);

  // Get data for tables and charts when component mounts
  useEffect(() => {
    const _countryData = async () => {
      const { data } = await getCountries();

      const countryTableData = data.map(
        ({ active, cases, country, deaths, recovered }) => ({
          id: country,
          country,
          active,
          deaths,
          recovered,
          cases,
        }),
      );
      setCountryTableBodyRows(countryTableData);

      const todayTableData = data.map(
        ({ country, todayCases, todayDeaths }) => ({
          id: country,
          country,
          todayDeaths,
          todayCases,
        }),
      );
      setTodayTableBodyRows(todayTableData);
    };

    const _historyData = async () => {
      const { data } = await getHistory();
      setHistory(data);
    };

    _countryData();
    _historyData();
  }, []); // eslint-disable-line

  const countryTableHeadCells = [
    { id: 'country', label: 'Country' },
    {
      id: 'active',
      label: 'Active Cases',
    },
    { id: 'deaths', label: 'Deaths' },
    { id: 'recovered', label: 'Recovered' },
    { id: 'cases', label: 'Total Confirmed' },
  ];
  const todayTableHeadCells = [
    { id: 'country', label: 'Country' },
    { id: 'todayDeaths', label: 'Deaths' },
    { id: 'todayCases', label: 'Cases' },
  ];

  return (
    <article className={classes.root}>
      <Container>
        <Grid container spacing={3}>
          {/* Country overview table */}
          {/* Country overview */}
          <Grid item xs={12}>
            <DataTable
              bodyRows={countryTableBodyRows}
              headCells={countryTableHeadCells}
              initialOrder="desc"
              initialOrderBy="active"
            />
          </Grid>

          {/* Today table */}
          {/* Confirmed today */}
          <Grid item xs={12}>
            <DataTable
              bodyRows={todayTableBodyRows}
              headCells={todayTableHeadCells}
              initialOrder="desc"
              initialOrderBy="todayCases"
            />
          </Grid>
        </Grid>
      </Container>
    </article>
  );
}

function LineChart(props) {
  return (
    <XYPlot width={300} height={300}>
      <VerticalGridLines />
      <HorizontalGridLines />
      <XAxis />
      <YAxis />
      <LineMarkSeries
        className="linemark-series-example"
        style={{
          strokeWidth: '3px',
        }}
        lineStyle={{ stroke: 'red' }}
        markStyle={{ stroke: 'blue' }}
        data={[
          { x: 1, y: 10 },
          { x: 2, y: 5 },
          { x: 3, y: 15 },
        ]}
      />
      <LineMarkSeries
        className="linemark-series-example-2"
        curve={'curveMonotoneX'}
        data={[
          { x: 1, y: 11 },
          { x: 1.5, y: 29 },
          { x: 3, y: 7 },
        ]}
      />
    </XYPlot>
  );
}
