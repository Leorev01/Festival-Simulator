// src/main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { FestivalProvider } from './context/FestivalContext.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <FestivalProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </FestivalProvider>
  </React.StrictMode>
);
