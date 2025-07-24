import { FinalRSVPResponse } from '@/types/sendContact';
import { getAuthToken } from '@/utils/auth';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import EnvelopeSidebar from './EnvelopeSidebar';


const FinalEnvelope: React.FC = () => {
  const token = getAuthToken();
  const { rsvpId } = useParams();
  const [searchParams] = useSearchParams();
  const [isEnvelopeOpen, setIsEnvelopeOpen] = useState<boolean>(false);
  const [isImageVisible, setIsImageVisible] = useState<boolean>(false);

  const [rsvpData, setRsvpData] = useState<FinalRSVPResponse | null>(null);
  const [error, setError] = useState<string | null>(null);


  const apiUrl = `${import.meta.env.VITE_BASE_URL}/api/rsvp/${rsvpId}`;
  const emailHistoryId = searchParams.get('emailHistoryId');

  // Mark email as opened
  useEffect(() => {
    const markEmailAsOpened = async () => {
      if (emailHistoryId) {
        try {
          await axios.get(`${import.meta.env.VITE_BASE_URL}/api/email/track/${emailHistoryId}`);
          console.log(`Email marked as opened: ${emailHistoryId}`);
        } catch (err) {
          console.error('Error marking email as opened:', err);
        }
      }
    };
    markEmailAsOpened();
  }, [emailHistoryId]);


  useEffect(() => {
    const fetchRsvpData = async () => {
      try {
        const response = await fetch(apiUrl, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data = await response.json();
        setRsvpData(data);
      } catch (error) {
        setError('Failed to fetch RSVP data');
        console.error(error);
      }
    }

    fetchRsvpData();
  }, [apiUrl, token]);


  // Auto-open envelope with delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsEnvelopeOpen(true);
      // Show image after envelope opens
      setTimeout(() => {
        setIsImageVisible(true);
      }, 800);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);



  return (
    <div className="min-h-screen" style={{ height: '100vh', overflow: 'hidden' }}>
      <style>{`
        html, body {
  height: 100%;
  overflow: hidden;
  margin: 0;
  padding: 0;
  font-size: clamp(16px, 2.5vw, 20px);
}

.min-h-screen {
  height: 100vh;
  overflow: hidden;
  display: flex;
  flex-direction: row;
}

.cssletter {
  position: relative;
  flex: 1;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  user-select: none;
  -webkit-user-select: none;
  margin: 0;
  padding: 1rem;
  box-sizing: border-box;
  background-image: url('/public/bg-img/bg1.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  
  /* Optional: Add overlay for better contrast */
  // background-blend-mode: overlay;
  // background-color: rgba(.44, 24, 16, 0.7);
}

/* Mobile: Stack vertically */
@media (max-width: 768px) {
  .min-h-screen {
    flex-direction: column;
  }
  
  .cssletter {
    height: 60vh;
    min-height: 400px;
  }
}

/* Very small screens */
@media (max-width: 480px) {
  .cssletter {
    height: 50vh;
    min-height: 350px;
    padding: 0.5rem;
  }
}

/* Large screens */
@media (min-width: 1200px) {
  .cssletter {
    max-width: calc(100vw - 320px);
  }
}

.envelope {
  position: relative;
  width: min(85vw, 280px);
  height: min(55vw, 180px);
  background: #FFE4B5;
  box-shadow: inset 0 0 10px -5px #CD853F, 0 0 10px 0 #540000;
  transition: transform 0.3s ease;
  margin: 0 auto;
}

/* Tablet and larger screens */
@media (min-width: 768px) {
  .envelope {
    width: min(70vw, 450px);
    height: min(45vw, 300px);
  }
}

/* Large desktop screens */
@media (min-width: 1024px) {
  .envelope {
    width: min(60vw, 600px);
    height: min(40vw, 400px);
  }
}

/* Extra large screens */
@media (min-width: 1440px) {
  .envelope {
    width: min(50vw, 700px);
    height: min(35vw, 450px);
  }
}

.envelope::before {
  content: "˚ʚ❤︎ɞ˚";
  font-size: clamp(2rem, 6vw, 4rem);
  color: white;
  position: absolute;
  left: 50%;
  top: 30%;
  transform: translate(-50%, -50%);
  mix-blend-mode: soft-light;
}

.envelope-flap {
  width: 100%;
  height: 71%;
  position: absolute;
  top: 0;
  z-index: 3;
  overflow: hidden;
  transition: 1.2s ease-in-out all;
  transform-origin: top;
  pointer-events: all;
}

.envelope-folds {
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 2;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

.envelope-flap::before,
.envelope-left::before,
.envelope-right::before,
.envelope-bottom::before {
  content: "";
  transform: rotate(45deg);
  background: #FFE4B5;
  box-shadow: 0 0 30px -5px #CD853F;
  width: 100%;
  aspect-ratio: 1;
  display: block;
  position: absolute;
  top: 60%;
}

.envelope-flap::before {
  border-radius: 5rem;
  bottom: min(6vw, 25px);
  top: auto;
}

@media (min-width: 768px) {
  .envelope-flap::before {
    bottom: min(10vw, 60px);
  }
}

@media (min-width: 1024px) {
  .envelope-flap::before {
    bottom: min(8vw, 80px);
  }
}

.envelope-left::before {
  top: 10%;
  left: -65%;
}

.envelope-right::before {
  top: 10%;
  right: -65%;
}

.envelope-bottom::before {
  top: 60%;
  border-radius: 5rem;
}

.heart {
  z-index: 4;
  position: relative;
  box-shadow: none;
  border: none;
  width: clamp(40px, 10vw, 60px);
  aspect-ratio: 1;
  background: radial-gradient(circle at 60% 65%, #8B0000 64%, #0000 65%) top left/50% 50%,
      radial-gradient(circle at 40% 65%, #8B0000 64%, #0000 65%) top right/50% 50%,
      conic-gradient(from -45deg at 50% 85.5%, #8B0000 90deg, #0000 0) bottom/100% 50%;
  background-repeat: no-repeat;
  left: 50%;
  top: 70%;
  transform: translate(-50%, -50%);
  cursor: pointer;
  transition: all 0.3s ease;
  opacity: 1;
}

@media (min-width: 768px) {
  .heart {
    width: clamp(60px, 15vw, 100px);
  }
}

@media (min-width: 1024px) {
  .heart {
    width: clamp(80px, 18vw, 120px);
  }
}

.heart::before {
  content: "";
  display: block;
  position: absolute;
  width: clamp(40px, 10vw, 60px);
  aspect-ratio: 1;
  background: radial-gradient(circle at 60% 65%, #ffffff26 64%, #0000 65%) top left/50% 50%,
      radial-gradient(circle at 40% 65%, #ffffff26 64%, #0000 65%) top right/50% 50%,
      conic-gradient(from -45deg at 50% 85.5%, #ffffff26 90deg, #0000 0) bottom/100% 50%;
  background-repeat: no-repeat;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%) scale(0);
  transition: 0.3s ease all;
  z-index: -1;
}

@media (min-width: 768px) {
  .heart::before {
    width: clamp(60px, 15vw, 100px);
  }
}

@media (min-width: 1024px) {
  .heart::before {
    width: clamp(80px, 18vw, 120px);
  }
}

.heart:hover,
.heart:active,
.heart:focus {
  transform: translate(-50%, -50%);
  background-color: transparent;
  color: white;
}

.heart:hover::before,
.heart:active::before,
.heart:focus::before {
  transform: translate(-50%, -50%) scale(0.8);
}

.heart-text {
  transform: translateY(-10px);
  display: block;
  color: white;
  font-size: clamp(0.8rem, 2.5vw, 1.2rem);
  font-family: 'Dancing Script', serif;
}

.envelope.active * {
  pointer-events: none;
}

.envelope.active .envelope-flap {
  transform: rotateX(-180deg) translateY(0);
  perspective: 10px;
}

.envelope.active .envelope-flap::before {
  box-shadow: inset 0 0 30px -5px #CD853F;
}

.envelope.active .heart {
  opacity: 0;
  transform: translate(-50%, -50%) scale(0);
}

.image-container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-width: 85vw;
  max-height: 70vh;
  z-index: 5;
  background: white;
  padding: 0.5rem;
  border-radius: 0.5rem;
  box-shadow: 0 15px 30px rgba(0,0,0,0.3);
  opacity: 0;
  transform: translate(-50%, -50%) scale(0.8);
  transition: all 2s ease;
  pointer-events: none;
}

@media (min-width: 768px) {
  .image-container {
    max-width: 70vw;
    max-height: 75vh;
    padding: 1rem;
    border-radius: 1rem;
  }
}

@media (min-width: 1024px) {
  .image-container {
    max-width: 60vw;
    max-height: 80vh;
    left: 45%;
  }
}

.image-container.visible {
  opacity: 1;
  transform: translate(25%, -50%) scale(1);
  pointer-events: all;
}

.image-container img {
  max-width: 100%;
  max-height: 60vh;
  object-fit: contain;
  border-radius: 0.25rem;
}

@media (min-width: 768px) {
  .image-container img {
    max-height: 65vh;
    border-radius: 0.5rem;
  }
}

@media (min-width: 1024px) {
  .image-container img {
    max-height: 70vh;
  }
}

.sidebar {
  width: 320px;
  height: 100vh;
  // background: linear-gradient(135deg, #FFE4B5 0%, #DEB887 100%);
  z-index: 1000;
  box-shadow: -2px 0 7px rgba(0,0,0,0.1);
  overflow-y: auto;
  border-left: 1px solid #EEEEEE;
  flex-shrink: 0;
}

@media (max-width: 768px) {
  .sidebar {
    width: 100%;
    height: 40vh;
    min-height: 300px;
    box-shadow: 0 -5px 15px rgba(0,0,0,0.1);
    border-left: none;
    border-top: 1px solid #EEEEEE;
  }
}

@media (max-width: 480px) {
  .sidebar {
    height: 50vh;
    min-height: 250px;
  }
}

.sidebar-content {
  padding: 2rem 1.5rem;
  height: 100%;
  box-sizing: border-box;
}

@media (max-width: 768px) {
  .sidebar-content {
    padding: 1.5rem 1rem;
  }
}

@media (max-width: 480px) {
  .sidebar-content {
    padding: 1rem 0.75rem;
  }
}

.sidebar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  border-bottom: 2px solid #CD853F;
  padding-bottom: 1rem;
}

@media (max-width: 768px) {
  .sidebar-header {
    margin-bottom: 1rem;
    padding-bottom: 0.75rem;
  }
}

.sidebar-title {
  font-family: 'Dancing Script', serif;
  font-size: clamp(1.4rem, 4vw, 1.8rem);
  color: #8B0000;
  font-weight: 600;
}

.sidebar-image {
  width: 100%;
  max-width: 280px;
  margin: 1rem 0;
  border-radius: 0.75rem;
  box-shadow: 0 8px 20px rgba(0,0,0,0.15);
}

@media (max-width: 768px) {
  .sidebar-image {
    max-width: 200px;
    margin: 0.75rem 0;
  }
}

.event-details {
  background: rgba(255,255,255,0.7);
  border-radius: 0.75rem;
  padding: 1.5rem;
  margin: 1rem 0;
  backdrop-filter: blur(10px);
}

@media (max-width: 768px) {
  .event-details {
    padding: 1rem;
    margin: 0.75rem 0;
  }
}

@media (max-width: 480px) {
  .event-details {
    padding: 0.75rem;
  }
}

.detail-item {
  display: flex;
  align-items: center;
  margin: 0.75rem 0;
  color: #5D4037;
  font-size: clamp(0.9rem, 2.5vw, 1rem);
}

@media (max-width: 768px) {
  .detail-item {
    margin: 0.5rem 0;
  }
}

.detail-item svg {
  margin-right: 0.75rem;
  color: #8B0000;
  flex-shrink: 0;
}

@media (max-width: 480px) {
  .detail-item svg {
    margin-right: 0.5rem;
    width: 16px;
    height: 16px;
  }
}
      `}</style>

      <link href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400..700&display=swap" rel="stylesheet" />

      {/* Main Content */}
      <section className="cssletter">
        <div className={`envelope ${isEnvelopeOpen ? 'active' : ''}`}>
          <div className="heart absolute">
            <span className="heart-text">♥</span>
          </div>
          <div className="envelope-flap"></div>
          <div className="envelope-folds">
            <div className="envelope-left"></div>
            <div className="envelope-right"></div>
            <div className="envelope-bottom"></div>
          </div>
        </div>

        <div className={`image-container ${isImageVisible ? 'visible' : ''}`}>
          <img
            src={rsvpData?.invitation_card?.image_url}
            alt="Love letter invitation"
          />
        </div>
      </section>

      {/* Sidebar */}
      <div className="sidebar">
        <div className="sidebar-content">
          <EnvelopeSidebar rsvpData={rsvpData} />
        </div>
      </div>
    </div>
  );
};

export default FinalEnvelope;