// coinData.js

async function fetchCoinData(coinCode) {
    try {
      const response = await fetch(new Request("https://api.livecoinwatch.com/coins/map"), {
        method: "POST",
        headers: new Headers({
          "content-type": "application/json",
          "x-api-key": "cf6803f0-4b31-4698-99b4-4b2153a61b23",
        }),
        body: JSON.stringify({
          codes: ["ETH","BTC","SOL","DOGE","SHIB"],
          currency: "USD",
          sort: "code",
          order: "ascending",
          offset: 0,
          limit: 0,
          meta: false,
        }),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
      const ans=data.map(c=>c.rate);
    // console.log(ans);
    return (ans); // Return the response data
    } catch (error) {
      console.error(`Error fetching data for ${coinCode}:`, error);
      throw error; // Re-throw the error to handle it in the calling code
    }
  }
  
  async function fetchMultipleCoinsData() {
    try {
        
      const fetchPromises = await fetchCoinData();
      
      // console.log(fetchPromises);
      return fetchPromises
    } catch (error) {
      console.error('Error fetching multiple coins data:', error);
      throw error; // Re-throw the error to handle it in the calling code
    }
  }
  
  export {fetchMultipleCoinsData};
  