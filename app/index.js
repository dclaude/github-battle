// use CommonJS module system (instead of ES6 import)
import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './components/App'

if (process.env.NODE_ENV !== 'production') {
  console.log('Looks like we are in development mode');
}

ReactDOM.render(
  <App />, 
  document.getElementById('app'))

