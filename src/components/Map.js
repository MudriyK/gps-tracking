import { useRef, useState, useMemo, useEffect } from "react";
import GoogleMapReact from "google-map-react";
import { GOOGLE_API_KEY, MAP_DEFAULT_ZOOM } from "../constants";

const GoogleMap = ({ data, isGPSActive }) => {
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
      content: waypoint.content
    });

    marker.addListener("click", () => {
      infoWindow.open({
        anchor: marker,
        map: mapRef.current,
        shouldFocus: false,
      });
    });
  };

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
        content: 'Start'
      });
    }

    if (!isGPSActive && routeData.length > 1) {
      const finishWaypoint = routeData[routeData.length - 1];

      renderMarker({
        ...finishWaypoint,
        content: 'Finish'
      });
    }
  }, [isGoogleApiLoaded, isGPSActive, routeData]);

  return (
    <GoogleMapReact
      bootstrapURLKeys={{ key: GOOGLE_API_KEY }}
      defaultCenter={routeData[0] || { lat: 0, lng: 0 }}
      defaultZoom={MAP_DEFAULT_ZOOM}
      yesIWantToUseGoogleMapApiInternals
      onGoogleApiLoaded={onGoogleApiLoaded}
    />
  );
};

export { GoogleMap };
