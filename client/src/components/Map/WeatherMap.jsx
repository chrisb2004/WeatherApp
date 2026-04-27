import { MapContainer, TileLayer } from 'react-leaflet'

export default function WeatherMap() {
  return (
    <MapContainer
        center={[9.7489, -83.7534]}
        zoom={8}
        minZoom={8}
        maxZoom={12}
        maxBoundsViscosity={1.0}
        style={{ height: '100vh', width: '100%' }}
    >
        <TileLayer
            url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
            attribution='&copy; <a href="https://carto.com/">CartoDB</a>'
        />
    </MapContainer>
  )
}