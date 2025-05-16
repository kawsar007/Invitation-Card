import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { GoMoveToTop } from "react-icons/go";

interface ScrollToTopProps {
  theme: string;
}

export default function ScrollToTop({ theme }: ScrollToTopProps) {
  const [isVisible, setIsVisible] = useState(false);

  // Handle scroll event
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div className={`fixed bottom-4 right-4 transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}>
      <Button
        onClick={scrollToTop}
        className={`rounded-full h-8 w-8 px-4 py-2 text-white ${theme === 'light' ? 'bg-gray-800' : 'bg-gray-700'
          } hover:bg-gray-700 dark:hover:bg-gray-600 flex items-center space-x-2`}
      >
        <GoMoveToTop />
        {/* <span>Scroll To Top</span> */}
      </Button>
    </div>
  );
}