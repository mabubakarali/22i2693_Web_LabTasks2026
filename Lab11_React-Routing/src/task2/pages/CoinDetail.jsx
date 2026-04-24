import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, TrendingDown, Star, Loader2, ArrowLeft } from 'lucide-react';

export default function CoinDetail() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [settings, setSettings] = useState(() => JSON.parse(localStorage.getItem('lab13_crypto_settings') || '{"currency":"usd","favorites":[]}'));
  const currency = settings.currency;
  const currencySymbol = currency.toUpperCase();
  const isFav = settings.favorites.includes(id);

  const toggleFav = () => {
    let newFavs;
    if (isFav) {
      newFavs = settings.favorites.filter(fId => fId !== id);
    } else {
      newFavs = [...settings.favorites, id];
    }
    const newSettings = { ...settings, favorites: newFavs };
    setSettings(newSettings);
    localStorage.setItem('lab13_crypto_settings', JSON.stringify(newSettings));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Fetch coin details
        const resCoin = await fetch(`https://api.coingecko.com/api/v3/coins/${id}`);
        if (!resCoin.ok) throw new Error("API Limit Reached or Network Error");
        const coinData = await resCoin.json();
        
        // Fetch chart data
        const resChart = await fetch(`https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=${currency}&days=7`);
        const chartJson = await resChart.json();
        
        const formattedChart = chartJson.prices.map(p => {
          const date = new Date(p[0]);
          return {
            time: `${date.getMonth()+1}/${date.getDate()} ${date.getHours()}:00`,
            price: p[1]
          };
        });

        setData(coinData);
        setChartData(formattedChart);
        setError(null);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id, currency]);

  if (loading) {
    return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}><Loader2 size={48} color="var(--task2-color)" className="spin" style={{ animation: 'spin 1s linear infinite' }} /></div>;
  }
  if (error) {
    return <div style={{ color: 'var(--danger)', padding: '2rem', textAlign: 'center' }}>{error} - Please try again later.</div>;
  }
  if (!data) return null;

  const currentPrice = data.market_data.current_price[currency];
  const priceChange24h = data.market_data.price_change_percentage_24h;
  const isPositive = priceChange24h >= 0;

  return (
    <div style={{ animation: 'fadeIn 0.5s ease', maxWidth: '1000px', margin: '0 auto' }}>
      <Link to="/task2" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--task2-color)', marginBottom: '2rem', textDecoration: 'none' }}>
        <ArrowLeft size={18} /> Back to Dashboard
      </Link>

      <div className="glass-panel" style={{ padding: '2rem', marginBottom: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '2rem' }}>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            <img src={data.image.large} alt={data.name} style={{ width: '64px', height: '64px' }} />
            <div>
              <h1 style={{ margin: 0, fontSize: '2.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                {data.name} 
                <span style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>{data.symbol}</span>
                <span style={{ fontSize: '1rem', background: 'var(--surface-color)', padding: '4px 12px', borderRadius: '16px' }}>Rank #{data.market_cap_rank}</span>
              </h1>
            </div>
          </div>
          
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '3rem', fontWeight: 'bold' }}>{currencySymbol} {currentPrice.toLocaleString()}</div>
            <div style={{ 
              display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '4px',
              color: isPositive ? 'var(--success)' : 'var(--danger)',
              fontWeight: 'bold', fontSize: '1.2rem'
            }}>
              {isPositive ? <TrendingUp size={20} /> : <TrendingDown size={20} />}
              {Math.abs(priceChange24h).toFixed(2)}% (24h)
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
          <button onClick={toggleFav} style={{ 
            display: 'flex', alignItems: 'center', gap: '8px', 
            background: isFav ? 'rgba(245, 158, 11, 0.2)' : 'var(--surface-color)', 
            color: isFav ? 'var(--task2-color)' : 'var(--text-primary)',
            padding: '0.8rem 1.5rem', borderRadius: '8px', border: isFav ? '1px solid var(--task2-color)' : '1px solid transparent'
          }}>
            <Star size={18} fill={isFav ? "var(--task2-color)" : "transparent"} />
            {isFav ? "Saved to Favorites" : "Add to Favorites"}
          </button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginBottom: '2rem' }}>
        <div className="glass-panel" style={{ padding: '2rem' }}>
          <h3 style={{ marginBottom: '1.5rem' }}>Market Statistics</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>
              <span style={{ color: 'var(--text-secondary)' }}>Market Cap</span>
              <strong>{currencySymbol} {data.market_data.market_cap[currency].toLocaleString()}</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>
              <span style={{ color: 'var(--text-secondary)' }}>24h High / Low</span>
              <strong>{currencySymbol}{data.market_data.high_24h[currency].toLocaleString()} / {currencySymbol}{data.market_data.low_24h[currency].toLocaleString()}</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>
              <span style={{ color: 'var(--text-secondary)' }}>All-Time High</span>
              <strong>{currencySymbol} {data.market_data.ath[currency].toLocaleString()}</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>
              <span style={{ color: 'var(--text-secondary)' }}>Circulating Supply</span>
              <strong>{data.market_data.circulating_supply.toLocaleString()}</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>
              <span style={{ color: 'var(--text-secondary)' }}>Total Supply</span>
              <strong>{data.market_data.total_supply ? data.market_data.total_supply.toLocaleString() : 'Infinite'}</strong>
            </div>
          </div>
        </div>

        <div className="glass-panel" style={{ padding: '2rem', display: 'flex', flexDirection: 'column' }}>
          <h3 style={{ marginBottom: '1.5rem' }}>7-Day Price Trend</h3>
          <div style={{ flex: 1, minHeight: '250px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <XAxis dataKey="time" hide />
                <YAxis domain={['auto', 'auto']} hide />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'var(--surface-color)', border: 'none', borderRadius: '8px', color: 'white' }}
                  itemStyle={{ color: 'var(--task2-color)', fontWeight: 'bold' }}
                />
                <Line type="monotone" dataKey="price" stroke="var(--task2-color)" strokeWidth={3} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="glass-panel" style={{ padding: '2rem' }}>
        <h3 style={{ marginBottom: '1.5rem' }}>About {data.name}</h3>
        <div style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }} dangerouslySetInnerHTML={{ __html: data.description.en || 'No description available.' }}></div>
      </div>
    </div>
  );
}
