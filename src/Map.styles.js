import green from '@material-ui/core/colors/green';
import grey from '@material-ui/core/colors/grey';
import red from '@material-ui/core/colors/red';
import yellow from '@material-ui/core/colors/yellow';
import { makeStyles } from '@material-ui/core/styles';

export const useMapStyles = makeStyles(theme => ({
  clusterTypeButtonGroup: {
    boxShadow: theme.shadows[6],
    position: 'fixed',
    left: '50%',
    transform: 'translateX(-50%)',
    top: '32px',
    width: 'fit-content',

    [theme.breakpoints.up('sm')]: {
      left: 'unset',
      right: '32px',
      transform: 'none',
    },
  },

  clusterTypeButton: {
    backgroundColor: '#191a1a',
    color: grey[50],
  },
  clusterTypeButtonEnabled: {
    '&.Mui-disabled': {
      color: grey[900],
    },
  },
  clusterTypeButtonActive: {
    color: red[500],
    '&.Mui-disabled': {
      backgroundColor: red[500],
      borderColor: red[500],
    },
    '&.MuiButton-root:hover': {
      backgroundColor: red[500],
      borderColor: red[500],
      color: grey[900],
    },
  },
  clusterTypeButtonDeaths: {
    color: yellow[500],
    '&.Mui-disabled': {
      backgroundColor: yellow[500],
      borderColor: yellow[500],
    },
    '&.MuiButton-root:hover': {
      backgroundColor: yellow[500],
      borderColor: yellow[500],
      color: grey[900],
    },
  },
  clusterTypeButtonRecovered: {
    color: green[400],
    '&.Mui-disabled': {
      backgroundColor: green[400],
      borderColor: green[400],
    },
    '&.MuiButton-root:hover': {
      backgroundColor: green[400],
      borderColor: green[400],
      color: grey[900],
    },
  },

  fab: {
    backgroundColor: grey[700],
    color: grey[100],
    bottom: '32px',
    position: 'fixed',
    right: '48px',
    '&:hover': {
      backgroundColor: grey[700],
    },
    [theme.breakpoints.down('sm')]: {
      bottom: '72px',
      right: '16px',
    },
  },

  popupStats: {
    padding: 0,
  },
  popupTitle: {
    margin: '8px 0',
    textAlign: 'center',
  },

  // TODO: Figure out why styles aren't being overridden
  // 'main .mapboxgl-popup-content': {
  //   backgroundColor: 'transparent !important',
  //   padding: '0 !important',
  // },
}));
