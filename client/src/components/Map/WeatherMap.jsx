import { useEffect } from 'react' 
import { MapContainer, TileLayer, useMap } from 'react-leaflet'
import CityMarker from './CityMarker'
import { cantones } from '../../data/cantones'

function SelectedCantonView({ canton }) {
    const map = useMap()

    useEffect(() => {
        if (!canton) return

        map.flyTo([canton.lat, canton.lon], 12, {
            animate: true,
            duration: 0.4,
        })
    }, [canton, map])

    return null
}

export default function WeatherMap({ selectedId, onSelectId, selectedCanton }) {
    return (
        <MapContainer
            center={[9.7489, -83.7534]}
            zoom={8}
            minZoom={8}
            maxZoom={12}
            style={{ height: '100vh', width: '100%', position: 'absolute'}}
        >
            <TileLayer
                url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                attribution='&copy; <a href="https://carto.com/">CartoDB</a>'
            />

            <SelectedCantonView canton={selectedCanton} />
            
            {cantones.map((canton) => (
                <CityMarker
                    key={canton.id}
                    canton={canton}
                    isSelected={selectedId === canton.id}
                    onSelect={() => onSelectId(
                        selectedId === canton.id ? null : canton.id
                    )}
                />

                
            ))}
        </MapContainer>
    )
}
