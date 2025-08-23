import React from 'react'
import { useNavigate, useNavigation } from 'react-router-dom';
import './Home.css'

const Home = () => {
    const navigate = useNavigate()
  return (
    <div className='home-container'>
      <h1>Welcome to : Chota Kar🚀</h1>
      <h2>Because ain’t nobody got time for long links!</h2>
      <div className='intro'>
      <p>Tired of sharing links that look like they were written in hieroglyphics?<br /> We “chota kar” them for you! Tiny links, big impact. Share faster, scroll smoother, and flex your link game.</p>
      </div>
      <button onClick={() => navigate("/url")}>get started</button>
    </div>
  )
}

export default Home
