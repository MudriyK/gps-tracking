import { useCallback, useState } from "react";
import { GeolocationWatcher } from "../services";

const geoWatcher = new GeolocationWatcher();

const useGps = () => {
  const [gpsData, setGpsData] = useState([]);
  const [isGPSActive, setIsGPSActive] = useState(false);

  const startWatching = useCallback(async () => {
    setIsGPSActive(true);

    geoWatcher.startWatching(
      async (position) => {
        console.log("Position: ", position);

        setGpsData((prevData) => [...prevData, position]);
      },
      (error) => {
        console.error("Error occurred: ", error.message);
      }
    );
  }, [setIsGPSActive]);

  const stopWatching = useCallback(async () => {
    setIsGPSActive(false);
    geoWatcher.stopWatching();
  }, [setIsGPSActive]);

  return {
    gpsData,
    isGPSActive,
    startWatching,
    stopWatching,
  };
};

export { useGps };
