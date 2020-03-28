import { makeStyles } from '@material-ui/core/styles';
import grey from '@material-ui/core/colors/grey';

const appBarHeight = '60px';
const drawerBgColor = grey[900];
const drawerWidth = '240px';

export const usePageTemplateStyles = makeStyles(theme => ({
  appBar: {
    backgroundColor: grey[900],
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

  appBarSpacer: theme.mixins.toolbar,

  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'hidden',
  },

  drawer: {
    backgroundColor: drawerBgColor,
    [theme.breakpoints.up('md')]: {
      flexShrink: 0,
      paddingTop: appBarHeight,
      width: drawerWidth,
    },
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
    },
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

  title: {
    flexGrow: 1,
  },

  toolbar: {
    paddingRight: 24, // Keep right padding when drawer closed
  },

  toolbarIcon: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
}));
