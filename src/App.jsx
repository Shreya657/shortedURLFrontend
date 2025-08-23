import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter as Router, Routes, Route, useNavigate} from "react-router-dom"

import Home from './components/Home.jsx'
import Url from './components/Url.jsx'


function App() {
  

  return (
    
      <div>

      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/url" element={<Url/>} />
        </Routes>
      </Router>
      
    </div>
  )
}

export default App
