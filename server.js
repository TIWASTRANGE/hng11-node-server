const express = require('express');
const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config();

const app = express();


const API_KEY = process.env.WEATHERSTACK_API_KEY;


app.get('/api/hello', async (req, res) => {
  const visitorName = req.query.visitor_name || 'Mark';
  
  
  try {
    const locationResponse = await axios.get(`http://ip-api.com/json/`);
    const location = locationResponse.data.city;
    const clientIp = locationResponse.data.query;
    
    const weatherResponse = await axios.get(`http://api.weatherstack.com/current?access_key=${API_KEY}&query=${location}`);
    const temperature = weatherResponse.data.current.temperature;
    
    const greeting = `Hello, ${visitorName}! The temperature is ${temperature} degrees Celsius in ${location}`;
    
    res.json({
      Client_IP: clientIp,
      Location: location,
      Greeting: greeting
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
