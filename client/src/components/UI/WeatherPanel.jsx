import './WeatherPanel.css'
import { useMemo } from 'react'
import { cantones } from '../../data/cantones';

export default function WeatherPanel({ selectedCanton }) {
    return (
        <section id="weather-panel">
            <div className={`panel-wrapper ${selectedCanton ? 'selection-made' : ''}`}>
                <div className="panel-body">
                    <h1>{selectedCanton ? selectedCanton.name : 'Error getting canton'}</h1>
                    <h2>{selectedCanton ? selectedCanton.temp : '0'}</h2>
                </div>
            </div>
        </section>
    )
}
