import green from '@material-ui/core/colors/green';
import grey from '@material-ui/core/colors/grey';
import red from '@material-ui/core/colors/red';
import yellow from '@material-ui/core/colors/yellow';
import { makeStyles } from '@material-ui/core/styles';

const clusterTypeBtnColors = color => ({
  color,
  '&.Mui-disabled': {
    backgroundColor: color,
    borderColor: color,
  },
  '&.MuiButton-root:hover': {
    backgroundColor: color,
    borderColor: color,
    color: grey[900],
  },
});

export const useMapStyles = makeStyles(theme => ({
  clusterList: {
    color: grey[50],
    height: '60vh',
  },
  clusterListHeader: {
    fontWeight: 'bold',
    marginBottom: 0,
    marginTop: '32px',
  },
  clusterListSubHeader: {
    marginBottom: '32px',
  },
  clusterListHeaderActive: {
    color: red[500],
  },
  clusterListHeaderDeaths: {
    color: yellow[500],
  },
  clusterListHeaderRecovered: {
    color: green[400],
  },
  clusterListItem: {
    display: 'flex',
    fontSize: '16px',
    justifyContent: 'space-between',
    padding: '16px',
  },
  clusterListItemName: {
    maxWidth: '75%',
  },
  clusterListSwipeableDrawer: {
    backgroundColor: grey[900],
  },
  clusterListSwipeableDrawerContainer: {
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },

  clusterTypeButtonGroup: {
    boxShadow: theme.shadows[6],
    position: 'fixed',
    left: '50%',
    transform: 'translateX(-50%)',
    top: '32px',
    width: 'fit-content',
    zIndex: theme.zIndex.drawer + 101, // Show over backdrop from clusterList

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
  clusterTypeButtonShowList: {
    '&.MuiButton-root:hover': {
      backgroundColor: '#191a1a',
    },
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  clusterTypeButtonActive: {
    ...clusterTypeBtnColors(red[500]),

    [theme.breakpoints.up('sm')]: {
      '&.MuiButtonGroup-groupedHorizontal:not(:first-child)': {
        borderBottomLeftRadius: theme.shape.borderRadius,
        borderTopLeftRadius: theme.shape.borderRadius,
      },
    },
  },
  clusterTypeButtonDeaths: {
    ...clusterTypeBtnColors(yellow[500]),
  },
  clusterTypeButtonRecovered: {
    ...clusterTypeBtnColors(green[400]),
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
