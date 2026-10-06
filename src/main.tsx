import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import './index.css';
import App from './App.tsx';
import { BeansProvider } from './BeansContext.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HashRouter>
      <BeansProvider>
        <App />
      </BeansProvider>
    </HashRouter>
  </StrictMode>,
);