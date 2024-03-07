const GOOGLE_API_KEY = "AIzaSyBjZiK7hyPugpdsy8smXoTgUS-LbCIpLxc";

const MAP_DEFAULT_ZOOM = 16;

const MOCKED_GPS_DATA = [
  { coords: { latitude: 48.6415658, longitude: 22.28756 } },
  { coords: { latitude: 48.641, longitude: 22.288062 } },
  { coords: { latitude: 48.64058215369482, longitude: 22.286881880368163 } },
  { coords: { latitude: 48.640798, longitude: 22.285227 } },
  { coords: { latitude: 48.640104974973376, longitude: 22.284553493298773 } },
  { coords: { latitude: 48.639747, longitude: 22.283871 } },
  { coords: { latitude: 48.638811, longitude: 22.284282 } },
  { coords: { latitude: 48.638667, longitude: 22.284454 } },
  { coords: { latitude: 48.640655, longitude: 22.281838 } },
  { coords: { latitude: 48.641246, longitude: 22.283178 } },
  { coords: { latitude: 48.641342, longitude: 22.284898 } },
  { coords: { latitude: 48.641785, longitude: 22.285238 } },
  { coords: { latitude: 48.641634, longitude: 22.286743 } },
  { coords: { latitude: 48.641833, longitude: 22.287064 } },
  { coords: { latitude: 48.6415658, longitude: 22.28756 } },
];

const GEO_LOCATION_OPTIONS = {
  maximumAge: 5000, // Accept a cached position whose age is no greater than the specified time in milliseconds
  timeout: 5000, // The maximum length of time (in milliseconds) the device is allowed to take in order to return a position
  enableHighAccuracy: true, // Provides a hint that the application needs the best possible results
};

export { GOOGLE_API_KEY, MAP_DEFAULT_ZOOM, MOCKED_GPS_DATA, GEO_LOCATION_OPTIONS };
