async function getWeather() {
    // Beijing Coordinates: Lat 39.9042, Lon 116.4074
    const url = "https://api.open-meteo.com/v1/forecast?latitude=39.9042&longitude=116.4074&daily=temperature_2m_max,weathercode&timezone=Asia%2FShanghai";

    try {
        const response = await fetch(url);
        const data = await response.json();

        // Index 0 is Today, Index 1 is Tomorrow
        const tomorrowTemp = data.daily.temperature_2m_max[1];
        const tomorrowDate = data.daily.time[1];
        const weatherCode = data.daily.weathercode[1];

        // Update the UI
        document.getElementById('date').innerText = `Tomorrow: ${tomorrowDate}`;
        document.getElementById('temp').innerText = `${tomorrowTemp}°C`;
        document.getElementById('description').innerText = interpretWeatherCode(weatherCode);

    } catch (error) {
        console.error("Error fetching weather:", error);
        document.getElementById('description').innerText = "Failed to load data.";
    }
}

// Simple function to turn numbers into words
function interpretWeatherCode(code) {
    if (code === 0) return "Clear Sky";
    if (code <= 3) return "Partly Cloudy";
    if (code >= 51 && code <= 67) return "Rainy";
    if (code >= 71) return "Snowy";
    return "Cloudy";
}

getWeather();