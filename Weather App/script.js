const apiKey = '7e3f21edee540e6110af347b55eb1ab2';

document.addEventListener('DOMContentLoaded', (event) => {
    fetchWeather('Mumbai'); 
});

const cityInput = document.getElementById('city-input');
cityInput.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault(); 
        const city = cityInput.value.trim();
        fetchWeather(city); 
        cityInput.value = '';
    }
});

function fetchWeather(city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            updateWeather(data); 
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            
        });
}

function updateWeather(data) {
    document.getElementById('city-name').textContent = `${data.name}, ${data.sys.country}`;
    document.getElementById('date').textContent = new Date().toLocaleDateString('en-GB', {
        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
    });
    document.getElementById('temperature').textContent = `${Math.round(data.main.temp)}°C`;
    document.getElementById('weather-description').textContent = data.weather[0].description;
    
    const minTemp = Math.round(data.main.temp_min);
    const maxTemp = Math.round(data.main.temp_max);
    document.getElementById('temp-range').textContent = `${minTemp}°C / ${maxTemp}°C`;
}
