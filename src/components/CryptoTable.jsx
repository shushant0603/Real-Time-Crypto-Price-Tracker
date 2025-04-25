import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectAllAssets } from '../features/crypto/cryptoSlice';
import { websocketService } from '../services/websocketService';
import PriceChart from './PriceChart';

const formatNumber = (num) => {
  if (num === null) return 'N/A';
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(num);
};

const formatLargeNumber = (num) => {
  if (num === null) return 'N/A';
  return new Intl.NumberFormat('en-US', {
    notation: 'compact',
    compactDisplay: 'short',
  }).format(num);
};

const formatPercentage = (num) => {
  return `${num > 0 ? '+' : ''}${num.toFixed(2)}%`;
};

const CryptoTable = () => {
  const assets = useSelector(selectAllAssets);

  useEffect(() => {
    websocketService.start();
    return () => websocketService.stop();
  }, []);

  const [likedIds, setLikedIds] = useState([]); // Track the IDs of liked stars

  const handleClick = (id) => {
    setLikedIds((prevLikedIds) =>
      prevLikedIds.includes(id)
        ? prevLikedIds.filter((likedId) => likedId !== id) // Remove ID if already liked
        : [...prevLikedIds, id] // Add ID if not already liked
    );
  };

  return (
    <div className="overflow-x-auto">
      <table className="h-screen w-full table-auto">
        <thead>
          <tr className="bg-gray-50 border-b border-gray-200">
            <th className="sticky top-0 px-6 py-8 text-center text-sm  font-semibold text-gray-500 uppercase tracking-wider"> </th>
            <th className="sticky top-0 px-6 py-8 text-right text-sm  font-semibold text-gray-500 uppercase tracking-wider">#</th>
            <th className="sticky top-0 px-6 py-4 text-left text-sm font-semibold text-gray-500 uppercase tracking-wider">Name</th>
            <th className="sticky top-0 px-6 py-4 text-left text-sm font-semibold text-gray-500 uppercase tracking-wider">Price</th>
            <th className="sticky top-0 px-6 py-4 text-center text-sm font-semibold text-gray-500 uppercase tracking-wider">1h %</th>
            <th className="sticky top-0 px-6 py-4 text-center text-sm font-semibold text-gray-500 uppercase tracking-wider">24h %</th>
            <th className="sticky top-0 px-6 py-4 text-center text-sm font-semibold text-gray-500 uppercase tracking-wider">7d %</th>
            <th className="sticky top-0 px-6 py-4 text-center gap-3 text-sm font-semibold text-gray-500 uppercase tracking-wider">
              Market Cap
              <span className="ml-2 text-gray-400 text-30  cursor-pointer hover:text-gray-600" title="The total market value of a cryptocurrency.">ⓘ</span>
            </th>
            <th className="sticky top-0 px-6 py-4 text-center text-sm font-semibold text-gray-500 uppercase tracking-wider">
              Volume(24h)
              <span className="ml-1 text-gray-400 cursor-pointer hover:text-gray-600" title="The total trading volume of the cryptocurrency in the last 24 hours.">ⓘ</span>
            </th>
            <th className="sticky top-0 px-6 py-4 text-center text-sm font-semibold text-gray-500 uppercase tracking-wider">
              Circulating Supply
              <span className="ml-1 text-gray-400 cursor-pointer hover:text-gray-600" title="The number of coins or tokens that are currently available in the market.">ⓘ</span>
            </th>
            {/* <th className="sticky top-0 px-6 py-4 text-center text-sm font-semibold text-gray-500 uppercase tracking-wider">Max Supply</th> */}
            <th className="sticky top-0 px-6 py-4 text-center text-sm font-semibold text-gray-500 uppercase tracking-wider">Last 7d</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-300">
          {assets.map((asset, index) => (

            <tr key={asset.id} className="hover:bg-gray-50 border-b  border-black-900">
              <td
              className="px-6 py-4 whitespace-nowrap text-30 text-gray-900 text-right cursor-pointer"
              onClick={() => handleClick(asset.id)} // Toggle the liked state
            >
              <span style={{ color: likedIds.includes(asset.id) ? '#EEDC82' : 'black' }}>☆</span>
            </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{index + 1}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <img className="h-8 w-8 rounded-full" src={asset.logo} alt={asset.name} />
                  <div className="ml-4 text-base flex gap-2.5">
                    <div className="text-sm text-center font-medium text-gray-900">{asset.name}</div>
                    <div className="text-sm text-center text-gray-500">{asset.symbol}</div>
                  </div>
                </div>
              </td>


              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-left">
                {formatNumber(asset.price)}
              </td>
              <td className={`px-6 py-4 whitespace-nowrap text-sm text-center ${asset.priceChange1h >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {formatPercentage(asset.priceChange1h)}
              </td>
              <td className={`px-6 py-4 whitespace-nowrap text-sm text-center ${asset.priceChange24h >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {formatPercentage(asset.priceChange24h)}
              </td>
              <td className={`px-6 py-4 whitespace-nowrap text-sm text-center ${asset.priceChange7d >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {formatPercentage(asset.priceChange7d)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center">
                {formatLargeNumber(asset.marketCap)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center">
                {formatLargeNumber(asset.volume24h)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center">
                {formatLargeNumber(asset.circulatingSupply)}
              </td>
              {/* <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">
                {formatLargeNumber(asset.maxSupply)}
              </td> */}
              <td className="px-6 py-4 whitespace-nowrap">
                <PriceChart
                  priceHistory={asset.priceHistory}
                  isPositive={asset.priceChange7d >= 0}
                />
              </td>
              {/* <table className="min-w-full divide-y divide-gray-200 border-b border-gray-900"></table> */}
            </tr>

          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CryptoTable; 