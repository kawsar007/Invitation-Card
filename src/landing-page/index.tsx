import { useEffect, useState } from 'react';
import DesignTemplate from './DesignTemplate';
import FeaturesSection from './Features';
import FeedbackButton from './FeedbackButton';
import HeroSection from './HeroSection';
import Navbar from './Navbar';
import VideoSection from './VideoSection';

export default function LandingPage() {
  const [theme, setTheme] = useState('light');

  // Toggle between light and dark theme
  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  // Apply theme class to document when theme changes
  useEffect(() => {
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(theme);
  }, [theme]);

  return (
    <div className={`min-h-screen ${theme === 'light' ? 'bg-green-50' : 'bg-gray-900'} transition-colors duration-300`}>
      {/* Main content wrapper */}
      <div className="relative">
        {/* Background Image with Gradient Overlay - Only covers hero section */}
        <div
          className="absolute top-0 left-0 right-0 bg-cover bg-center bg-no-repeat"
          style={{
            // backgroundImage: 'url("/public/bg1.jpg")',
            filter: theme === 'light' ? 'brightness(0.9)' : 'brightness(0.4)',
            height: '100%',
            // zIndex: -1,
          }}
        />

        {/* Content that should have background */}
        <div className="relative">
          <Navbar theme={theme} toggleTheme={toggleTheme} />
          <HeroSection theme={theme} />
          <VideoSection theme={theme} />
        </div>
      </div>

      {/* Rest of the content without background image */}
      <div>
        <FeaturesSection theme={theme} />
        <DesignTemplate theme={theme} />
        <FeedbackButton theme={theme} />
      </div>
    </div>
  );
}