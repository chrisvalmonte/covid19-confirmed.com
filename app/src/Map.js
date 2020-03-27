import React, { useRef, useState } from 'react';
import MapGL, { Layer, Source } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

import {
  clusterCountLayer,
  clusterLayer,
  unclusteredPointLayer,
} from './Map.layers';

export function Map() {
  const [viewport, setViewport] = useState({
    latitude: 40.67,
    longitude: -103.59,
    zoom: 3,
    bearing: 0,
    pitch: 0,
  });

  const settings = {
    dragRotate: false,
  };

  const sourceRef = useRef();

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
      {...settings}
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
        data="https://docs.mapbox.com/mapbox-gl-js/assets/earthquakes.geojson" // TODO: Replace w/ COVID-19 data
        ref={sourceRef}
        type="geojson"
      >
        <Layer {...clusterLayer} />
        <Layer {...clusterCountLayer} />
        <Layer {...unclusteredPointLayer} />
      </Source>
    </MapGL>
  );
}
