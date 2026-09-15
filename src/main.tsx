import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { injectSpeedInsights } from '@vercel/speed-insights';

// Initialize Vercel Speed Insights globally
injectSpeedInsights();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
