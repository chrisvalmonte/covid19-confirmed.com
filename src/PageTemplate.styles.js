import { makeStyles } from '@material-ui/core/styles';
import blueGrey from '@material-ui/core/colors/blueGrey';
import grey from '@material-ui/core/colors/grey';

const appBarHeight = '60px';
const drawerBgColor = grey[900];
const drawerWidth = '240px';
const linkColor = grey[100];
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

  link: {
    color: linkColor,
    display: 'block',
    textDecoration: 'none',
    '&:focus': {
      textDecoration: 'none',
    },
    '&:hover': {
      textDecoration: 'none',
    },
  },

  linkActive: {
    backgroundColor: blueGrey[900],
  },

  linkIcon: {
    color: linkColor,
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

  totals: {
    [theme.breakpoints.up('md')]: {
      marginBottom: '32px',
    },
  },
}));
