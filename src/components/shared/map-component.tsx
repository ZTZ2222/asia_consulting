"use client"

import "leaflet-defaulticon-compatibility"
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css"
import "leaflet/dist/leaflet.css"
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet"

type Props = {
  latitude: number
  longitude: number
}

export default function MapComponent({ latitude, longitude }: Props) {
  const lat = latitude || 42.8780682
  const lng = longitude || 74.5849917
  return (
    <MapContainer
      center={[lat, lng]}
      zoom={16}
      style={{ height: "450px", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={[lat, lng]} draggable={false}>
        <Popup>Asia Consulting</Popup>
      </Marker>
    </MapContainer>
  )
}
