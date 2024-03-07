// import { MOCKED_GPS_DATA } from "../constants";

const options = {
  maximumAge: 5000, // Accept a cached position whose age is no greater than the specified time in milliseconds
  timeout: 5000, // The maximum length of time (in milliseconds) the device is allowed to take in order to return a position
  enableHighAccuracy: true, // Provides a hint that the application needs the best possible results
};

class GeolocationWatcher {
  constructor() {
    this.watchID = null; // This will hold the ID of the watchPosition call
  }

  // Method to start watching the position
  startWatching(successCallback, errorCallback) {
    // let currentIndex = 0;

    if ("geolocation" in navigator) {
      this.watchID = navigator.geolocation.watchPosition(
        (position) => {
          // Call the success callback function with the position object
          successCallback(position);
          // successCallback(MOCKED_GPS_DATA[currentIndex]);
          // currentIndex++;
        },
        (error) => {
          // Call the error callback function with the error object
          errorCallback(error);
        },
        options
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }

  // Method to stop watching the position
  stopWatching() {
    if (this.watchID !== null) {
      navigator.geolocation.clearWatch(this.watchID);
      this.watchID = null; // Reset the watchID after stopping
      console.log("Stopped watching position.");
    }
  }
}

export { GeolocationWatcher };
