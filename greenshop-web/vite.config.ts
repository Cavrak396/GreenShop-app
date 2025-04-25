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
      key: fs.readFileSync('../localhost-key.pem'),
      cert: fs.readFileSync('../localhost-cert.pem'),
    },
  },
});
