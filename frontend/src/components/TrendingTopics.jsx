import React, { useEffect, useState } from "react";

const TrendingTopics = () => {
  const [trends, setTrends] = useState([]);
  const [weather, setWeather] = useState(null);
  const [events, setEvents] = useState([]);
  const [stocks, setStocks] = useState(null);

  useEffect(() => {
    // 1. Trending Hashtags
    const fetchTrends = async () => {
      try {
        const res = await fetch("http://localhost:5001/api/messages/trends"); // your own backend or scraped data
        const data = await res.json();
        const items =
          data?.default?.trendingSearchesDays?.[0]?.trendingSearches || [];
        setTrends(items.map((item) => item.title.query));
      } catch (err) {
        console.error("Error fetching trends:", err);
      }
    };

    // 2. Weather
    const fetchWeather = async () => {
      try {
        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=Bangalore&units=metric&appid=d79ada975da1c9a0e76c95905316d14c`
        );
        const data = await res.json();
        setWeather({
          temp: data.main.temp,
          condition: data.weather[0].description,
        });
      } catch (err) {
        console.error("Weather API error", err);
      }
    };

    // 3. Events (Holidays)
    const fetchEvents = async () => {
      try {
        const res = await fetch(
          `https://calendarific.com/api/v2/holidays?&api_key=leHGPqWiXbBfQl6NLprq99g9FEYr039C&country=IN&year=2025`
        );
        const data = await res.json();
        const today = new Date().toISOString().split("T")[0];
        const todayEvents = data?.response?.holidays?.filter(
          (event) => event.date.iso === today
        );
        setEvents(todayEvents || []);
      } catch (err) {
        console.error("Events API error", err);
      }
    };

    // 4. Stocks
    const fetchStocks = async () => {
      try {
        const res = await fetch(
          `https://api.twelvedata.com/time_series?symbol=AAPL&interval=1min&apikey=09c1f114991e420d8dda1ab89be6cd50`
        );
        const data = await res.json();

        if (data.status === "ok") {
          const latestData = data.values[0]; // Get the most recent data point
          const previousData = data.values[1]; // Get the previous data point for price change calculation

          // Calculate the price change
          const priceChange = (
            ((parseFloat(latestData.close) - parseFloat(previousData.close)) /
              parseFloat(previousData.close)) *
            100
          ).toFixed(2);

          setStocks({
            symbol: data.meta.symbol,
            price: latestData.close,
            change: priceChange,
          });
        } else {
          console.error("API response error", data.message);
        }
      } catch (err) {
        console.error("Stocks API error", err);
      }
    };


    fetchTrends();
    fetchWeather();
    fetchEvents();
    fetchStocks();
  }, []);

  return (
    <div className="space-y-6">
      {/* Weather Section */}
      <div className="bg-black/30 backdrop-blur-md border border-white/10 rounded-xl p-4 shadow-lg text-white">
        <h3 className="text-lg font-bold mb-2">🌤️ Weather in Bangalore</h3>
        {weather ? (
          <p className="text-sm">
            {weather.temp}°C — {weather.condition}
          </p>
        ) : (
          <p className="text-sm">Loading weather...</p>
        )}
      </div>

      {/* Events Section */}
      <div className="bg-black/30 backdrop-blur-md border border-white/10 rounded-xl p-4 shadow-lg text-white">
        <h3 className="text-lg font-bold mb-2">📅 Today’s Events</h3>
        {events.length > 0 ? (
          <ul className="text-sm list-disc pl-4">
            {events.map((e, idx) => (
              <li key={idx}>{e.name}</li>
            ))}
          </ul>
        ) : (
          <p className="text-sm">No major events today.</p>
        )}
      </div>

      {/* Stocks Section */}
      <div className="bg-black/30 backdrop-blur-md border border-white/10 rounded-xl p-4 shadow-lg text-white">
        <h3 className="text-lg font-bold mb-2">📈 Stock Market (Apple Inc)</h3>
        {stocks ? (
          <p className="text-sm">
            ₹{stocks.price} ({stocks.change}%)
          </p>
        ) : (
          <p className="text-sm">Loading stock data...</p>
        )}
      </div>

      {/* Trending Hashtags Section */}
      {/* <div className="bg-black/30 backdrop-blur-md border border-white/10 rounded-xl p-4 shadow-lg text-white">
        <h3 className="text-lg font-bold mb-2">🔥 Trending in India</h3>
        <ul className="flex flex-col gap-2 text-sm">
          {trends.slice(0, 10).map((trend, i) => (
            <li key={i} className="hover:underline cursor-pointer">
              {trend}
            </li>
          ))}
        </ul>
      </div> */}
    </div>
  );
};

export default TrendingTopics;
