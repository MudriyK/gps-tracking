import { GeolocationWatcher } from "../services";

const geoWatcher = new GeolocationWatcher();

//eslint-disable-next-line no-restricted-globals
self.onmessage = (e) => {
  console.log("TestWroker GEO received message ", e);
  //Start or stop watching location based on the message from the main thread
  if (e.data.action === "START") {
    geoWatcher.startWatching(
      async (position) => {
        console.log("Position: ", position);

        // eslint-disable-next-line no-restricted-globals
        self.postMessage(position);
      },
      (error) => {
        console.error("Error occurred: ", error.message);
      }
    );
  } else if (e.data.action === "STOP" && e.data.watchID) {
    geoWatcher.stopWatching();
  }
};
