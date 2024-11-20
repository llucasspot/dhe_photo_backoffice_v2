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
      '#features/auth/i18n': build('src/features/auth/i18n'),
      '#features/auth/domain': build('src/features/auth/domain'),
      '#features/auth/react': build('src/features/auth/react'),
      '#features/dashboard': build('src/features/dashboard'),
      '#features/home': build('src/features/home'),
      '#features/projects': build('src/features/projects'),
      '#features/schools': build('src/features/schools'),
      '#features/settings': build('src/features/settings'),
      '#features/settings/i18n': build('src/features/settings/i18n'),
      '#layout': build('src/layout'),
      '#di/domain': build('src/lib/di/src/domain'),
      '#di/infra': build('src/lib/di/src/infra'),
      '#di/react': build('src/lib/di/src/react'),
      '#di': build('src/lib/di/src'),
      '#i18n/domain': build('src/features/_/i18n/src/domain'),
      '#i18n/infra': build('src/features/_/i18n/src/infra'),
      '#i18n/react': build('src/features/_/i18n/src/react'),
      '#i18n': build('src/features/_/i18n/src'),
      '#routing/domain': build('src/features/_/routing/domain'),
      '#routing/infra': build('src/features/_/routing/infra'),
      '#routing/react': build('src/features/_/routing/react'),
      '#routing': build('src/features/_/routing'),
      '#core/domain': build('src/features/_/core/domain'),
      '#core/react': build('src/features/_/core/react'),
    },
  },
});
