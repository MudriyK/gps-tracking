import { useRef, useState, useMemo, useEffect, useCallback } from "react";
import GoogleMapReact from "google-map-react";
import { GOOGLE_MAP_BOOTSTRAP_OPTIONS, MAP_DEFAULT_ZOOM } from "../constants";

const GoogleMap = ({ data, isGPSActive, setTotalDistance }) => {
  const mapRef = useRef();
  const mapsRef = useRef();
  const polylineRef = useRef();
  const [isGoogleApiLoaded, setIsGoogleApiLoaded] = useState(false);

  const onGoogleApiLoaded = ({ map, maps }) => {
    mapRef.current = map;
    mapsRef.current = maps;

    setIsGoogleApiLoaded(true);
  };

  const routeData = useMemo(
    () =>
      data.map(({ coords }, index) => {
        return {
          lat: coords.latitude,
          lng: coords.longitude,
          speed: coords.speed,
          isStart: index === 0,
          isFinish: data.length - 1 === index && index !== 0,
        };
      }),
    [data]
  );

  const renderRoute = (path) => {
    if (!mapRef.current || !mapsRef.current) return;

    if (polylineRef.current) {
      polylineRef.current.setMap(null);
    }

    const routePath = new mapsRef.current.Polyline({
      path,
      geodesic: true,
      strokeColor: "#FF0000",
      strokeOpacity: 1.0,
      strokeWeight: 2,
    });

    routePath.setMap(mapRef.current);
  };

  const renderMarker = (waypoint) => {
    const marker = new mapsRef.current.Marker({
      position: { lat: waypoint.lat, lng: waypoint.lng },
      map: mapRef.current,
    });

    const infoWindow = new mapsRef.current.InfoWindow({
      content: waypoint.content,
    });

    marker.addListener("click", () => {
      infoWindow.open({
        anchor: marker,
        map: mapRef.current,
        shouldFocus: false,
      });
    });
  };

  const calculateRouteDistance = useCallback(
    (data) => {
      let totalDistance = 0;
      if (data.length < 2) return totalDistance; // Need at least two points to calculate distance

      const latLngs = data.map(
        ({ lat, lng }) => new mapsRef.current.LatLng(lat, lng)
      );

      for (let i = 0; i < latLngs.length - 1; i++) {
        // Calculate distance between consecutive points
        const distance =
          mapsRef.current.geometry.spherical.computeDistanceBetween(
            latLngs[i],
            latLngs[i + 1]
          );

        totalDistance += distance;
      }

      setTotalDistance(totalDistance); // Distance in meters
    },
    [setTotalDistance]
  );

  useEffect(() => {
    if (isGoogleApiLoaded) {
      renderRoute(routeData);
    }
  }, [isGoogleApiLoaded, routeData]);

  useEffect(() => {
    if (!isGoogleApiLoaded) {
      return;
    }

    if (routeData.length === 1) {
      const startWaypoint = routeData[0];

      renderMarker({
        ...startWaypoint,
        content: "Start",
      });
    }

    if (!isGPSActive && routeData.length > 1) {
      const finishWaypoint = routeData[routeData.length - 1];

      renderMarker({
        ...finishWaypoint,
        content: "Finish",
      });

      calculateRouteDistance(routeData);
    }
  }, [isGoogleApiLoaded, isGPSActive, routeData, calculateRouteDistance]);

  return (
    <div className="w-full p-5" style={{ height: "400px" }}>
      <GoogleMapReact
        bootstrapURLKeys={GOOGLE_MAP_BOOTSTRAP_OPTIONS}
        defaultCenter={routeData[0] || { lat: 0, lng: 0 }}
        defaultZoom={MAP_DEFAULT_ZOOM}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={onGoogleApiLoaded}
      />
    </div>
  );
};

export { GoogleMap };
