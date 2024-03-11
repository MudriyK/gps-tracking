import { useCallback, useState, useEffect } from "react";
import { GeolocationService, WakeLockService } from "../services";

const geolocationService = new GeolocationService();
const wakeLockService = new WakeLockService();

const useGps = ({ highAccuracy }) => {
  const [gpsData, setGpsData] = useState([]);
  const [isGPSActive, setIsGPSActive] = useState(false);

  const startWatching = useCallback(async () => {
    setIsGPSActive(true);

    await wakeLockService.enableWakeLock();
    await geolocationService.enableGeolocation(
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

    await wakeLockService.disableWakeLock();
    await geolocationService.disableGeolocation();
  }, [setIsGPSActive]);

  useEffect(() => {
    return () => {
      stopWatching();
    };
  }, [stopWatching]);

  return {
    gpsData,
    isGPSActive,
    startWatching,
    stopWatching,
  };
};

export { useGps };
