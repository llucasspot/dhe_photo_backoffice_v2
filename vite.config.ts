import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

function build(relativePath: string) {
  return path.resolve(__dirname, relativePath);
}

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '#lib': build('src/lib'),
      '#assets': build('src/assets'),
      '#components': build('src/components'),
      '#features/auth': build('src/features/auth'),
      '#features/dashboard': build('src/features/dashboard'),
      '#features/home': build('src/features/home'),
      '#features/projects': build('src/features/projects'),
      '#features/schools': build('src/features/schools'),
      '#layout': build('src/layout'),
      '#lib/auth': build('src/lib/auth'),
      '#routes': build('src/routes'),
    },
  },
});