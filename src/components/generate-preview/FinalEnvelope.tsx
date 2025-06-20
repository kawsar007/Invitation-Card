import React, { useEffect, useState } from 'react';
import EnvelopeSidebar from './EnvelopeSidebar';

const FinalEnvelope: React.FC = () => {
  const [isEnvelopeOpen, setIsEnvelopeOpen] = useState<boolean>(false);
  const [imageUrl] = useState<string>("https://i.pinimg.com/originals/e0/ee/3c/e0ee3c89be2d8a9854eeb476ec423920.jpg");
  const [isImageVisible, setIsImageVisible] = useState<boolean>(false);

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
    <div className="min-h-screen">
      <style>{`
        html {
          font-size: clamp(16px, 2.5vw, 20px);
        }
        
        .cssletter {
          position: relative;
          width: calc(100% - 320px);
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          user-select: none;
          -webkit-user-select: none;
          margin: 30vh 0;
          padding: 1rem;
        }
        
        @media (max-width: 768px) {
          .cssletter {
            width: 100%;
            margin-right: 0;
            margin-bottom: 0;
          }
        }
        
        .envelope {
          position: relative;
          width: min(90vw, 300px);
          height: min(60vw, 200px);
          background: #FFE4B5;
          box-shadow: inset 0 0 30px -5px #CD853F, 0 0 50vw 0 #540000;
          transition: transform 0.3s ease;
        }
        
        @media (min-width: 650px) {
          .envelope {
            width: min(90vw, 600px);
            height: min(60vw, 400px);
          }
        }
        
        .envelope::before {
          content: "˚ʚ❤︎ɞ˚";
          font-size: clamp(3rem, 8vw, 5rem);
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
          bottom: min(8vw, 30px);
          top: auto;
        }
        
        @media (min-width: 650px) {
          .envelope-flap::before {
            bottom: min(15vw, 100px);
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
          width: clamp(50px, 12vw, 70px);
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
        
        @media (min-width: 650px) {
          .heart {
            width: clamp(100px, 20vw, 150px);
          }
        }
        
        .heart::before {
          content: "";
          display: block;
          position: absolute;
          width: clamp(50px, 12vw, 70px);
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
        
        @media (min-width: 650px) {
          .heart::before {
            width: clamp(100px, 20vw, 150px);
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
          font-size: clamp(1rem, 3vw, 1.5rem);
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
          left: 60%;
          transform: translate(-50%, -50%);
          max-width: 90vw;
          max-height: 80vh;
          z-index: 5;
          background: white;
          padding: 1rem;
          border-radius: 1rem;
          box-shadow: 0 20px 40px rgba(0,0,0,0.3);
          opacity: 0;
          transform: translate(-50%, -50%) scale(0.8);
          transition: all 0.4s ease;
          pointer-events: none;
        }
        
        .image-container.visible {
          opacity: 1;
          transform: translate(-50%, -50%) scale(1);
          pointer-events: all;
        }
        
        .image-container img {
          max-width: 100%;
          max-height: 70vh;
          object-fit: contain;
          border-radius: 0.5rem;
        }
        
        .sidebar {
          position: fixed;
          top: 0;
          right: 0;
          height: 100vh;
          width: 320px;
          // background: linear-gradient(135deg, #FFE4B5 0%, #DEB887 100%);
          z-index: 1000;
          // box-shadow: -2px 0 7px rgba(0,0,0,0.1);
          overflow-y: auto;
          border-left: 1px solid #EEEEEE;
        }
        
        @media (max-width: 768px) {
          .sidebar {
            position: static;
            width: 100%;
            height: auto;
            box-shadow: 0 -5px 15px rgba(0,0,0,0.1);
          }
        }
        
        .sidebar-content {
          padding: 2rem 1.5rem;
          height: 100%;
        }
        
        .sidebar-header {
          display: flex;
          justify-content: between;
          align-items: center;
          margin-bottom: 2rem;
          border-bottom: 2px solid #CD853F;
          padding-bottom: 1rem;
        }
        
        .sidebar-title {
          font-family: 'Dancing Script', serif;
          font-size: 1.8rem;
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
        
        .event-details {
          background: rgba(255,255,255,0.7);
          border-radius: 0.75rem;
          padding: 1.5rem;
          margin: 1rem 0;
          backdrop-filter: blur(10px);
        }
        
        .detail-item {
          display: flex;
          align-items: center;
          margin: 0.75rem 0;
          color: #5D4037;
        }
        
        .detail-item svg {
          margin-right: 0.75rem;
          color: #8B0000;
        }
        

        
        /* Small screen adjustments */
        @media (max-width: 480px) {
          .cssletter {
           width: 100%;
            margin: 10vh 0;
          }
          
          .sidebar-content {
            padding: 1.5rem 1rem;
          }
          
          .sidebar-title {
            font-size: 1.5rem;
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
            src={imageUrl}
            alt="Love letter invitation"
          />
        </div>
      </section>

      {/* Sidebar */}
      <div className="sidebar">
        <div className="sidebar-content">
          <EnvelopeSidebar />
        </div>
      </div>
    </div>
  );
};

export default FinalEnvelope;