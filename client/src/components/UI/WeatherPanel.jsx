import './WeatherPanel.css'

export default function WeatherPanel({ selectedCanton }) {
    return (
        <section id="weather-panel">
            <div className={`panel-wrapper ${selectedCanton ? 'selection-made' : ''}`}>
                <div className="panel-body">
                    <h1>Costa Rican weather</h1>
                    <h2>7 provinces & 60 cantons</h2>
                </div>
            </div>
        </section>
    )
}
