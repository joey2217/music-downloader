import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './utils/request'
import './index.css'
import 'antd/dist/antd.dark.css'
// import 'antd/dist/antd.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
