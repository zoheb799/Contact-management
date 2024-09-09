import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend } from 'chart.js';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend);

const fetchGlobalData = async () => {
  const res = await fetch('https://disease.sh/v3/covid-19/all');
  return res.json();
};

const fetchCountriesData = async () => {
  const res = await fetch('https://disease.sh/v3/covid-19/countries');
  return res.json();
};

const fetchHistoricalData = async () => {
  const res = await fetch('https://disease.sh/v3/covid-19/historical/all?lastdays=all');
  return res.json();
};

const Loader: React.FC = () => {
  return (
    <div className="loader-container">
      <div className="loader"></div>
    </div>
  );
};

const ChartsAndMaps: React.FC = () => {
    const { isLoading: isGlobalDataLoading } = useQuery({
        queryKey: ['globalData'],
        queryFn: fetchGlobalData,
      });
  
  const { data: countriesData, isLoading: isCountriesDataLoading } = useQuery({
    queryKey: ['countriesData'],
    queryFn: fetchCountriesData,
  });
  
  const { data: historicalData, isLoading: isHistoricalDataLoading } = useQuery({
    queryKey: ['historicalData'],
    queryFn: fetchHistoricalData,
  });

  const isLoading = isGlobalDataLoading || isCountriesDataLoading || isHistoricalDataLoading;

  const lineChartData = React.useMemo(() => {
    if (historicalData) {
      const dates = Object.keys(historicalData.cases);
      const cases = Object.values(historicalData.cases);
      return {
        labels: dates,
        datasets: [{
          label: 'COVID-19 Cases',
          data: cases,
          borderColor: '#007bff',
          backgroundColor: 'rgba(0, 123, 255, 0.2)',
          fill: true,
        }],
      };
    }
    return {
      labels: [],
      datasets: [],
    };
  }, [historicalData]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6 text-center">COVID-19 Dashboard</h1>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4 text-center md:text-left">Cases Over Time</h2>
            <div className="bg-white p-4 rounded shadow-lg">
              {lineChartData && (
                <Line
                  data={lineChartData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false, 
                    plugins: {
                      legend: { display: true },
                      tooltip: { callbacks: { label: (context) => `${context.dataset.label}: ${context.raw}` } },
                    },
                    scales: {
                      x: { ticks: { autoSkip: true, maxTicksLimit: 10 } },
                      y: { beginAtZero: true },
                    },
                  }}
                  height={300} 
                />
              )}
            </div>
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-4 text-center md:text-left">World Map</h2>
            <div className="bg-white p-4 rounded shadow-lg">
           <MapContainer
          center={[20, 0] as [number, number]} // Explicitly type the center prop
          zoom={2}
          style={{ height: '400px', width: '100%' }}
          className="rounded-md"
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' 
          />        {countriesData && countriesData.map((country: any) => (
                  <Marker
                    key={country.countryInfo._id}
                    position={[country.countryInfo.lat, country.countryInfo.long]}
                  >
                    <Popup>
                      <strong>{country.country}</strong><br />
                      Active Cases: {country.active}<br />
                      Recovered Cases: {country.recovered}<br />
                      Deaths: {country.deaths}
                    </Popup>
                  </Marker>
                ))}
              </MapContainer>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChartsAndMaps;
