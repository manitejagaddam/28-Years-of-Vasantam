import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/28-Years-of-Vasantam/',
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
