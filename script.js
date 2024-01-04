const placesData = [];

function getWeather() {
    const apiKey = 'fd0e76bbb8817254aeb0cec22a3fb6c3';
    const inputPlace = document.getElementById('input-place');
    const place = inputPlace.value;
    if (!place) {
        alert('Please enter a city.');
        return;
    }
    const units = 'metric';

    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${place}&units=${units}&appid=${apiKey}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            console.log('Weather data:', data);
            addWeather(data);
            inputPlace.value = '';
        })
        .catch(error => {
            alert('City/Place not found.');
        });
}

function addWeather(data) {
    const placeName = data.name;
    const existingPlace = placesData.find(place => place.name.toLowerCase() === placeName.toLowerCase());
    if (existingPlace) {
        alert(`${placeName} is already added.`);
        return;
    }

    const temperature = data.main.temp;
    placesData.push({ name: placeName, temperature });
    placesData.sort((a, b) => a.temperature - b.temperature);

    const weatherContainer = document.getElementById('display-weather');
    const newWeatherCard = createWeatherCard(data);

    // Find the correct position to insert the new card based on temperature
    let insertIndex = 0;
    const existingCards = weatherContainer.getElementsByClassName('weather-card');

    for (let i = 0; i < existingCards.length; i++) {
        const cardTemperature = parseFloat(existingCards[i].getAttribute('data-temperature'));
        if (temperature > cardTemperature) {
            insertIndex = i + 1;
        } else {
            break;
        }
    }

    // Insert the new card at the correct position
    if (insertIndex === existingCards.length) {
        weatherContainer.appendChild(newWeatherCard); // Append at the end if the temperature is the highest
    } else {
        weatherContainer.insertBefore(newWeatherCard, existingCards[insertIndex]); // Insert before the card at insertIndex
    }
}

function createWeatherCard(data) {
    const weatherCard = document.createElement('div');
    weatherCard.className = 'weather-card';
    weatherCard.setAttribute('data-temperature', data.main.temp);

    const div1 = document.createElement('div');
    div1.className = 'weather-card-div1';

    const div2 = document.createElement('div');
    div2.className = 'weather-card-div2';

    const div1Inner = document.createElement('div');
    div1Inner.className = 'weather-card-div1-inner';

    const imageHolder = document.createElement('div');
    imageHolder.className = 'image-holder';

    const tempHolder = document.createElement('span');
    tempHolder.className = 'temp-holder';
    const hpHolder = document.createElement('div');
    hpHolder.className = 'hp-holder';
    const humidityHolder = document.createElement('span');
    const pressureHolder = document.createElement('span');

    const placeHolder = document.createElement('span');
    placeHolder.className = 'place-holder';
    const weatherHolder = document.createElement('span');
    weatherHolder.className = 'weather-holder';

    const humidity = data.main.temp_min;
    const pressure = data.main.temp_max;
    const weather = data.weather[0].main;
    let icon;
    switch (weather.toLowerCase()) {
        case 'clear':
            iconPath = './images/clear.png';
            break;
        case 'clouds':
            iconPath = './images/clouds.png';
            break;
        case 'rain':
            iconPath = './images/rain.png';
            break;
        case 'drizzle':
            iconPath = './images/drizzle.png';
            break;
        case 'thunderstorm':
            iconPath = './images/thunderstorm.png';
            break;
        case 'snow':
            iconPath = './images/snow.png';
            break;
        case 'mist':
            iconPath = './images/mist.png';
            break;
        case 'haze':
            iconPath = './images/snow.png';
            break;
        case 'dust':
            iconPath = './images/sand.png';
            break;
        case 'fog':
            iconPath = './images/fog.png';
            break;
        case 'sand':
            iconPath = './images/sand.png';
            break;
        case 'ash':
            iconPath = './images/sand.png';
            break;
        case 'tornado':
            iconPath = './images/tornado.png';
            break;
        case 'squall':
            iconPath = './images/tornado.png';
            break;
        default:
            iconPath = './images/clouds.png';
            break;
    }
    const weatherIconImage = document.createElement('img');
    weatherIconImage.src = iconPath;
    imageHolder.appendChild(weatherIconImage);

    tempHolder.innerText = `${data.main.temp}\u00B0`;
    humidityHolder.innerText = `H:${humidity}\u00B0`;
    pressureHolder.innerText = `L:${pressure}\u00B0`;

    hpHolder.appendChild(humidityHolder);
    hpHolder.appendChild(pressureHolder);

    div1Inner.appendChild(tempHolder);
    div1Inner.appendChild(hpHolder);

    placeHolder.innerText = data.name;
    weatherHolder.innerText = weather;

    div1.appendChild(div1Inner);
    div1.appendChild(imageHolder);
    div2.appendChild(placeHolder);
    div2.appendChild(weatherHolder);

    weatherCard.appendChild(div1);
    weatherCard.appendChild(div2);

    return weatherCard;
}
