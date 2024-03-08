//eslint-disable-next-line no-restricted-globals
self.onmessage = (e) => {
  switch (e.data.action) {
    case "getTotalDistance": {
      const { map, routeData } = e.data;

      let totalDistance = 0;
      if (routeData.length < 2) return totalDistance; // Need at least two points to calculate distance

      const latLngs = routeData.map(({ lat, lng }) => new map.LatLng(lat, lng));

      for (let i = 0; i < latLngs.length - 1; i++) {
        // Calculate distance between consecutive points
        const distance = map.geometry.spherical.computeDistanceBetween(
          latLngs[i],
          latLngs[i + 1]
        );

        totalDistance += distance;
      }

      //eslint-disable-next-line no-restricted-globals
      return self.postMessage({
        action: "computedTotalDistance",
        value: totalDistance,
      });
    }
    case "renderRoute": {
      const { map, polyline, path } = e.data;

      if (!map) return;

      if (polyline) {
        polyline.setMap(null);
      }

      const routePath = new map.Polyline({
        path,
        geodesic: true,
        strokeColor: "#FF0000",
        strokeOpacity: 1.0,
        strokeWeight: 2,
      });

      routePath.setMap(map);

      return;
    }
    case "renderMarker": {
      const { map, waypoint } = e.data;

      const marker = new map.Marker({
        position: { lat: waypoint.lat, lng: waypoint.lng },
        map,
      });

      const infoWindow = new map.InfoWindow({
        content: waypoint.content,
      });

      marker.addListener("click", () => {
        infoWindow.open({
          anchor: marker,
          map,
          shouldFocus: false,
        });
      });

      return;
    }
    default: {
      return null;
    }
  }
};
