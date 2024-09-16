import React, { useState, useEffect } from 'react';
import Plot from 'react-plotly.js';

const Stock = ({ symbol, setCurrentStockData }) => {
    const [stockChartXValues, setStockChartXValues] = useState([]);
    const [stockChartYValues, setStockChartYValues] = useState([]);

    useEffect(() => {
        const fetchStock = (stockSymbol) => {
            const API_KEY = 'AJV2XIH69KCJVN51';
            const API_Call = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${stockSymbol}&outputsize=compact&apikey=${API_KEY}`;

            fetch(API_Call)
                .then(res => res.json())
                .then(data => {
                    console.log('Data from API:', data);
                    const xValues = [];
                    const yValues = [];
                    for (var key in data['Time Series (Daily)']) {
                        xValues.push(key);
                        yValues.push(data['Time Series (Daily)'][key]['1. open']);
                    }
                    setStockChartXValues(xValues);
                    setStockChartYValues(yValues);
                    setCurrentStockData({ xValues, yValues }); // Update the current stock data
                })
                .catch(error => {
                    console.error('Error fetching data: ', error);
                    alert('Failed to fetch data');
                });
        };

        fetchStock(symbol);
    }, [symbol, setCurrentStockData]);

    return (
        <div>
            <h1>Chart Quest</h1>
            <Plot
                data={[
                    {
                        x: stockChartXValues,
                        y: stockChartYValues,
                        type: 'scatter',
                        mode: 'lines+markers',
                        marker: { color: 'green' },
                    },
                ]}
                layout={{ width: 820, height: 540, title: `100 Day Moving Avg Chart for ${symbol.toUpperCase()}`}}
            />
        </div>
    );
};

export default Stock;
