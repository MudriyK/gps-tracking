import { useRef, useCallback, useEffect, useState } from "react";

const useMapsWorker = () => {
  const [totalDistance, setTotalDistance] = useState(0);
  const mapsWorkerRef = useRef(null);

  const getTotalDistance = useCallback(async (map, routeData) => {
    mapsWorkerRef.current.postMessage({
      action: "getTotalDistance",
      map,
      routeData,
    });
  }, []);

  useEffect(() => {
    if (mapsWorkerRef.current === null) {
      mapsWorkerRef.current = new Worker(
        new URL("../webWorkers/mapsWorker.js", import.meta.url)
      );

      mapsWorkerRef.current.addEventListener("message", (e) => {
        switch (e.data.action) {
          case "computedTotalDistance": {
            setTotalDistance(e.data.value);
            break;
          }
          default: {
            return null;
          }
        }
      });
    }

    return () => {
      if (mapsWorkerRef.current) {
        mapsWorkerRef.current.terminate();
        mapsWorkerRef.current = null;
      }
    };
  }, []);

  return {
    totalDistance,
    getTotalDistance,
  };
};

export { useMapsWorker };
