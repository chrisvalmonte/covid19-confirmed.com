import React, { useEffect, useRef, useState } from 'react';
import MapGL, { Layer, Source } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import green from '@material-ui/core/colors/green';
import grey from '@material-ui/core/colors/grey';
import red from '@material-ui/core/colors/red';
import yellow from '@material-ui/core/colors/yellow';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

import { getGEOData } from './services';

const useMapStyles = makeStyles(theme => ({
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
  },
  clusterTypeButtonDeaths: {
    color: yellow[500],

    '&.Mui-disabled': {
      backgroundColor: yellow[500],
      borderColor: yellow[500],
    },
  },
  clusterTypeButtonRecovered: {
    color: green[400],

    '&.Mui-disabled': {
      backgroundColor: green[400],
      borderColor: green[400],
    },
  },
}));

export default function Map() {
  const classes = useMapStyles();

  const [viewport, setViewport] = useState({
    latitude: 40.67,
    longitude: -103.59,
    zoom: 1.5,
    bearing: 0,
    pitch: 0,
  });
  const [clusterData, setClusterData] = useState(null);
  const [currentCluster, setCurrentCluster] = useState('active');
  const [currentClusterColor, setCurrentClusterColor] = useState(red[500]);
  const sourceRef = useRef();

  // Get GEO data when component mounts
  useEffect(() => {
    const _geoData = async () => {
      const { data } = await getGEOData();
      const features = data.map(
        ({
          city,
          coordinates: { latitude, longitude },
          country,
          province,
          stats: { confirmed, deaths, recovered },
        }) => {
          const cases = parseInt(confirmed);
          const numDeaths = parseInt(deaths);
          const numRecovered = parseInt(recovered);

          return {
            geometry: {
              coordinates: [longitude, latitude],
              type: 'Point',
            },
            properties: {
              active: cases - numDeaths - numRecovered,
              cases,
              city,
              country,
              deaths: numDeaths,
              recovered: numRecovered,
              state: province,
            },
            type: 'Feature',
          };
        },
      );

      setClusterData({
        features,
        type: 'FeatureCollection',
      });
    };

    _geoData();
  }, []);

  const _onViewportChange = updatedViewport => setViewport(updatedViewport);

  const _onClick = event => {
    if (!(event.hasOwnProperty('features') && event.features[0])) return;

    const feature = event.features[0];
    const clusterId = feature.properties.cluster_id;

    const mapboxSource = sourceRef.current.getSource();

    mapboxSource.getClusterExpansionZoom(clusterId, (err, zoom) => {
      if (err) return;

      _onViewportChange({
        latitude: feature.geometry.coordinates[1],
        longitude: feature.geometry.coordinates[0],
        transitionDuration: 500,
        viewport,
        zoom,
      });
    });
  };

  const _onClusterTypeBtnClick = type => {
    let clusterColor;

    switch (type) {
      default:
      case 'active':
        clusterColor = red[500];
        break;

      case 'deaths':
        clusterColor = yellow[500];
        break;

      case 'recovered':
        clusterColor = green[400];
        break;
    }

    setCurrentCluster(type);
    setCurrentClusterColor(clusterColor);
  };

  const clusterLayer = {
    filter: ['all', ['has', currentCluster], ['>', currentCluster, 0]],
    id: 'cluster-circle',
    paint: {
      'circle-color': currentClusterColor,
      'circle-opacity': 0.3,
      'circle-radius': ['step', ['get', currentCluster], 2.5, 50, 15, 375, 20],
    },
    source: 'cluster-circle',
    type: 'circle',
  };

  const clusterTypeButtons = [
    {
      className: clsx(
        classes.clusterTypeButton,
        currentCluster === 'active' && classes.clusterTypeButtonEnabled,
        classes.clusterTypeButtonActive,
      ),
      isDisabled: currentCluster === 'active',
      text: 'Active Cases',
      type: 'active',
    },
    {
      className: clsx(
        classes.clusterTypeButton,
        currentCluster === 'deaths' && classes.clusterTypeButtonEnabled,
        classes.clusterTypeButtonDeaths,
      ),
      isDisabled: currentCluster === 'deaths',
      text: 'Deaths',
      type: 'deaths',
    },
    {
      className: clsx(
        classes.clusterTypeButton,
        currentCluster === 'recovered' && classes.clusterTypeButtonEnabled,
        classes.clusterTypeButtonRecovered,
      ),
      isDisabled: currentCluster === 'recovered',
      text: 'Recovered',
      type: 'recovered',
    },
  ];

  return (
    <>
      <MapGL
        {...viewport}
        dragRotate={false}
        height="100%"
        interactiveLayerIds={[clusterLayer.id]}
        mapStyle="mapbox://styles/mapbox/dark-v9"
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_GL_API_TOKEN}
        onClick={_onClick}
        onViewportChange={_onViewportChange}
        width="100%"
      >
        <Source data={clusterData} ref={sourceRef} type="geojson">
          <Layer {...clusterLayer} />
        </Source>
      </MapGL>

      <ButtonGroup
        aria-label="button group to display active cases, deaths, recovered, or total cases on the map"
        className={classes.clusterTypeButtonGroup}
        size="small"
      >
        {clusterTypeButtons.map(({ className, isDisabled, text, type }) => (
          <Button
            className={className}
            disabled={isDisabled}
            key={type}
            onClick={() => {
              _onClusterTypeBtnClick(type);
            }}
          >
            {text}
          </Button>
        ))}
      </ButtonGroup>
    </>
  );
}
