"use client";

import {
  APIProvider,
  Map,
  type MapCameraChangedEvent,
} from "@vis.gl/react-google-maps";

export function MapDisplay() {
  return (
    <APIProvider
      apiKey="AIzaSyB87xCaYZEhluVjLlp6fGQL21tTWO39pJg"
      onLoad={() => console.log("Maps API has loaded.")}
    >
      <Map
        defaultZoom={13}
        defaultCenter={{ lat: -33.860664, lng: 151.208138 }}
        onCameraChanged={(ev: MapCameraChangedEvent) =>
          console.log(
            "camera changed:",
            ev.detail.center,
            "zoom:",
            ev.detail.zoom,
          )
        }
      ></Map>
    </APIProvider>
  );
}
