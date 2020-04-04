import React, { useEffect, useRef, useState } from 'react';
import _ from 'lodash';
import moment from 'moment';
import Container from '@material-ui/core/Container';
import Divider from '@material-ui/core/Divider';
import Fab from '@material-ui/core/Fab';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import Paper from '@material-ui/core/Paper';
import RootRef from '@material-ui/core/RootRef';
import Typography from '@material-ui/core/Typography';
import Zoom from '@material-ui/core/Zoom';
import amber from '@material-ui/core/colors/amber';
import green from '@material-ui/core/colors/green';
import grey from '@material-ui/core/colors/grey';
import red from '@material-ui/core/colors/red';
import yellow from '@material-ui/core/colors/yellow';
import { DiscreteColorLegend } from 'react-vis';
import { Waypoint } from 'react-waypoint';

import CountCard from './CountCard';
import DataTable from './DataTable';
import HistoryChart from './HistoryChart';
import HistoryChartFilters, {
  useHistoryChartFilters,
} from './HistoryChartFilters';
import News from './News';
import PieChart from './PieChart';
import { getCountries, getHistory, getUSStates } from './services';
import { useDashboardStyles } from './Dashboard.styles';

export default function Dashboard({ totals }) {
  const classes = useDashboardStyles();
  const dateFilters = useHistoryChartFilters();

  const pageRef = useRef(null);
  const [isFabShown, setIsFabShown] = useState(false);

  const [countryTableBodyRows, setCountryTableBodyRows] = useState([]);

  const [history, setHistory] = useState({});

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

      // Omit first entry from table (data for 'World')
      // Already fetching world totals through services#getTotals
      // eslint-disable-next-line
      const [worldData, ...countryTableData] = data.map(
        ({ active, cases, country, deaths, recovered, todayCases }) => ({
          id: country,
          country,
          active,
          deaths,
          recovered,
          todayCases,
          cases,
        }),
      );
      setCountryTableBodyRows(countryTableData);
    };

    const _historyData = async () => {
      const { data } = await getHistory();

      const countryCaseHistory = data.map(country => country.timeline.cases);
      let totalCaseHistory = {};
      countryCaseHistory.forEach(country => {
        Object.keys(country).forEach(date => {
          if (totalCaseHistory[date] === undefined) {
            totalCaseHistory[date] = country[date];
          } else {
            totalCaseHistory[date] += country[date];
          }
        });
      });

      setHistory(totalCaseHistory);

      const firstDate = moment(Object.keys(totalCaseHistory)[0]);
      dateFilters.setMinDate(firstDate);
      dateFilters.setStartDateFilter(firstDate);
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

  const _scrollToTop = () => {
    pageRef.current.scrollTo(0, pageRef.current.offsetTop);
  };

  const countryTableHeadCells = [
    { id: 'country', label: 'Country' },
    {
      id: 'active',
      label: 'Active Cases',
    },
    { id: 'deaths', label: 'Deaths' },
    { id: 'recovered', label: 'Recovered' },
    { id: 'todayCases', label: 'Newly Confirmed' },
    { id: 'cases', label: 'Total Confirmed' },
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

  const renderedTotals = [
    {
      count: totals.active,
      countColor: red[500],
      id: 'dashboard-total--active',
      prevCount: totals.prevActive,
      title: 'Active Cases',
    },
    {
      count: totals.deaths,
      countColor: yellow[500],
      id: 'dashboard-total--deaths',
      prevCount: totals.prevDeaths,
      title: 'Deaths',
    },
    {
      count: totals.recovered,
      countColor: green[400],
      id: 'dashboard-total--recovered',
      prevCount: totals.prevRecovered,
      title: 'Recovered',
    },
    {
      count: totals.cases,
      countColor: grey[100],
      id: 'dashboard-total--cases',
      prevCount: totals.prevCases,
      title: 'Total Confirmed',
    },
  ];

  return (
    <article className={classes.root} ref={pageRef}>
      <Container>
        <Grid container spacing={3}>
          <Waypoint
            fireOnRapidScroll
            onEnter={() => {
              setIsFabShown(false);
            }}
            onLeave={() => {
              setIsFabShown(true);
            }}
          >
            <Grid
              className={classes.header}
              component="header"
              container
              item
              spacing={2}
            >
              {renderedTotals.map(({ id, title, ...data }) => (
                <Grid item key={id} xs={12} sm={5} lg={3}>
                  <Paper className={classes.headerCard} elevation={2}>
                    <CountCard
                      title={
                        <Typography className={classes.headerCountTitle}>
                          {title}
                        </Typography>
                      }
                      {...data}
                    />
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Waypoint>

          {/* Overview */}
          <Grid component="section" item xs={12}>
            <DashboardHeader>Overview</DashboardHeader>
            <Paper>
              <div className={classes.historyChartContainer}>
                <Typography className={classes.historyChartTitle}>
                  Total Cases Over Time
                </Typography>
                <HistoryChart
                  endDate={dateFilters.endDateFilter}
                  height={500}
                  history={history}
                  startDate={dateFilters.startDateFilter}
                />
              </div>
              <HistoryChartFilters {...dateFilters} />

              {/* Country overview table */}
              <DataTable
                bodyRows={countryTableBodyRows}
                headCells={countryTableHeadCells}
                elevation={0}
                initialOrder="desc"
                initialOrderBy="active"
              />
            </Paper>
          </Grid>

          {/* USA Overview */}
          <Grid component="section" container item spacing={2} xs={12}>
            <Grid item xs={12}>
              <DashboardHeader>USA Breakdown By State</DashboardHeader>
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

          <Grid component="section" item xs={12}>
            <DashboardHeader>News Feed</DashboardHeader>
            <News />
          </Grid>
        </Grid>
      </Container>

      <Zoom in={isFabShown}>
        <Fab
          aria-label="scroll back to top"
          className={classes.fab}
          onClick={_scrollToTop}
        >
          <KeyboardArrowUpIcon />
        </Fab>
      </Zoom>
    </article>
  );
}

function DashboardHeader({ children }) {
  const classes = useDashboardStyles();

  return (
    <>
      <Typography className={classes.sectionHeader} component="h2" variant="h5">
        {children}
      </Typography>
      <Divider className={classes.divider} />
    </>
  );
}
