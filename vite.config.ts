import react from '@vitejs/plugin-react';
import dotenv from 'dotenv';
import path from 'path';
import { defineConfig } from 'vite';

function build(relativePath: string) {
  return path.resolve(__dirname, relativePath);
}

dotenv.config();

// TODO
const basepath = process.env.VITE_BASE_PATH ?? '/';
console.log('basepath : ', basepath);

// TODO
const nodeenv = process.env.NODE_ENV;
console.log('nodeenv : ', nodeenv);

export default defineConfig({
  plugins: [react()],
  base: basepath,
  server: {
    host: '0.0.0.0',
    port: 3001,
  },
  resolve: {
    alias: {
      '#lib': build('src/lib'),
      '#assets': build('src/assets'),
      '#components': build('src/components'),
      '#features/auth/i18n': build('src/features/auth/i18n'),
      '#features/auth/domain': build('src/features/auth/domain'),
      '#features/auth/react': build('src/features/auth/react'),
      '#features/auth/use-cases': build('src/features/auth/use-cases'),
      '#features/dashboard/react': build('src/features/dashboard/react'),
      '#features/home/react': build('src/features/home/react'),
      '#features/products/i18n': build('src/features/products/i18n'),
      '#features/products/domain': build('src/features/products/domain'),
      '#features/products/infra': build('src/features/products/infra'),
      '#features/products/react': build('src/features/products/react'),
      '#features/products/use-cases': build('src/features/products/use-cases'),
      '#features/projects/i18n': build('src/features/projects/i18n'),
      '#features/projects/domain': build('src/features/projects/domain'),
      '#features/projects/infra': build('src/features/projects/infra'),
      '#features/projects/react': build('src/features/projects/react'),
      '#features/projects/use-cases': build('src/features/projects/use-cases'),
      '#features/schools/i18n': build('src/features/schools/i18n'),
      '#features/schools/domain': build('src/features/schools/domain'),
      '#features/schools/infra': build('src/features/schools/infra'),
      '#features/schools/react': build('src/features/schools/react'),
      '#features/schools/use-cases': build('src/features/schools/use-cases'),
      '#features/settings/i18n': build('src/features/settings/i18n'),
      '#features/settings/domain': build('src/features/settings/domain'),
      '#features/settings/react': build('src/features/settings/react'),
      '#features/students/i18n': build('src/features/students/i18n'),
      '#features/students/domain': build('src/features/students/domain'),
      '#features/students/infra': build('src/features/students/infra'),
      '#features/students/react': build('src/features/students/react'),
      '#features/students/use-cases': build('src/features/students/use-cases'),
      '#features/klasses/i18n': build('src/features/klasses/i18n'),
      '#features/klasses/domain': build('src/features/klasses/domain'),
      '#features/klasses/infra': build('src/features/klasses/infra'),
      '#features/klasses/react': build('src/features/klasses/react'),
      '#features/klasses/use-cases': build('src/features/klasses/use-cases'),
      '#features/files/i18n': build('src/features/files/i18n'),
      '#features/files/domain': build('src/features/files/domain'),
      '#features/files/infra': build('src/features/files/infra'),
      '#features/files/react': build('src/features/files/react'),
      '#layout': build('src/layout'),
      '#di/domain': build('src/lib/di/src/domain'),
      '#di/react': build('src/lib/di/src/react'),
      '#di': build('src/lib/di/src'),
      '#i18n/domain': build('src/features/_/i18n/src/domain'),
      '#i18n/react': build('src/features/_/i18n/src/react'),
      '#i18n': build('src/features/_/i18n/src'),
      '#routing/domain': build('src/features/_/routing/domain'),
      '#routing/react': build('src/features/_/routing/react'),
      '#routing': build('src/features/_/routing'),
      '#class-transformer': build('libs/class-transformer'),
      '#@nestjs/common': build('libs/@nestjs/common'),
      '#@nestjs/mapped-types': build('libs/@nestjs/mapped-types'),
      '#core/domain': build('src/features/_/core/domain'),
      '#core/infra': build('src/features/_/core/infra'),
      '#core/react': build('src/features/_/core/react'),
      '#toast/domain': build('src/features/_/toast/domain'),
      '#toast/react': build('src/features/_/toast/react'),
      '#toast': build('src/features/_/toast'),
      '#mock': build('src/features/_/mock'),
      '#mock/domain': build('src/features/_/mock/domain'),
      '#mock/infra': build('src/features/_/mock/infra'),
      '#api': build('src/features/_/api'),
      '#state/domain': build('src/features/_/state/domain'),
      '#state/modules': build('src/features/_/state/modules'),
      '#state/react': build('src/features/_/state/react'),
      '#storage/domain': build('src/features/_/storage/domain'),
      '#storage/modules': build('src/features/_/storage/modules'),
      '#action/domain': build('src/features/_/action/domain'),
      '#action/react': build('src/features/_/action/react'),
      '#cache': build('src/features/_/cache'),
      '#cache/domain': build('src/features/_/cache/domain'),
    },
  },
});
