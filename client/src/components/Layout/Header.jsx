import { useMemo, useState } from 'react'
import WeatherMap from '../Map/WeatherMap'
import WeatherPanel from '../UI/WeatherPanel';
import { cantones } from '../../data/cantones'
import './Header.css'

function Header() {
    const [selectedId, setSelectedId] = useState(null);
    const selectedCanton = useMemo(
        () => cantones.find((canton) => canton.id === selectedId) ?? null,
        [selectedId]
        // ?? null — the nullish coalescing operator. If find() returns undefined (meaning no match was found, such as when nothing is selected), this replaces it with null. 
    );

    return (
        <div className='layout'>
            <div className='map-container'>
                <WeatherMap
                    selectedId={selectedId}
                    onSelectId={setSelectedId}
                    selectedCanton={selectedCanton}
                />
            </div>

            <WeatherPanel selectedCanton={selectedCanton} />
        </div>
    )
}

export default Header;
