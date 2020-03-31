import React, { useEffect, useRef, useState } from 'react';
import Container from '@material-ui/core/Container';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import RootRef from '@material-ui/core/RootRef';
import Typography from '@material-ui/core/Typography';
import grey from '@material-ui/core/colors/grey';
import { makeStyles } from '@material-ui/core/styles';

import DataTable from './DataTable';
import HistoryChart from './HistoryChart';
import PieChart from './PieChart';
import { getCountries, getHistory, getUSStates } from './services';
import { rootStyles } from './App';

const historyChartContainerPadding = 8; // 8px

const useStyles = makeStyles(() => ({
  divider: {
    marginBottom: '16px',
  },
  header: {
    marginBottom: '12px',
  },
  historyChartContainer: {
    padding: `${historyChartContainerPadding}px`,
  },
  pie: {
    margin: 'auto',
  },
  root: {
    ...rootStyles,
    backgroundColor: grey[100],
  },
  temp: {
    marginTop: '50px',
    textAlign: 'center',
  },
}));

export default function Dashboard() {
  const classes = useStyles();

  const [countryTableBodyRows, setCountryTableBodyRows] = useState([]);
  const [history, setHistory] = useState([]);
  const [todayTableBodyRows, setTodayTableBodyRows] = useState([]);
  const todayTableRef = useRef(null);
  const [USATableBodyRows, setUSATableBodyRows] = useState([]);
  const USATableRef = useRef(null);
  const [USAPieChartData, setUSAPieChartData] = useState([]);

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
          todayCases,
          todayDeaths,
        }),
      );
      setTodayTableBodyRows(todayTableData);
    };

    const _historyData = async () => {
      const { data } = await getHistory();

      // TODO: Make graph dynamic. Add date and country filters
      const historyChartData = data.filter(
        ({ country }) => country.toLowerCase() === 'usa',
      );
      setHistory(historyChartData);
    };

    const _usStateData = async () => {
      const { data } = await getUSStates();

      const USATableData = data.map(({ active, cases, deaths, state }) => ({
        id: state,
        state,
        active,
        deaths,
        cases,
      }));
      setUSATableBodyRows(USATableData);

      const USAPieData = data.map(({ cases, state }) => {
        return {
          label: state,
          value: cases,
        };
      });
      setUSAPieChartData(USAPieData);
    };

    _countryData();
    _historyData();
    _usStateData();
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
    { id: 'todayCases', label: 'Cases' },
    { id: 'todayDeaths', label: 'Deaths' },
  ];
  const USATableHeadCells = [
    { id: 'state', label: 'State' },
    {
      id: 'active',
      label: 'Active Cases',
    },
    { id: 'deaths', label: 'Deaths' },
    { id: 'cases', label: 'Total Confirmed' },
  ];

  return (
    <article className={classes.root}>
      <Container>
        <Grid container spacing={3}>
          {/* Today table */}
          <Grid item xs={12} md={5}>
            <DashboardHeader>Newly Confirmed</DashboardHeader>

            <RootRef rootRef={todayTableRef}>
              <DataTable
                bodyRows={todayTableBodyRows}
                headCells={todayTableHeadCells}
                initialOrder="desc"
                initialOrderBy="todayCases"
              />
            </RootRef>
          </Grid>

          {/* History chart */}
          <Grid item xs={12} md={7}>
            <DashboardHeader>USA Case History</DashboardHeader>

            <Paper className={classes.historyChartContainer}>
              <HistoryChart
                height={
                  todayTableRef.current
                    ? todayTableRef.current.offsetHeight -
                      historyChartContainerPadding * 2
                    : 300
                }
                history={history}
              />
            </Paper>
          </Grid>

          {/* Country overview table */}
          <Grid item xs={12}>
            <DashboardHeader>Country Overview</DashboardHeader>

            <DataTable
              bodyRows={countryTableBodyRows}
              headCells={countryTableHeadCells}
              initialOrder="desc"
              initialOrderBy="active"
            />
          </Grid>

          {/* USA Overview */}
          <Grid item xs={12}>
            <DashboardHeader>USA Overview</DashboardHeader>
          </Grid>
          {/* USA overview table */}
          <Grid item xs={12} lg={7}>
            <RootRef rootRef={USATableRef}>
              <DataTable
                bodyRows={USATableBodyRows}
                headCells={USATableHeadCells}
                initialOrder="desc"
                initialOrderBy="active"
              />
            </RootRef>
          </Grid>
          {/* USA overview pie chart */}
          {/* TODO: Connect table to chart */}
          <Grid item xs={12} lg={5}>
            <PieChart
              className={classes.pie}
              diameter={
                USATableRef.current ? USATableRef.current.offsetHeight : 300
              }
              data={USAPieChartData}
              valueType="Cases"
            />
          </Grid>

          <Grid item xs={12}>
            <Typography className={classes.temp} component="h3" variant="h6">
              More insights coming soon...
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </article>
  );
}

function DashboardHeader({ children }) {
  const classes = useStyles();

  return (
    <>
      <Typography className={classes.header} component="h2" variant="h5">
        {children}
      </Typography>
      <Divider className={classes.divider} />
    </>
  );
}
