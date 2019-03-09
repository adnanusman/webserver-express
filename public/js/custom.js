class WeatherFinder {
  constructor() {
    this.setupEventListeners();
  }

  setupEventListeners = () => {
    const form = document.getElementById('weather-finder');
    
    form.addEventListener('submit', (e) => {
      e.preventDefault();        
      const location = document.getElementById('location');

      this.displayLoading();
      this.getWeather(location.value);
    });
  }

  displayLoading = () => {
    const resultsDiv = document.getElementById('results');

    resultsDiv.innerHTML = 'Loading...';
  }

  getWeather = (location) => {
    fetch(`/weather?address=${location}`).then((response) => {
      if(response) {
        return response.json();
      }
    }).then((data) => {
      // if error then render error, else render the data.
      data.error ? this.renderError(data.error) : this.renderData(data);
    })
  }

  renderError = (error) => {
    const resultsDiv = document.getElementById('results');

    resultsDiv.innerHTML = `<p>Error: ${error}</p>`;
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