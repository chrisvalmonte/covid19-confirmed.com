import grey from '@material-ui/core/colors/grey';
import { makeStyles } from '@material-ui/core/styles';

export const useDashboardStyles = makeStyles(theme => ({
  divider: {
    marginBottom: '16px',
  },

  fab: {
    backgroundColor: grey[900],
    color: grey[100],
    bottom: '32px',
    position: 'fixed',
    right: '48px',
    '&:hover': {
      backgroundColor: grey[900],
    },
    [theme.breakpoints.down('sm')]: {
      bottom: '72px',
      right: '16px',
    },
  },

  header: {
    marginBottom: '48px',
    [theme.breakpoints.up('sm')]: {
      [theme.breakpoints.down('lg')]: {
        justifyContent: 'space-around',
      },
    },
  },

  headerCard: {
    backgroundColor: grey[900],
    padding: '16px 8px',
  },

  headerCountTitle: {
    color: grey[100],
  },

  historyChartContainer: {
    padding: '12px',
  },

  historyChartTitle: {
    paddingBottom: '4px',
    paddingLeft: '36px',
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
    backgroundColor: grey[100],
    flexGrow: 1,
    height: '100vh',
    overflowY: 'auto',
    paddingBottom: '200px',
    paddingTop: '16px',
  },

  sectionHeader: {
    marginBottom: '12px',
  },
}));
