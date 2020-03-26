import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

// Componentes são funções que retornam html
// Renderiza o Componente App.js no index.html
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
