import { makeStyles } from '@material-ui/core/styles';
import blueGrey from '@material-ui/core/colors/blueGrey';
import grey from '@material-ui/core/colors/grey';

const appBarHeight = '60px';
const drawerBgColor = grey[900];
const drawerWidth = '240px';
const logoHeight = '24px';

export const usePageTemplateStyles = makeStyles(theme => ({
  appBar: {
    backgroundColor: blueGrey[900],
    bottom: 0,
    display: 'flex',
    justifyContent: 'center',
    minHeight: appBarHeight,
    position: 'fixed',
    top: 'auto',
    zIndex: theme.zIndex.drawer + 1,
  },

  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'hidden',
  },

  countTitle: {
    color: grey[200],
    fontSize: '14px',
    marginBottom: '-2px',
  },

  drawer: {
    backgroundColor: drawerBgColor,
    [theme.breakpoints.down('sm')]: {
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
    },
    [theme.breakpoints.up('md')]: {
      flexShrink: 0,
      width: drawerWidth,
    },
  },

  drawerLogo: {
    height: logoHeight,
    margin: '32px 0',
  },

  drawerPaper: {
    backgroundColor: drawerBgColor,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    whiteSpace: 'nowrap',
    width: drawerWidth,
  },

  lastUpdated: {
    color: grey[100],
    fontSize: '12px',
    marginTop: '24px',
    paddingBottom: '16px',
    paddingLeft: '16px',
  },

  menuButton: {
    marginRight: '36px',
  },

  menuButtonHidden: {
    display: 'none',
  },

  root: {
    display: 'flex',
  },

  toolbar: {
    paddingRight: 24, // Keep right padding when drawer closed
  },

  toolbarLogo: {
    height: logoHeight,
    marginLeft: 'auto',
  },

  totals: {
    [theme.breakpoints.up('md')]: {
      transform: 'translateX(0)',
      transitionDuration: theme.transitions.duration.standard,
      transitionProperty: 'height, margin, transform, opacity',
      transitionTimingFunction: theme.transitions.easing.easeInOut,
      height: 'auto',
      marginBottom: '32px',
      opacity: 1,
      paddingLeft: '12px',
    },
  },

  totalsHide: {
    [theme.breakpoints.up('md')]: {
      height: 0,
      marginBottom: 0,
      opacity: 0,
      transform: 'translateX(-50px)',
      transitionProperty: 'height, transform',
    },
  },
}));
