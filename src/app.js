require('dotenv').config();
const path = require('path');

const express = require('express');
const hbs = require('hbs');
const request = require('request');

const token = process.env.token;
const key = process.env.key;
const port = process.env.PORT || 3000;

const app = express();

// setup paths for express configuration
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates');
const partialsPath = path.join(__dirname, '../partials');

// setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// setup express static folder to serve from
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather App'
  });
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Us'
  });
})

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help Section'
  });
})

app.get('/weather', (req, res) => {
  if(!req.query.address) {
    return res.send({
      error: 'Please enter a valid address.'
    })
  }

  new Promise((resolve, reject) => {
    request({
      url: `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(req.query.address)}.json?access_token=${token}`,
      json: true
    }, (error, {body, statusCode} = {}) => {
      // if there is an error, or no connection reject the promise.
      if(error) {
        reject();
    
      } else if(statusCode === 401) {
        res.send('There is an issue with the token/API key');
        return;
      // in case the status code is 404, (in case someone submits an empty query) or if there are no results for the query.
      } else if(statusCode === 404 || body.features.length === 0) {
        res.send('Could not find location in database');
      
      // otherwise move on and do the rest
      } else {

        const longitude = body.features[0].geometry.coordinates[0];
        const latitude = body.features[0].geometry.coordinates[1];
  
        // resolve the promise and pass the data.
        resolve({"longitude": longitude, "latitude": latitude});  
      }
    })
  }).then(({longitude, latitude} = {}) => {
    // once the promise resolves, make request to the weather API.
    request({
      url: `https://api.darksky.net/forecast/${key}/${latitude},${longitude}`,
      json: true
    }, (error, {body}) => {
      // if there is an error, or no connection.
      if(error) {
        res.send('Unable to connect to weather service');
      // if there are no results for the location.
      } else if(body.code === 400) {
        res.send({error: body.error});
      } else {
        res.send(
          {
            forecast: `The weather is ${body.currently.summary}`, 
            temperature: body.currently.temperature, 
            rainProbability: body.currently.precipProbability
          }
        );
      }
    })
  }).catch(() => {
    res.send('Unable to connect to the API. Please check your connection.');
  });
});

app.get('/help/*', (req, res) => {
  res.render('404', {
    errorMessage: 'Help topic not found.'
  })
})

app.get('*', (req, res) => {
  res.render('404', {
    errorMessage: 'Page not found'
  })
})

app.listen(port, () => {
  console.log(`Server is listening at port ${port}`);
});