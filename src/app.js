const express = require('express');

const app = express();

app.get('', (req, res) => {
  res.send('Express works now');
});

app.get('/about', (req, res) => {
  res.send('<h1>About Us</h1>');
});

app.get('/weather', (req, res) => {
  res.send([{
    temperature: 63,
    prepPercentage: 40
  }]);
});

app.listen(3000, () => {
  console.log('Server is listening at port 3000');
});