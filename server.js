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
    const url = `https://gnews.io/api/v4/search?q=${encodeURIComponent(topic)}&lang=en&max=6&sortby=publishedAt&apikey=${API_KEY}`;
    const response = await fetch(url);
    const data = await response.json();

    if (!data.articles) throw new Error(data.errors?.[0] || 'No articles');

    res.json({
      status: 'ok',
      articles: data.articles.map(a => ({
        title: a.title,
        description: a.description,
        url: a.url,
        publishedAt: a.publishedAt,
        source: { name: a.source?.name || 'News' }
      }))
    });
  } catch (e) {
    res.status(500).json({ error: e.message || 'Failed to fetch news' });
  }
});

app.listen(3000, () => console.log('TrackIt server running on port 3000'));
