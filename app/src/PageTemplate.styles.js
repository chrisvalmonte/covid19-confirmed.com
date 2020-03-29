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
    display: 'flex',
    justifyContent: 'center',
    minHeight: appBarHeight,
    transition: theme.transitions.create(['width', 'margin'], {
      duration: theme.transitions.duration.leavingScreen,
      easing: theme.transitions.easing.sharp,
    }),
    zIndex: theme.zIndex.drawer + 1,
  },

  appBarShift: {
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['width', 'margin'], {
      duration: theme.transitions.duration.enteringScreen,
      easing: theme.transitions.easing.sharp,
    }),
    width: `calc(100% - ${drawerWidth})`,
  },

  appBarSpacer: {
    [theme.breakpoints.down('sm')]: {
      height: appBarHeight,
    },
  },

  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'hidden',
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
    margin: '16px 0',
  },

  drawerPaper: {
    backgroundColor: drawerBgColor,
    position: 'relative',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    whiteSpace: 'nowrap',
    width: drawerWidth,
    [theme.breakpoints.up('md')]: {
      backgroundColor: 'transparent',
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
    },
  },

  lastUpdated: {
    color: grey[100],
    fontSize: '12px',
    marginTop: '24px',
    paddingBottom: '16px',
    paddingLeft: '16px',
  },

  link: {
    color: grey[100],
    textDecoration: 'none',
  },

  links: {
    marginBottom: 'auto',
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
}));
