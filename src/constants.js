const GOOGLE_API_KEY = "AIzaSyBjZiK7hyPugpdsy8smXoTgUS-LbCIpLxc";

const MAP_DEFAULT_ZOOM = 16;

const MOCKED_GPS_DATA = [
  { coords: { latitude: 48.6415658, longitude: 22.28756, speed: 0 } },
  { coords: { latitude: 48.641, longitude: 22.288062, speed: 15 } },
  { coords: { latitude: 48.64058215369482, longitude: 22.286881880368163, speed: 20 } },
  { coords: { latitude: 48.640798, longitude: 22.285227, speed: 12 } },
  { coords: { latitude: 48.640104974973376, longitude: 22.284553493298773, speed: 5 } },
  { coords: { latitude: 48.639747, longitude: 22.283871, speed: 25 } },
  { coords: { latitude: 48.638811, longitude: 22.284282, speed: 30 } },
  { coords: { latitude: 48.638667, longitude: 22.284454, speed: 45 } },
  { coords: { latitude: 48.640655, longitude: 22.281838, speed: 60 } },
  { coords: { latitude: 48.641246, longitude: 22.283178, speed: 50 } },
  { coords: { latitude: 48.641342, longitude: 22.284898, speed: 50 } },
  { coords: { latitude: 48.641785, longitude: 22.285238, speed: 45 } },
  { coords: { latitude: 48.641634, longitude: 22.286743, speed: 20 } },
  { coords: { latitude: 48.641833, longitude: 22.287064, speed: 15 } },
  { coords: { latitude: 48.6415658, longitude: 22.28756, speed: 0 } },
];

const GEO_LOCATION_OPTIONS = {
  maximumAge: 5000, // Accept a cached position whose age is no greater than the specified time in milliseconds
  timeout: 5000, // The maximum length of time (in milliseconds) the device is allowed to take in order to return a position
  enableHighAccuracy: true, // Provides a hint that the application needs the best possible results
};

const GOOGLE_MAP_BOOTSTRAP_OPTIONS = {
  key: GOOGLE_API_KEY,
  libraries:['geometry']
};

const NO_SLEEP_REFRESH_TIMEOUT = 10000; // 10sec

export { GOOGLE_API_KEY, MAP_DEFAULT_ZOOM, MOCKED_GPS_DATA, GEO_LOCATION_OPTIONS, GOOGLE_MAP_BOOTSTRAP_OPTIONS, NO_SLEEP_REFRESH_TIMEOUT };
