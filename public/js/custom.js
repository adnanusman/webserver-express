class WeatherFinder {
  constructor() {
    this.setupEventListeners();
  }

  setupEventListeners = () => {
    const form = document.getElementById('weather-finder');
    
    form.addEventListener('submit', (e) => {
      e.preventDefault();        
      const location = document.getElementById('location');

      this.getWeather(location.value);
    });
  }

  getWeather = (location) => {
    fetch(`http://localhost:3000/weather?address=${location}`).then((response) => {
      if(response) {
        return response.json();
      }
    }).then((data) => {
      this.renderData(data);
    })
  }

  renderData = (data) => {
    const resultsDiv = document.getElementById('results');

    resultsDiv.innerHTML = `
      <p>Forecast: ${data.forecast}</p>
      <p>Temperature: ${data.temperature}</p>
      <p>Chances of rain: ${data.rainProbability}</p>
    `;
  }
}

const weatherFinder =  new WeatherFinder;