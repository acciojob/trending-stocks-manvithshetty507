async function trendingStocks(n) {
  // Fetch stock symbols
  const symbolsResponse = await fetch('https://api.frontendexpert.io/api/fe/stock-symbols');
  const symbolsData = await symbolsResponse.json();

  // Fetch stock prices
  const symbolsArray = symbolsData.slice(0, n).map(stock => stock.symbol);
  const pricesResponse = await fetch(`https://api.frontendexpert.io/api/fe/stock-prices?symbols=${JSON.stringify(symbolsArray)}`);
  const pricesData = await pricesResponse.json();

  // Fetch market caps
  const marketCapsResponse = await fetch('https://api.frontendexpert.io/api/fe/stock-market-caps');
  const marketCapsData = await marketCapsResponse.json();

  // Combine data
  const result = symbolsData.slice(0, n).map(stock => {
    const priceInfo = pricesData.find(price => price.symbol === stock.symbol);
    const marketCapInfo = marketCapsData.find(cap => cap.symbol === stock.symbol);

    return {
      name: stock.name,
      symbol: stock.symbol,
      price: priceInfo ? priceInfo.price : null,
      "52-week-high": priceInfo ? priceInfo["52-week-high"] : null,
      "52-week-low": priceInfo ? priceInfo["52-week-low"] : null,
      "market-cap": marketCapInfo ? marketCapInfo["market-cap"] : null,
    };
  });

  return result;
}

module.exports=trendingStocks;  
