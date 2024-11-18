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
      '#di/domain': build('src/lib/di/src/domain'),
      '#di/infra': build('src/lib/di/src/infra'),
      '#di/react': build('src/lib/di/src/react'),
      '#di': build('src/lib/di/src'),
      '#routing/domain': build('src/features/_/routing/domain'),
      '#routing/infra': build('src/features/_/routing/infra'),
      '#routing/react': build('src/features/_/routing/react'),
      '#routing': build('src/features/_/routing'),
    },
  },
});
