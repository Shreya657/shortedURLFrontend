import React, { useState } from 'react'
import api from '../utils/api.js';
import { FiCopy } from 'react-icons/fi';
import './Link.css'
import LoadingSpinner from './LoadingSpinner.jsx';

const Link = () => {
  const [input, setInput] = useState({ originalUrl: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [copied, setCopied] = useState(false);
  const [expiredAt, setExpiredAt] = useState("");

  const handleChange = (e) => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  const handleShort = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await api.post('', input);
      setShortUrl(res.data.data.shortUrl); // save the short URL in state
      setInput({ originalUrl: "" }); // clear input field
      setExpiredAt(res.data.data.expiredAt); // save expiration time
      console.log(res.data);
      console.log(res.data.data.shortUrl);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to shorten link");
    } finally {
      setLoading(false);
    }
  }
    const handleCopy = () => {
    navigator.clipboard.writeText(shortUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // reset after 2 sec
    });
  };

  return (
    <div className='link-container'>
      <h1>Shorten Your Links in a Snap with Chota Kar! ✅</h1>
      <div className='input-container'>
        <form onSubmit={handleShort}>
      <input
        type="text"
        name="originalUrl"
        placeholder="Paste your link"
       
        value={input.originalUrl || ""}
        onChange={handleChange}
        required
      />
      <button type='submit'>Shorten Link</button>
      </form>
      </div>


      {loading && <LoadingSpinner />}

      <div className={shortUrl ? 'output-container' : ''}>
      {error &&!shortUrl&& <h3 style={{ color: 'red' }}>{error}</h3>}
      {shortUrl &&  (
        <h4 style={{ color: 'green' }}>
          Short URL state:              {<a style={{ paddingLeft: "20px" ,paddingRight: "20px"}} href={shortUrl} target="_blank" rel="noopener noreferrer">{shortUrl}</a>}
          
          
        </h4>
      )}
      {shortUrl && (
        <button onClick={handleCopy}><FiCopy style={{  fontSize: "19px", cursor: "pointer" ,border: "none",paddingLeft: "5px"}} /></button>
      )}
      {copied && <span style={{ color: "green" }}>Copied!</span>}
        



      
      </div>
      {expiredAt && (
        <p style={{ color: "yellow"  ,paddingTop: "30px"}}>Link expires at: {new Date(expiredAt).toLocaleString() || "N/A"}</p>
      )}

    </div>
  )
}

export default Link;
