import React, { useEffect, useState } from "react";
import Controls from "./components/Controls";
import Map from "./components/Map";
import "./styles.css";

const URL = "https://api.wheretheiss.at/v1/satellites/25544";

export default function App() {
  const [coords, setCoords] = useState({
    longitude: 0,
    latitude: 0,
  });

  async function getISSCoords() {
    const json = await fetch(URL);
    const data = await json.json();
    console.log(data);
    setCoords({
      ...coords,
      longitude: data.longitude,
      latitude: data.latitude,
    });
  }

  useEffect(() => {
    const intervalForISS = setInterval(() => getISSCoords(), 5000); // in milliseconds
    return () => clearInterval(intervalForISS);
  }, []);

  return (
    <main>
      <Map {...coords} />
      <Controls
        longitude={coords.longitude}
        latitude={coords.latitude}
        onRefresh={getISSCoords}
      />
    </main>
  );
}
