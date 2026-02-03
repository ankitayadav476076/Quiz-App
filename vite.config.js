import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  base: "/Quiz-App/", // Use this if you deploy on GitHub Pages under "Quiz-App" repo
  plugins: [react()],
});
