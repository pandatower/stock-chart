import './App.css';
import NavBar from './components/NavBar';
import Stock from './Stock';
import { useState } from 'react';
import SavedStocks from './components/Saved';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  const [symbol, setSymbol] = useState('GOOG');  // Default symbol
  const [savedStocks, setSavedStocks] = useState([]);
  const [currentStockData, setCurrentStockData] = useState(null);

  const saveStock = (stockSymbol, stockData) => {
    if (!savedStocks.some(stock => stock.symbol === stockSymbol)) {
      setSavedStocks([...savedStocks, { symbol: stockSymbol, data: stockData }]);
    }
  };

  return (
    <Router>
      <div className="App">
        <NavBar setSymbol={setSymbol} saveStock={() => saveStock(symbol, currentStockData)} />
        <Routes>
          <Route path="/" element={<Stock symbol={symbol} setCurrentStockData={setCurrentStockData} />} exact />
          <Route path="/saved-stocks" element={<SavedStocks savedStocks={savedStocks} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
