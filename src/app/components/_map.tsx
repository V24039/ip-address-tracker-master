"use client";
import React from "react";
import L from "leaflet";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";

type MapProps = {
  lat: number;
  long: number;
  error: string | null;
};

const Map = ({ lat, long, error }: MapProps) => {
  if (error) {
    return (
      <div className="flex justify-center items-center-safe pt-72">
        <p className="align-middle text-red-500">{error}</p>;
      </div>
    );
  }

  if (typeof window === "undefined") return null;
  const icon = L.icon({ iconUrl: "/icon-location.svg", iconSize: [25, 41] });

  return (
    <MapContainer
      center={[lat, long]}
      zoom={13}
      scrollWheelZoom={false}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[lat, long]} icon={icon} />
    </MapContainer>
  );
};

export default Map;
