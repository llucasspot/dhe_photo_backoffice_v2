import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { AuthProvider } from './lib/auth';
import { Router } from './routes/router.tsx';

import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <Router />
    </AuthProvider>
  </StrictMode>,
);
