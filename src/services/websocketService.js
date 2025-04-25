import { store } from '../store/store';
import { updateAsset } from '../features/crypto/cryptoSlice';

class WebSocketService {
  constructor() {
    this.interval = null;
  }

  start() {
    this.interval = setInterval(() => {
      this.simulateUpdates();
    }, 1500);
  }

  stop() {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
  }

  simulateUpdates() {
    const assets = store.getState().crypto.assets;
    assets.forEach(asset => {
      const updates = {
        price: this.generateRandomPrice(asset.price),
        priceChange1h: this.generateRandomPercentage(-2, 2),
        priceChange24h: this.generateRandomPercentage(-5, 5),
        priceChange7d: this.generateRandomPercentage(-10, 10),
        volume24h: this.generateRandomVolume(asset.volume24h),
      };

      store.dispatch(updateAsset({ id: asset.id, updates }));
    });
  }

  generateRandomPrice(currentPrice) {
    const change = (Math.random() * 0.02 - 0.01) * currentPrice;
    return Number((currentPrice + change).toFixed(2));
  }

  generateRandomPercentage(min, max) {
    return Number((Math.random() * (max - min) + min).toFixed(2));
  }

  generateRandomVolume(currentVolume) {
    const change = (Math.random() * 0.1 - 0.05) * currentVolume;
    return Math.round(currentVolume + change);
  }
}

export const websocketService = new WebSocketService(); 