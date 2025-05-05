import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  root: '.',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
  resolve: {
    alias: [
      { find: "@/Api", replacement: "/src/api" },
      { find: "@/Components", replacement: "/src/components" },
    ],
  },
});
