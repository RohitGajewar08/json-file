const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

app.post('/getWeather', async (req, res) => {
  try {
    const { cities } = req.body;

    const weatherPromises = cities.map(async (city) => {
      const response = await axios.get(`YOUR_WEATHER_API_ENDPOINT/${city}`);
      return { [city]: response.data.temperature };
    });

    const weatherResults = await Promise.all(weatherPromises);

    res.json({ weather: Object.assign({}, ...weatherResults) });
  } catch (error) {
    console.error('Error fetching weather data:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});