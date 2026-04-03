const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();
app.use(cors());

const API_KEY = process.env.NEWS_API_KEY;

app.get('/news', async (req, res) => {
  const topic = req.query.topic;
  if (!topic) return res.status(400).json({ error: 'No topic provided' });

  try {
    const url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(topic)}&sortBy=publishedAt&pageSize=6&language=en&apiKey=${API_KEY}`;
    const response = await fetch(url);
    const data = await response.json();
    res.json(data);
  } catch (e) {
    res.status(500).json({ error: 'Failed to fetch news' });
  }
});

app.listen(3000, () => console.log('TrackIt server running on port 3000'));
