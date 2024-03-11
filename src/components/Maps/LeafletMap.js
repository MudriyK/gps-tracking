import React, { useMemo, useEffect, useState, useCallback } from 'react';
import { MapContainer, TileLayer, Marker, Polyline, Popup, useMap } from 'react-leaflet';
import Leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';

import { MAP_DEFAULT_ZOOM } from "../../constants";

delete Leaflet.Icon.Default.prototype._getIconUrl;

Leaflet.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const MapUtils = ({ positions, setTotalDistance }) => {
  const map = useMap();
  const [isMapLoaded, setIsMapLoaded] = useState(false);

  useEffect(() => {
    map.whenReady(() => {
      console.log('Map has loaded');

      setIsMapLoaded(true);
      // Perform any action after the map is loaded
    });
  }, [map]);

  const calculateRouteDistance = useCallback(
    (positions) => {
      let totalDistance = 0;

      for (let i = 0; i < positions.length - 1; i++) {
        // Calculate distance between consecutive points
        const distance = Leaflet.latLng(positions[i]).distanceTo(positions[i + 1]);

        totalDistance += distance;
      }

      setTotalDistance(totalDistance);
    },
    [setTotalDistance]
  );

  useEffect(() => {
    if (isMapLoaded && positions.length > 1) {
      map.flyTo(positions[positions.length - 1], map.getZoom(), {
        animate: true,
        duration: 0.5
      });

      calculateRouteDistance(positions);
    }
  }, [isMapLoaded, positions, calculateRouteDistance, map]);

  return null;
};

const LeafletMap = ({ data, isGPSActive, setTotalDistance }) => {
  const positions = useMemo(
    () =>
      data.map(({ coords }) => [coords.latitude, coords.longitude]),
    [data]
  );

  return (
    <MapContainer
      className="w-full p-5"
      center={positions[0]}
      zoom={MAP_DEFAULT_ZOOM}
      style={{ height: '400px', width: '100%' }}
    >
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        attribution='&copy; <a href="https://carto.com/attributions">CARTO</a> contributors'
      />

      {positions[0] && (
        <Marker position={positions[0]}>
          <Popup>
            {"Starting point"}
          </Popup>
        </Marker>
      )}

      {(!isGPSActive && positions.length > 1) && (
        <Marker position={positions[positions.length - 1]}>
          <Popup>
            {"Finish point"}
          </Popup>
        </Marker>
      )}

      <Polyline pathOptions={{ color: '#FF0000' }} positions={positions} />

      <MapUtils
        setTotalDistance={setTotalDistance}
        positions={positions}
      />
    </MapContainer>
  );
};

export { LeafletMap };
