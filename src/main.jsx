import React from 'react'
import ReactDOM from 'react-dom/client'
import { useState } from 'react'
import App from './App'
import Admin from './Admin'
import './index.css'

function Router() {
  const [currentPage, setCurrentPage] = useState(
    window.location.pathname === '/admin' ? 'admin' : 'login'
  )

  const navigate = (page) => {
    setCurrentPage(page)
    window.history.pushState({}, '', page === 'admin' ? '/admin' : '/')
  }

  return (
    <>
      {currentPage === 'admin' ? <Admin /> : <App navigate={navigate} />}
    </>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router />
  </React.StrictMode>,
)
