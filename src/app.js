const path = require('path');

const express = require('express');

const app = express();
const publicDirectoryPath = path.join(__dirname, '../public');

app.use(express.static(publicDirectoryPath));

app.get('/weather', (req, res) => {
  res.send([{
    temperature: 63,
    prepPercentage: 3
  }]);
});

app.listen(3000, () => {
  console.log('Server is listening at port 3000');
});