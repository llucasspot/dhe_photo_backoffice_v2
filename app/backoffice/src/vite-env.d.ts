/// <reference types="vite/client" />
/// <reference types="vite/client" />

import { containerByEnv } from '@mygoodstack/di-react';

interface ViteTypeOptions {
  // By adding this line, you can make the type of ImportMetaEnv strict
  // to disallow unknown keys.
  // strictImportMetaEnv: unknown
}

interface ImportMetaEnv {
  readonly VITE_APP_ENV: keyof typeof containerByEnv;
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
