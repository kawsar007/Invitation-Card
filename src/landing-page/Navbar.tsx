import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, Moon, Search, Sun, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

interface NavbarProps {
  theme: string;
  toggleTheme: () => void;
}

export default function Navbar({ theme, toggleTheme }: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Track scroll position for navbar effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when resizing to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Navigation items - can be expanded as needed
  const navItems = [
    { name: 'Features', href: '/features' },
    { name: 'Docs', href: '/docs' },
    { name: 'Pricing', href: '/pricing' },
    { name: 'Templates', href: '/templates' },
    // { name: 'Integrations', href: '#integrations' },
    // { name: 'Support', href: '#support' },
  ];

  const handleNavigation = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href === '/features') {
      e.preventDefault();
      const element = document.getElementById('features');
      if (element) {
        const offset = 80;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
      setIsMobileMenuOpen(false);
    } else if (href === '/templates') {
      e.preventDefault();
      const element = document.getElementById('templates');
      if (element) {
        const offset = 80;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
      setIsMobileMenuOpen(false);
    } else if (href === '/pricing') {
      e.preventDefault();
      const element = document.getElementById('pricing');
      if (element) {
        const offset = 80;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'py-2 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md' : 'py-4 bg-transparent'}`}>
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <svg className="w-8 h-8 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 6a4 4 0 0 0-4 4v8h8v-8a4 4 0 0 0-4-4z" fill={theme === 'light' ? '#84cc16' : '#a3e635'} />
            <path d="M12 4c0.6 0 1 0.4 1 1v1h-2V5c0-0.6 0.4-1 1-1z" fill={theme === 'light' ? '#84cc16' : '#a3e635'} />
          </svg>
          <span className={`text-xl font-bold ${theme === 'light' ? 'text-lime-500' : 'text-lime-400'}`}>InviteLoop</span>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              onClick={(e) => handleNavigation(e, item.href)}
              className={`text-sm font-medium ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'} hover:text-lime-500 transition-colors`}
            >
              {item.name}
            </Link>
          ))}

          <button className={`rounded-full p-2 ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'} hover:bg-gray-200 dark:hover:bg-gray-700`}>
            <Search size={20} />
          </button>
          <button
            onClick={toggleTheme}
            className={`rounded-full p-2 ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'} hover:bg-gray-200 dark:hover:bg-gray-700`}
          >
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <div className="flex md:hidden items-center space-x-3">
          <button
            onClick={toggleTheme}
            className={`rounded-full p-2 ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'} hover:bg-gray-200 dark:hover:bg-gray-700`}
          >
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
          </button>

          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <button className={`p-2 ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>
                <Menu size={24} />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className={theme === 'light' ? 'bg-white' : 'bg-gray-800'}>
              <div className="flex flex-col h-full">
                <div className="flex justify-between items-center mb-6">
                  <div className="flex items-center">
                    <svg className="w-8 h-8 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 6a4 4 0 0 0-4 4v8h8v-8a4 4 0 0 0-4-4z" fill={theme === 'light' ? '#84cc16' : '#a3e635'} />
                      <path d="M12 4c0.6 0 1 0.4 1 1v1h-2V5c0-0.6 0.4-1 1-1z" fill={theme === 'light' ? '#84cc16' : '#a3e635'} />
                    </svg>
                    <span className={`text-xl font-bold ${theme === 'light' ? 'text-lime-500' : 'text-lime-400'}`}>InviteLoop</span>
                  </div>
                  <button onClick={() => setIsMobileMenuOpen(false)}>
                    <X size={24} className={theme === 'light' ? 'text-gray-700' : 'text-gray-300'} />
                  </button>
                </div>

                <div className="flex-1 flex flex-col space-y-4">
                  {navItems.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={`py-3 px-4 rounded-lg text-lg font-medium ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'} hover:bg-gray-100 dark:hover:bg-gray-700`}
                      // onClick={() => setIsMobileMenuOpen(false)}
                      onClick={(e) => {
                        handleNavigation(e, item.href);
                      }}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>

                <div className="pt-6 pb-4">
                  <Button className="w-full bg-lime-200 hover:bg-lime-300 text-gray-800 text-lg font-medium py-6 h-auto rounded-md shadow-md">
                    Try InviteLoop for free
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}