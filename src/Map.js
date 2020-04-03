import React, { useEffect, useRef, useState } from 'react';
import numeral from 'numeral';
import MapGL, { Layer, Popup, Source } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import green from '@material-ui/core/colors/green';
import red from '@material-ui/core/colors/red';
import yellow from '@material-ui/core/colors/yellow';
import clsx from 'clsx';

import { getGEOData } from './services';
import { useMapStyles } from './Map.styles';

export default function Map() {
  const classes = useMapStyles();

  const [viewport, setViewport] = useState({
    latitude: 29.5,
    longitude: -37.5,
    zoom: 0,
    bearing: 0,
    pitch: 0,
  });
  const [clusterData, setClusterData] = useState(null);
  const [currentCluster, setCurrentCluster] = useState('active');
  const [currentClusterColor, setCurrentClusterColor] = useState(red[500]);

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupData, setPopupData] = useState({});

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

    const clickedPoint = event.features[0];

    const {
      properties: { active, city, country, deaths, recovered, state },
    } = clickedPoint;
    const isCityPresent = city !== 'null';
    const isStatePresent = state !== 'null';
    const isCountryPresent = country !== 'null';

    console.log(clickedPoint.properties);

    let locationName = '';
    if (isCityPresent && isStatePresent && isCountryPresent)
      locationName = `${city}, ${state}, ${country}`;
    else if (isStatePresent && isCountryPresent)
      locationName = `${state}, ${country}`;
    else if (isCityPresent && isCountryPresent)
      locationName = `${city}, ${country}`;
    else if (isCityPresent && isStatePresent)
      locationName = `${city}, ${state}`;
    else locationName = country;

    setPopupData({
      latitude: clickedPoint.geometry.coordinates[1],
      longitude: clickedPoint.geometry.coordinates[0],
      name: locationName,
      stats: {
        active: numeral(active).format('0,0'),
        deaths: numeral(deaths).format('0,0'),
        recovered: numeral(recovered).format('0,0'),
      },
    });
    setIsPopupOpen(true);
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

  let clusterOpacity = 0;
  const { zoom } = viewport;
  if (zoom <= 1) clusterOpacity = 0.075;
  else if (zoom > 1 && zoom <= 2) clusterOpacity = 0.15;
  else if (zoom > 2 && zoom <= 3) clusterOpacity = 0.3;
  else if (zoom > 3 && zoom <= 4) clusterOpacity = 0.5;
  else clusterOpacity = 0.75;

  const clusterLayer = {
    filter: ['all', ['has', currentCluster], ['>', currentCluster, 0]],
    id: 'cluster-circle',
    paint: {
      'circle-color': currentClusterColor,
      'circle-opacity': clusterOpacity,
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
        maxZoom={5}
        onClick={_onClick}
        onViewportChange={_onViewportChange}
        width="100%"
      >
        <Source data={clusterData} ref={sourceRef} type="geojson">
          <Layer {...clusterLayer} />
        </Source>

        {viewport.zoom > 1 && isPopupOpen && (
          <Popup
            anchor="top"
            closeButton={false}
            latitude={popupData.latitude}
            longitude={popupData.longitude}
            offsetTop={10}
            onClose={() => {
              setIsPopupOpen(false);
            }}
            tipSize={6}
          >
            <Typography className={classes.popupTitle} component="h6">
              {popupData.name}
            </Typography>

            <Typography className={classes.popupStat} variant="body2">
              {currentCluster === 'active' && (
                <strong>{`${popupData.stats.active} Active Cases Reported`}</strong>
              )}
              {currentCluster === 'deaths' && (
                <strong>{`${popupData.stats.deaths} Deaths Reported`}</strong>
              )}
              {currentCluster === 'recovered' && (
                <strong>{`${popupData.stats.recovered} Recoveries Reported`}</strong>
              )}
            </Typography>
          </Popup>
        )}
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
