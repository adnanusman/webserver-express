const path = require('path');

const express = require('express');

const app = express();

// setup paths for express configuration
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates');

// setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);

// setup express static folder to serve from
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
  res.render('index', {
    title: 'Homepage'
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
  res.send([{
    temperature: 63,
    prepPercentage: 3
  }]);
});

app.listen(3000, () => {
  console.log('Server is listening at port 3000');
});