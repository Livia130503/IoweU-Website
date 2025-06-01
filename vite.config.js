import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: 'index.html',
        kontakt: 'kontakt.html',
        impressum: 'impressum.html',
        datenschutz: 'datenschutz.html'
      }
    }
  }
});