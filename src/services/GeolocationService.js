import {
  // MOCKED_GPS_DATA,
  GEO_LOCATION_OPTIONS,
  GEOLOCATION_THROTTLE_TIMEOUT,
} from "../constants";
import { throttle } from "../utils";

class GeolocationService {
  constructor() {
    this._watchID = null;
    // this._testDataInterval = null;
    this._supportsGeolocation = "geolocation" in navigator;
  }
  // Enable testing data
  // enableGeolocation(successCallback, errorCallback) {
  //   let currentIndex = 0;
  //
  //   console.log("Started watching position.");
  //
  //   this._testDataInterval = setInterval(() => {
  //     successCallback(MOCKED_GPS_DATA[currentIndex]);
  //     currentIndex++;
  //   }, 2000);
  // }
  //
  // disableGeolocation() {
  //   if (this._testDataInterval !== null) {
  //     clearInterval(this._testDataInterval);
  //     navigator.geolocation.clearWatch(this._watchID);
  //     this._testDataInterval = null;
  //     console.log("Stopped watching position.");
  //   }
  // }

  enableGeolocation(successCallback, errorCallback, options = {}) {
    if (this._watchID !== null) {
      console.log("Already watching position.");
      return;
    }

    if (this._supportsGeolocation) {
      const throttledSuccessCallback = throttle((position) => {
        successCallback(position);
      }, GEOLOCATION_THROTTLE_TIMEOUT);

      console.log("Started watching position.");
      this._watchID = navigator.geolocation.watchPosition(
        throttledSuccessCallback,
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
    if (this._watchID !== null) {
      navigator.geolocation.clearWatch(this._watchID);
      this._watchID = null; // Reset the watchID after stopping
      console.log("Stopped watching position.");
    }
  }
}

export { GeolocationService };
