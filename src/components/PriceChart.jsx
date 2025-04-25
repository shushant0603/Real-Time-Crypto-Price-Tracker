import React, { useEffect, useState } from 'react';

const PriceChart = ({ priceHistory = [], isPositive }) => {
  const [points, setPoints] = useState('');

  useEffect(() => {
    if (priceHistory.length < 2) return;

    // Normalize the data to fit in our SVG
    const minPrice = Math.min(...priceHistory);
    const maxPrice = Math.max(...priceHistory);
    const priceRange = maxPrice - minPrice || 1;

    // Create points for the polyline
    const graphPoints = priceHistory.map((price, index) => {
      const x = (index / (priceHistory.length - 1)) * 100;
      const y = 100 - ((price - minPrice) / priceRange) * 100;
      return `${x},${y}`;
    });

    setPoints(graphPoints.join(' '));
  }, [priceHistory]);

  return (
    <div className="w-[120px] h-[40px]">
      <svg
        className="w-full h-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <polyline
          points={points}
          fill="none"
          stroke={isPositive ? '#22c55e' : '#ef4444'}
          strokeWidth="2"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </div>
  );
};

export default PriceChart; 