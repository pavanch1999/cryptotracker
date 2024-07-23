// coinData.js

async function fetchCoinData(coinCode) {
    try {
      const response = await fetch("https://api.livecoinwatch.com/coins/single", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          "x-api-key": "31045115-8cd2-4783-b65a-9e2137012015",
        },
        body: JSON.stringify({
          currency: "USD",
          code: coinCode,
          meta: true,
        }),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
      const ans=data.name +" "+ data.rate
    
    return (ans); // Return the response data
    } catch (error) {
      console.error(`Error fetching data for ${coinCode}:`, error);
      throw error; // Re-throw the error to handle it in the calling code
    }
  }
  
  async function fetchMultipleCoinsData() {
    try {
        const coinCodes=["ETH","BTC","SOL","DOGE","SHIB"];
      const fetchPromises = coinCodes.map(code => fetchCoinData(code));
      const results = await Promise.all(fetchPromises);
      console.log(results);
      return results
    } catch (error) {
      console.error('Error fetching multiple coins data:', error);
      throw error; // Re-throw the error to handle it in the calling code
    }
  }
  
  export {fetchMultipleCoinsData};
  