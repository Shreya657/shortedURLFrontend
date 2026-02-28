import { useNavigate } from "react-router-dom";
import './Home.css'

const Home = () => {
  const navigate = useNavigate();

  return (
   <div className='home-page'>
  <div className='glass-card'>
    <h1 className='main-title'>
      Meet <span className='brand-gradient'>Trimly</span> 
    </h1>
    <h2 className='sub-title'>Long links are so last season.</h2>
    
    <div className='description-box'>
      <p>
        Stop sharing cluttered, "hieroglyphic" URLs. We <strong>trim</strong> them down into clean, 
        powerful links that are easy to track and even easier to share. 
        Shorten your reach, expand your impact.
      </p>
    </div>
    
    <button className='cta-button' onClick={() => navigate("/url")}>
      Get Started — It's Free
    </button>
  </div>
</div>
  );
};

export default Home;