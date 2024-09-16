import React from 'react';
import Plot from 'react-plotly.js';
import { Link } from 'react-router-dom';

const SavedStocks = ({ savedStocks }) => {
    return (
        <div>
            <h1>Saved Stocks</h1>
            {savedStocks.map((stock, index) => (
                <div key={index}>
                    <h2>{stock.symbol}</h2>
                    <Plot
                        data={[
                            {
                                x: stock.data.xValues,
                                y: stock.data.yValues,
                                type: 'scatter',
                                mode: 'lines+markers',
                                marker: { color: 'green' },
                            },
                        ]}
                        layout={{ width: 820, height: 540, title: `100 Day Moving Chart for ${stock.symbol.toUpperCase()}` }}
                    />
                </div>
            ))}
         <Link to="/">Home</Link>

        </div>
    );
};

export default SavedStocks;
