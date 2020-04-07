import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import moment from 'moment';
// import numeral from 'numeral';
import Container from '@material-ui/core/Container';
import Divider from '@material-ui/core/Divider';
import Fab from '@material-ui/core/Fab';
import Grid from '@material-ui/core/Grid';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import Paper from '@material-ui/core/Paper';
import RootRef from '@material-ui/core/RootRef';
import Typography from '@material-ui/core/Typography';
import Zoom from '@material-ui/core/Zoom';
import amber from '@material-ui/core/colors/amber';
import green from '@material-ui/core/colors/green';
import grey from '@material-ui/core/colors/grey';
import red from '@material-ui/core/colors/red';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import yellow from '@material-ui/core/colors/yellow';
// import CountUp from 'react-countup';
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

Dashboard.propTypes = {
  totals: PropTypes.shape({
    active: PropTypes.number,
    affectedCountries: PropTypes.number,
    cases: PropTypes.number,
    deaths: PropTypes.number,
    prevActive: PropTypes.number,
    prevCases: PropTypes.number,
    prevDeaths: PropTypes.number,
    prevRecovered: PropTypes.number,
    recovered: PropTypes.number,
    tests: PropTypes.number,
  }).isRequired,
};

export default function Dashboard({ totals }) {
  const classes = useDashboardStyles();
  const dateFilters = useHistoryChartFilters();

  const isXSBreakpoint = useMediaQuery('(max-width: 600px)');

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
      let countryTableData = data;

      // API keeps changing. Filter out first if it is World.
      // eslint-disable-next-line
      const [worldData, ...countryData] = data;
      if (worldData.country === 'World') countryTableData = countryData;

      const countryBodyRows = countryTableData.map(
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
      setCountryTableBodyRows(countryBodyRows);
    };

    const _historyData = async () => {
      const {
        data: { cases },
      } = await getHistory();

      setHistory(cases);

      const firstDate = moment(Object.keys(cases)[0]);
      dateFilters.setMinDate(firstDate);
      dateFilters.setStartDateFilter(firstDate);
    };

    const _usStateData = async () => {
      const { data } = await getUSStates();
      let stateTableData = data;

      // API keeps changing. Filter out first if it is USA.
      // eslint-disable-next-line
      const [USData, ...stateData] = data;
      if (USData.state === 'USA') stateTableData = stateData;

      const USATableData = stateTableData.map(
        ({ active, cases, deaths, state }) => ({
          id: state,
          state,
          active,
          deaths,
          cases,
        }),
      );
      setUSATableBodyRows(USATableData);

      // Top 10 Red Zones in USA
      const USAPieData = _.orderBy(stateTableData, ['cases'], ['desc'])
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
    { id: 'state', label: 'State/Territory' },
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
          {/* Header */}
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
          <Grid component="section" container item xs={12}>
            <Grid item xs={12}>
              <DashboardHeading>Overview</DashboardHeading>
            </Grid>

            <Grid item xs={12}>
              <Paper>
                <div className={classes.historyChartContainer}>
                  <Typography className={classes.historyChartTitle}>
                    Total Cases Over Time
                  </Typography>
                  <HistoryChart
                    endDate={dateFilters.endDateFilter}
                    height={isXSBreakpoint ? 250 : 500}
                    history={history}
                    startDate={dateFilters.startDateFilter}
                  />
                </div>
                <HistoryChartFilters {...dateFilters} />
                {/* 
                TODO: Add back once I figure out a better information architecture
                <Grid className={classes.numbersGrid} container xs={12}>
                  <Grid className={classes.numberContainer} item xs={6} md={4}>
                    <DashboardNumber caption="Countries affected">
                      {totals.affectedCountries}
                    </DashboardNumber>
                  </Grid>

                  <Grid className={classes.numberContainer} item xs={6} md={4}>
                    <DashboardNumber
                      caption="Mortality rate"
                      decimals={2}
                      formattingFn={number => `${number}%`}
                    >
                      {(totals.deaths / totals.cases) * 100}
                    </DashboardNumber>
                  </Grid>

                  <Grid className={classes.numberContainer} item xs={12} md={4}>
                    <DashboardNumber
                      caption="Tests administered"
                      decimals={2}
                      formattingFn={number => numeral(number).format('0,0')}
                    >
                      {totals.tests}
                    </DashboardNumber>
                  </Grid>
                </Grid> */}

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
          </Grid>

          {/* USA Overview */}
          <Grid component="section" container item xs={12}>
            <Grid item xs={12}>
              <DashboardHeading>USA Breakdown</DashboardHeading>
            </Grid>

            {/* USA overview pie chart */}
            <Grid container item xs={12} lg={7}>
              <Grid item xs={12}>
                <Typography
                  align="center"
                  className={classes.pieTitle}
                  component="h3"
                  variant="h6"
                >
                  Top 10 Red Zones
                </Typography>
              </Grid>

              <Grid className={classes.pieContainer} container item xs={12}>
                <RootRef rootRef={USAPieLegendRef}>
                  <DiscreteColorLegend
                    className={classes.pieLegend}
                    colors={USAPieColorRange}
                    items={USAPieChartData.map(d => d.label)}
                    orientation={isXSBreakpoint ? 'horizontal' : 'vertical'}
                    width={200}
                  />
                </RootRef>

                <PieChart
                  className={classes.pie}
                  data={USAPieChartData}
                  diameter={
                    !isXSBreakpoint && USAPieLegendRef.current
                      ? USAPieLegendRef.current.offsetHeight
                      : 300
                  }
                  valueType="Total Cases"
                />
              </Grid>
            </Grid>

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

          {/* News Feed */}
          <Grid component="section" item xs={12}>
            <DashboardHeading>News Feed</DashboardHeading>
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

function DashboardHeading({ children }) {
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

// function DashboardNumber({
//   caption,
//   children: number,
//   decimals = 0,
//   formattingFn = undefined,
// }) {
//   const classes = useDashboardStyles();

//   const [counterEnd, setCounterEnd] = useState(0);
//   const [didCount, setDidCount] = useState(false);

//   // Update count if number changes and count animation was already seen
//   useEffect(() => {
//     if (didCount && counterEnd !== number) setCounterEnd(number);
//   }, [number]); // eslint-disable-line

//   const _startCounter = () => {
//     if (didCount) return;

//     setCounterEnd(number);
//     setDidCount(true);
//   };

//   return (
//     <>
//       <Waypoint onEnter={_startCounter} />
//       <Typography align="center" component="h3" variant="h4">
//         <CountUp
//           decimals={decimals}
//           end={counterEnd}
//           formattingFn={formattingFn}
//           start={0}
//         />
//       </Typography>
//       <Typography align="center" component="p" variant="body1">
//         {caption}
//       </Typography>
//     </>
//   );
// }
