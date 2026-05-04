import { Marker } from 'react-leaflet'
import L from 'leaflet'
import { useRef, useEffect, useMemo } from 'react'
import './CityMarker.css'

function createIcon(isSelected) {
  return L.divIcon({
    className: '',
    html: `
      <div class="teardrop ${isSelected ? 'teardrop-selected' : ''}" style="
            width: 20px;
            height: 26px;
            position: relative;
            cursor: pointer;
      ">
        <div style="
            width: 20px;
            height: 20px;
            background: white;
            border-radius: 50% 50% 50% 0;
            transform: rotate(-45deg);
        "></div>

        <div style="
            width: 12px;
            height: 12px;
            background: grey;
            border-radius: 50%;
            position: absolute;
            top: 4px;
            left: 50%;
            transform: translateX(-50%);
        "></div>
      </div>
    `,
    iconSize: [20, 26],
    iconAnchor: [10, 26],
  })
}

export default function CityMarker({ canton, isSelected, onSelect }) {
    const markerRef = useRef(null)
    const icon = useMemo(() => createIcon(), [])
    
    useEffect(() => {
        const marker = markerRef.current
        if (!marker) return

        const el = marker.getElement()
        if (!el) return

        const teardrop = el.querySelector('.teardrop')
        
        if (!teardrop) return

        if (isSelected) {
            teardrop.classList.add('teardrop-selected')
        } else {
            teardrop.classList.remove('teardrop-selected')
        }
    }, [isSelected]);
  
    return (
        <Marker
            id='canton-marker' 
            ref={markerRef}
            position={[canton.lat, canton.lon]}
            icon={icon}
            eventHandlers={{
                click: () => onSelect(),
            }}
        />
    )
}