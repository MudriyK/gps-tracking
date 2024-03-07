import { useRef, useCallback, useEffect, useState } from "react";

const useGpsServiceWorker = () => {
  const [gpsData, setGpsData] = useState([]);
  const [isGPSActive, setIsGPSActive] = useState(false);

  const geoLocationWorkerRef = useRef(null);

  const startWatching = useCallback(async () => {
    geoLocationWorkerRef.current.postMessage({ action: "START" });

    setIsGPSActive(true);
  }, [setIsGPSActive]);

  const stopWatching = useCallback(async () => {
    setIsGPSActive(false);
    geoLocationWorkerRef.current.postMessage({ action: "STOP" });
  }, [setIsGPSActive]);

  useEffect(() => {
    if (geoLocationWorkerRef.current === null) {
      geoLocationWorkerRef.current = new Worker(
        new URL("../serviceWorkers/geoLocationWorker.js", import.meta.url)
      );

      geoLocationWorkerRef.current.addEventListener("message", (e) => {
        console.log("Message received from geo worker: ", e.data);
        if (e) {
          setGpsData((prevData) => [...prevData, e.data]);
        } else if (e.data.error) {
          console.error(e.data.error);
        }
      });
    }

    return () => {
      if (geoLocationWorkerRef.current) {
        geoLocationWorkerRef.current.terminate();
        geoLocationWorkerRef.current = null;
      }
    };
  }, [setGpsData, stopWatching]);

  return {
    gpsData,
    isGPSActive,
    startWatching,
    stopWatching,
  };
};

export { useGpsServiceWorker };
