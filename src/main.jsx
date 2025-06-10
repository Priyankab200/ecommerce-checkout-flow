import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'  // ✅ CSS फाईल import केली आहे

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
