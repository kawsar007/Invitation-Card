import DesignTemplate from './DesignTemplate';
import FeaturesSection from './Features';
import HeroSection from './HeroSection';
import HowItWorksSection from './HowItWorks';
import PricingSection from './Pricing';
import ScrollToTop from './ScrollToTop';
import TestimonialsSection from './Testimonial';
import VideoSection from './VideoSection';

interface LandingPageProps {
  theme: string;
  toggleTheme: () => void;
}

export default function LandingPage({ theme, toggleTheme }: LandingPageProps) {

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
          {/* <Navbar theme={theme} toggleTheme={toggleTheme} /> */}
          <HeroSection theme={theme} />
          <VideoSection theme={theme} />
        </div>
      </div>

      {/* Rest of the content without background image */}
      <div>
        <FeaturesSection theme={theme} />
        <DesignTemplate theme={theme} />

        <HowItWorksSection theme={theme} />
        <TestimonialsSection theme={theme} />
        <PricingSection theme={theme} />
        <ScrollToTop theme={theme} />
      </div>
    </div>
  );
}