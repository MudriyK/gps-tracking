import { useState } from "react";
import { Card } from "@mui/material";
import { GoogleMap, MarkerInfo, Buttons } from "./components";
import { GEO_LOCATION_OPTIONS } from "./constants";
import {
  useGps,
  // useGpsServiceWorker
} from "./hooks";

import "./App.css";

export default function App() {
  const [highAccuracy, setHighAccuracy] = useState(GEO_LOCATION_OPTIONS.enableHighAccuracy);
  // const { gpsData, isGPSActive, startWatching, stopWatching } =
  //   useGpsServiceWorker();
  const { gpsData, isGPSActive, startWatching, stopWatching } = useGps({ highAccuracy });

  return (
    <main className="mx-auto max-w-screen-l">
      <div className="w-full p-5 flex items-center justify-between">
        <Buttons
          isGPSActive={isGPSActive}
          startWatching={startWatching}
          stopWatching={stopWatching}
          highAccuracy={highAccuracy}
          setHighAccuracy={setHighAccuracy}
        />
      </div>

      <Card className="w-full p-5" style={{ height: "400px" }}>
        {gpsData.length > 0 && <GoogleMap data={gpsData} isGPSActive={isGPSActive} />}
      </Card>

      {gpsData.length > 0 && (
        <div className="w-full p-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {gpsData.map(({ coords }, index) => (
            <MarkerInfo
              key={index}
              title={`Point ${index + 1}`}
              coords={coords}
            />
          ))}
        </div>
      )}
    </main>
  );
}
