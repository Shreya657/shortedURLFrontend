import React, { useState } from 'react'
import api from '../utils/api.js';
import { FiCopy, FiCheck, FiExternalLink } from 'react-icons/fi'; 
import './Link.css'
import LoadingSpinner from './LoadingSpinner.jsx';

const Url = () => {
  const [input, setInput] = useState({ originalUrl: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [copied, setCopied] = useState(false);
  const [expiredAt, setExpiredAt] = useState("");

  const handleChange = (e) => {
    setInput((prev) =>
       ({ ...prev, [e.target.name]: e.target.value }));
  }

  const handleShort = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setShortUrl(""); 
    try {
    //   const cleanData = {
    //   originalUrl: input.originalUrl.trim()
    // };
    // console.log("Submitting URL:", cleanData.originalUrl);
      const res = await api.post('/', input);
      setShortUrl(res.data.data.shortUrl);
      setInput({ originalUrl: "" });
      setExpiredAt(res.data.data.expiredAt);
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(shortUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className='link-page-wrapper'>
      <div className='link-card'>
        <h1 className='link-title'>Shorten URL</h1>
        <p className='link-subtitle'>Paste your long link below to get a clean, tiny version.</p>
        
        <form className='input-group' onSubmit={handleShort}>
          <input
            type="text"
            name="originalUrl"
            placeholder="https://example.com/very-long-link"
            value={input.originalUrl}
            onChange={handleChange}
            required
            autoComplete="off"
          />
          <button type='submit' disabled={loading}>
            {loading ? "Processing..." : "Trim Now"}
          </button>
        </form>

        {error && <div className='error-banner'>{error}</div>}
        
        {loading && <div className='loader-box'><LoadingSpinner /></div>}

        {shortUrl && (
          <div className='result-container animate-slide-up'>
            <div className='result-label'>Your Shortened Link</div>
            <div className='result-row'>
              <div className='url-display'>
                <span>{shortUrl}</span>
                <a href={shortUrl} target="_blank" rel="noopener noreferrer">
                  <FiExternalLink />
                </a>
              </div>
              <button className={`copy-btn ${copied ? 'copied' : ''}`} onClick={handleCopy}>
                {copied ? <FiCheck /> : <FiCopy />}
                <span>{copied ? "Copied" : "Copy"}</span>
              </button>
            </div>
            {expiredAt && (
              <p className='expiry-text'>
                Valid until: {new Date(expiredAt).toLocaleString('en-IN')}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default Url;