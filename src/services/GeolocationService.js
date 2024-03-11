import {
  // MOCKED_GPS_DATA,
  GEO_LOCATION_OPTIONS
} from "../constants";

class GeolocationService {
  constructor() {
    this.watchID = null;
    this.testDataInterval = null;
    this.lastUpdateTime = 0;
    this.updateInterval = 3000;
    this.supportsGeolocation = "geolocation" in navigator;
  }

  // enableGeolocation(successCallback, errorCallback) {
  //   let currentIndex = 0;
  //
  //   console.log("Started watching position.");
  //
  //   this.testDataInterval = setInterval(() => {
  //     successCallback(MOCKED_GPS_DATA[currentIndex]);
  //     currentIndex++;
  //   }, 4000);
  // }
  //
  // disableGeolocation() {
  //   if (this.testDataInterval !== null) {
  //     clearInterval(this.testDataInterval);
  //     navigator.geolocation.clearWatch(this.watchID);
  //     this.testDataInterval = null;
  //     console.log("Stopped watching position.");
  //   }
  // }
  _throttlePosition(callback) {
    const currentTime = new Date().getTime();
    if (currentTime - this.lastUpdateTime >= this.updateInterval) {
      callback();
      this.lastUpdateTime = currentTime; // Update the last update time
    }
  }

  enableGeolocation(successCallback, errorCallback, options = {}) {
    if (this.watchID !== null) {
      console.log("Already watching position.");
      return;
    }

    if (this.supportsGeolocation) {
      console.log("Started watching position.");
      this.watchID = navigator.geolocation.watchPosition(
        (position) => {
          this._throttlePosition(() => successCallback(position));
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
  disableGeolocation() {
    if (this.watchID !== null) {
      navigator.geolocation.clearWatch(this.watchID);
      this.watchID = null; // Reset the watchID after stopping
      console.log("Stopped watching position.");
    }
  }
}

export { GeolocationService };
