import React, { useEffect, useRef, useState } from 'react';
import _ from 'lodash';
import Container from '@material-ui/core/Container';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import Paper from '@material-ui/core/Paper';
import RootRef from '@material-ui/core/RootRef';
import Typography from '@material-ui/core/Typography';
import amber from '@material-ui/core/colors/amber';
import grey from '@material-ui/core/colors/grey';
import red from '@material-ui/core/colors/red';
import yellow from '@material-ui/core/colors/yellow';
import { makeStyles } from '@material-ui/core/styles';
import { DiscreteColorLegend } from 'react-vis';

import DataTable from './DataTable';
import HistoryChart from './HistoryChart';
import HistoryChartFilters, {
  useHistoryChartFilters,
} from './HistoryChartFilters';
import PieChart from './PieChart';
import { getCountries, getHistory, getUSStates } from './services';
import { rootStyles } from './App';

const historyChartContainerPadding = 8; // 8px

const useStyles = makeStyles(theme => ({
  divider: {
    marginBottom: '16px',
  },
  header: {
    marginBottom: '12px',
  },
  historyChartContainer: {
    padding: `${historyChartContainerPadding}px`,
  },
  pieContainer: {
    display: 'flex',
    marginBottom: '32px',
    justifyContent: 'center',
  },
  pieTitle: {
    paddingBottom: '16px',
    textAlign: 'center',
  },
  root: {
    ...rootStyles,
    backgroundColor: grey[100],
  },
}));

export default function Dashboard() {
  const classes = useStyles();
  const dateFilters = useHistoryChartFilters();

  const [countryTableBodyRows, setCountryTableBodyRows] = useState([]);

  const [history, setHistory] = useState([]);
  const historyFiltersRef = useRef(null);

  const [todayTableBodyRows, setTodayTableBodyRows] = useState([]);
  const todayTableRef = useRef(null);

  const [USATableBodyRows, setUSATableBodyRows] = useState([]);
  const USAPieLegendRef = useRef(null);
  const [USAPieChartData, setUSAPieChartData] = useState([]);
  const USAPieColorRange = [
    red[900],
    red[700],
    red[500],
    amber[700],
    amber[600],
    amber[500],
    amber[400],
    yellow[600],
    yellow[400],
    yellow[200],
  ];

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

      // Top 10 Red Zones in USA
      const USAPieData = _.orderBy(data, ['cases'], ['desc'])
        .slice(0, 10)
        .map(({ cases, state }, index) => ({
          color: USAPieColorRange[index],
          label: state,
          value: cases,
        }));
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
          <Grid component="section" item xs={12} md={5}>
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
          <Grid component="section" item xs={12} md={7}>
            <DashboardHeader>Case History</DashboardHeader>

            <Paper className={classes.historyChartContainer}>
              <HistoryChart
                height={
                  historyFiltersRef.current && todayTableRef.current
                    ? todayTableRef.current.offsetHeight -
                      historyFiltersRef.current.offsetHeight -
                      historyChartContainerPadding * 2
                    : 300
                }
                history={history}
              />

              <RootRef rootRef={historyFiltersRef}>
                <HistoryChartFilters {...dateFilters} />
              </RootRef>
            </Paper>
          </Grid>

          {/* Country overview table */}
          <Grid component="section" item xs={12}>
            <DashboardHeader>Country Overview</DashboardHeader>

            <DataTable
              bodyRows={countryTableBodyRows}
              headCells={countryTableHeadCells}
              initialOrder="desc"
              initialOrderBy="active"
            />
          </Grid>

          {/* USA Overview */}
          <Grid component="section" container item spacing={2} xs={12}>
            <Grid item xs={12}>
              <DashboardHeader>USA Overview</DashboardHeader>
            </Grid>

            {/* USA overview pie chart */}
            {/* FIXME: Layout for xs screens */}
            <Hidden xsDown>
              <Grid
                className={classes.usaOverview}
                container
                item
                xs={12}
                lg={7}
              >
                <Grid item xs={12}>
                  <Typography
                    className={classes.pieTitle}
                    component="h3"
                    variant="h6"
                  >
                    Top 10 Red Zones
                  </Typography>
                </Grid>

                <Grid className={classes.pieContainer} item xs={12}>
                  <RootRef rootRef={USAPieLegendRef}>
                    <DiscreteColorLegend
                      colors={USAPieColorRange}
                      items={USAPieChartData.map(d => d.label)}
                      width={200}
                    />
                  </RootRef>

                  <PieChart
                    data={USAPieChartData}
                    diameter={
                      USAPieLegendRef.current
                        ? USAPieLegendRef.current.offsetHeight
                        : 300
                    }
                    valueType="Total Cases"
                  />
                </Grid>
              </Grid>
            </Hidden>

            <Grid item xs={12} lg={5}>
              {/* USA overview table */}
              <DataTable
                bodyRows={USATableBodyRows}
                headCells={USATableHeadCells}
                initialOrder="desc"
                initialOrderBy="active"
              />
            </Grid>
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
