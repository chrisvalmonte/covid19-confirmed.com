import green from '@material-ui/core/colors/green';
import grey from '@material-ui/core/colors/grey';
import red from '@material-ui/core/colors/red';
import yellow from '@material-ui/core/colors/yellow';
import { makeStyles } from '@material-ui/core/styles';

export const useMapStyles = makeStyles(theme => ({
  clusterTypeButtonGroup: {
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
    '&:hover': {
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
    '&:hover': {
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
    '&:hover': {
      backgroundColor: green[400],
      borderColor: green[400],
      color: grey[900],
    },
  },
}));
