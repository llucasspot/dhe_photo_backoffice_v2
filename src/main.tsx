import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import 'reflect-metadata';
import './features/app.module';

import { App } from './App';

import 'react-toastify/dist/ReactToastify.css';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
