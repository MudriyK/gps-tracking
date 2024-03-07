import {
  // MOCKED_GPS_DATA,
  GEO_LOCATION_OPTIONS
} from "../constants";

class GeolocationService {
  constructor() {
    this.watchID = null;
    this.lastUpdateTime = 0; // Store the time of the last update
    this.updateInterval = 3000; // Desired interval between updates in milliseconds
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
    if (this.watchID !== null) {
      console.log("Already watching position.");
      return;
    }

    if ("geolocation" in navigator) {
      console.log("Started watching position.");
      this.watchID = navigator.geolocation.watchPosition(
        (position) => {
          const currentTime = new Date().getTime();
          if (currentTime - this.lastUpdateTime >= this.updateInterval) {
            successCallback(position);
            this.lastUpdateTime = currentTime; // Update the last update time
          }
        },
        errorCallback,
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

export { GeolocationService };
