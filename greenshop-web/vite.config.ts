import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import compression from 'vite-plugin-compression';
import fs from 'fs';

export default defineConfig({
  plugins: [
    react(),
    compression({
      algorithm: 'gzip',
      threshold: 10240,
      deleteOriginFile: false,
    }),
  ],
  server: {
    https: {
      key: fs.readFileSync('C:/Users/Cavrak/Desktop/GreenShop-app/localhost-key.pem'),
      cert: fs.readFileSync('C:/Users/Cavrak/Desktop/GreenShop-app/localhost-cert.pem'),
    },
  },
});
