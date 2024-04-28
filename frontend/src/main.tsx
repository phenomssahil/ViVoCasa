import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'


ReactDOM.createRoot(document.getElementById('root')!)
.render(
  <React.StrictMode>
    <BrowserRouter>
    {/* <h1>{import.meta.env.VITE_SERVER_URL}peldpe</h1> */}
      <App/>
    </BrowserRouter>
  </React.StrictMode>,
)
