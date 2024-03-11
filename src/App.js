import { useState } from "react";
import {
  GoogleMap,
  LeafletMap,
  LocationInfo,
  Buttons,
  InfoPanel
} from "./components";
import { GEO_LOCATION_OPTIONS } from "./constants";
import { useGps } from "./hooks";

import "./App.css";

export default function App() {
  const [totalDistance, setTotalDistance] = useState(0);
  const [highAccuracy, setHighAccuracy] = useState(
    GEO_LOCATION_OPTIONS.enableHighAccuracy
  );
  const { gpsData, isGPSActive, startWatching, stopWatching } = useGps({
    highAccuracy,
  });

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

      <InfoPanel data={gpsData} totalDistance={totalDistance} />

      {/*{gpsData.length > 0 && (*/}
      {/*  <GoogleMap*/}
      {/*    data={gpsData}*/}
      {/*    isGPSActive={isGPSActive}*/}
      {/*    setTotalDistance={setTotalDistance}*/}
      {/*  />*/}
      {/*)}*/}

      {gpsData.length > 0 && (
        <LeafletMap
          data={gpsData}
          isGPSActive={isGPSActive}
          setTotalDistance={setTotalDistance}
        />
      )}

      {gpsData.length > 0 && (
        <div className="w-full p-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {gpsData.map(({ coords }, index) => (
            <LocationInfo
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
