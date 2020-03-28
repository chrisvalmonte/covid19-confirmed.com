import React, { useEffect, useRef, useState } from 'react';
import MapGL, { Layer, Source } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

import { getCountryData } from './services';
import { clusterCountLayer, clusterLayer } from './Map.constants';

export function Map() {
  const [viewport, setViewport] = useState({
    latitude: 40.67,
    longitude: -103.59,
    zoom: 1,
    bearing: 0,
    pitch: 0,
  });
  const [clusterData, setClusterData] = useState(null);
  const sourceRef = useRef();

  // Get GEO data when component mounts
  useEffect(() => {
    const _geoData = async () => {
      const { data } = await getCountryData();
      const updatedData = {
        features: data.map(
          ({
            cases,
            country,
            countryInfo: { lat, long },
            deaths,
            recovered,
            todayCases,
            todayDeaths,
          }) => ({
            geometry: {
              coordinates: [long, lat],
              type: 'Point',
            },
            properties: {
              cases,
              country,
              deaths,
              recovered,
              todayCases,
              todayDeaths,
            },
            type: 'Feature',
          }),
        ),
        type: 'FeatureCollection',
      };

      setClusterData(updatedData);
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
      <Source
        cluster={true}
        clusterMaxZoom={14}
        clusterRadius={50}
        data={clusterData}
        ref={sourceRef}
        type="geojson"
      >
        <Layer {...clusterLayer} />
        <Layer {...clusterCountLayer} />
      </Source>
    </MapGL>
  );
}
