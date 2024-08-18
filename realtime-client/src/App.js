// frontend/src/App.js

import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [stocks, setStocks] = useState([]);

  useEffect(() => {
    // Fetch the latest 20 stock entries initially
    const fetchLatestStocks = async () => {
      try {
        const response = await fetch('http://localhost:8000/latest-stocks');
        const data = await response.json();
        setStocks(data);
        console.log('Initial data fetched:', data);
      } catch (error) {
        console.error('Error fetching initial stock data:', error);
      }
    };

    fetchLatestStocks(); // Fetch initial data

    const eventSource = new EventSource('http://localhost:8000/events');

    eventSource.onmessage = function (event) {
      const newStockData = JSON.parse(event.data);
      console.log('New stock data received:', newStockData);

      // Update the stocks state with new data
      setStocks(prevStocks => {
        const updatedStocks = [newStockData, ...prevStocks];
        return updatedStocks.slice(0, 20); // Keep only the latest 20 entries
      });
    };

    eventSource.onerror = function (error) {
      console.error('Error with SSE connection:', error);
    };

    return () => {
      eventSource.close(); // Clean up the event source on component unmount
      console.log('SSE connection closed');
    };
  }, []);

  return (
    <div className="App">
      <h1>Latest Cryptocurrency Prices</h1>
      <table>
        <thead>
          <tr>
            <th>Timestamp</th>
            <th>BTC Price</th>
            <th>DOGE Price</th>
            <th>ETH Price</th>
            <th>SHIB Price</th>
            <th>SOL Price</th>
          </tr>
        </thead>
        <tbody>
          {stocks.map((stock, index) => (
            <tr key={index}>
              <td>{new Date(stock.createdAt).toLocaleString()}</td>
              <td>{stock.btcprice}</td>
              <td>{stock.dogeprice}</td>
              <td>{stock.ethprice}</td>
              <td>{stock.shibprice}</td>
              <td>{stock.solprice}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
