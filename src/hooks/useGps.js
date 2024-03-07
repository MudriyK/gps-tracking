import { useCallback, useState, useEffect } from "react";
import { GeolocationWatcher, WakeLockWatcher } from "../services";

const geoWatcher = new GeolocationWatcher();
const wakeLockWatcher = new WakeLockWatcher();

const useGps = ({ highAccuracy }) => {
  const [gpsData, setGpsData] = useState([]);
  const [isGPSActive, setIsGPSActive] = useState(false);

  const startWatching = useCallback(async () => {
    setIsGPSActive(true);

    await wakeLockWatcher.start();

    geoWatcher.startWatching(
      async (position) => {
        console.log("Position: ", position);

        setGpsData((prevData) => [...prevData, position]);
      },
      (error) => {
        console.error("Error occurred: ", error.message);
      },
      { enableHighAccuracy: highAccuracy }
    );
  }, [setIsGPSActive, highAccuracy]);

  const stopWatching = useCallback(async () => {
    setIsGPSActive(false);

    await wakeLockWatcher.finish();
    geoWatcher.stopWatching();
  }, [setIsGPSActive]);

  useEffect(() => {
    return () => {
      stopWatching();
    };
  }, []);

  return {
    gpsData,
    isGPSActive,
    startWatching,
    stopWatching,
  };
};

export { useGps };
