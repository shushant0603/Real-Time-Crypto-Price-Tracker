import { createSlice } from '@reduxjs/toolkit';

const createInitialAsset = (id, name, symbol, logo, price, priceChange1h, priceChange24h, priceChange7d, marketCap, volume24h, circulatingSupply, maxSupply) => ({
  id,
  name,
  symbol,
  logo,
  price,
  priceChange1h,
  priceChange24h,
  priceChange7d,
  marketCap,
  volume24h,
  circulatingSupply,
  maxSupply,
  priceHistory: [price], // Initialize price history with current price
});

const initialState = {
  assets: [
    createInitialAsset(
      1,
      'Bitcoin',
      'BTC',
      'bitcoin.png',
      65000,
      0.5,
      2.3,
      5.8,
      1250000000000,
      25000000000,
      19600000,
      21000000
    ),
    createInitialAsset(
      2,
      'Ethereum',
      'ETH',
      'ethereum.png',
      3200,
      -0.3,
      1.5,
      3.2,
      380000000000,
      15000000000,
      120000000,
      null
    ),
    createInitialAsset(
      3,
      'Tether',
      'USDT',
      'tether.png',
      1.00,
      0.01,
      0.02,
      0.03,
      80000000000,
      50000000000,
      80000000000,
      null
    ),
    createInitialAsset(
      4,
      'BNB',
      'BNB',
      'bnb.png',
      550,
      0.8,
      1.2,
      4.5,
      85000000000,
      2000000000,
      150000000,
      200000000
    ),
    createInitialAsset(
      5,
      'Solana',
      'SOL',
      'solana.png',
      120,
      -1.2,
      3.5,
      8.2,
      50000000000,
      3000000000,
      420000000,
      null
    ),
  ],
};

const MAX_PRICE_HISTORY = 50; // Keep last 50 price points

const cryptoSlice = createSlice({
  name: 'crypto',
  initialState,
  reducers: {
    updateAsset: (state, action) => {
      const { id, updates } = action.payload;
      const assetIndex = state.assets.findIndex(asset => asset.id === id);
      if (assetIndex !== -1) {
        // Update the asset with new values
        state.assets[assetIndex] = {
          ...state.assets[assetIndex],
          ...updates,
        };

        // Update price history if there's a new price
        if (updates.price !== undefined) {
          state.assets[assetIndex].priceHistory = [
            ...state.assets[assetIndex].priceHistory.slice(-(MAX_PRICE_HISTORY - 1)),
            updates.price
          ];
        }
      }
    },
  },
});

export const { updateAsset } = cryptoSlice.actions;

export const selectAllAssets = (state) => state.crypto.assets;
export const selectAssetById = (state, id) => 
  state.crypto.assets.find(asset => asset.id === id);

export default cryptoSlice.reducer; 