import express from 'express';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('ExpressJS server response OK for stock application!');
});

// Endpoint to fetch stock data
app.get('/api/stock/:symbol', async (req, res) => {
  const symbol = req.params.symbol;
  const apiKey = process.env.ALPHAVANTAGE_API_KEY;
  const url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&outputsize=compact&apikey=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error fetching stock data:', error);
    res.status(500).send('Failed to fetch stock data');
  }
});

app.listen(port, () => {
  console.log(`ExpressJS server listening on PORT: ${port}`);
});
