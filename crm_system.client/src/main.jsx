import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { GoogleOAuthProvider } from '@react-oauth/google';

// Access environment variable
const clientId = import.meta.env.VITE_CLIENT_ID;

if (!clientId) {
  console.error('VITE_CLIENT_ID is not defined');
}
// console.log("CLIENT  "+clientId) 
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={clientId}>
      <App />
    </GoogleOAuthProvider>
  </React.StrictMode>
);
