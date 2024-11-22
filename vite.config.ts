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
      '#features/dashboard/react': build('src/features/dashboard/react'),
      '#features/home/react': build('src/features/home/react'),
      '#features/projects': build('src/features/projects'),
      '#features/projects/i18n': build('src/features/projects/i18n'),
      '#features/projects/domain': build('src/features/projects/domain'),
      '#features/projects/infra': build('src/features/projects/infra'),
      '#features/projects/react': build('src/features/projects/react'),
      '#features/schools': build('src/features/schools'),
      '#features/schools/i18n': build('src/features/schools/i18n'),
      '#features/schools/domain': build('src/features/schools/domain'),
      '#features/schools/infra': build('src/features/schools/infra'),
      '#features/schools/react': build('src/features/schools/react'),
      '#features/settings/i18n': build('src/features/settings/i18n'),
      '#features/settings/domain': build('src/features/settings/domain'),
      '#features/settings/react': build('src/features/settings/react'),
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
