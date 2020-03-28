import React, { useEffect, useRef, useState } from 'react';
import MapGL, { Layer, Source } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

import { getGEOData } from './services';

export function Map() {
  const [viewport, setViewport] = useState({
    latitude: 40.67,
    longitude: -103.59,
    zoom: 1.5,
    bearing: 0,
    pitch: 0,
  });
  const [clusterData, setClusterData] = useState(null);
  const sourceRef = useRef();

  // Get GEO data when component mounts
  useEffect(() => {
    const _geoData = async () => {
      const { data } = await getGEOData();
      const features = data.map(
        ({
          city,
          coordinates: { latitude, longitude },
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
              active: cases - deaths - recovered,
              cases,
              city,
              country: 'USA',
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

  const clusterLayer = {
    filter: ['all', ['has', 'active'], ['>', 'active', 0]],
    id: 'cluster-circle',
    paint: {
      'circle-color': '#f44336',
      'circle-opacity': 0.2,
      'circle-radius': ['step', ['get', 'active'], 2.5, 50, 15, 375, 20],
    },
    source: 'cluster-circle',
    type: 'circle',
  };

  return (
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
  );
}
