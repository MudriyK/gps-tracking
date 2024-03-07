import {
  // MOCKED_GPS_DATA,
  GEO_LOCATION_OPTIONS
} from "../constants";

class GeolocationWatcher {
  constructor() {
    this.watchID = null;
  }

  // startWatchingMock(successCallback, errorCallback) {
  //   let currentIndex = 0;
  //
  //   setInterval(() => {
  //     successCallback(MOCKED_GPS_DATA[currentIndex]);
  //     currentIndex++;
  //   }, 4000);
  // }

  startWatching(successCallback, errorCallback, options = {}) {
    if ("geolocation" in navigator) {
      this.watchID = navigator.geolocation.watchPosition(
        (position) => {
          successCallback(position);
        },
        (error) => {
          errorCallback(error);
        },
        {
          ...GEO_LOCATION_OPTIONS,
          options
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }
  stopWatching() {
    if (this.watchID !== null) {
      navigator.geolocation.clearWatch(this.watchID);
      this.watchID = null; // Reset the watchID after stopping
      console.log("Stopped watching position.");
    }
  }
}

export { GeolocationWatcher };
