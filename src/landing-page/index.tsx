import { useEffect, useState } from 'react';
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
            backgroundImage: 'url("/public/bg1.jpg")',
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
        <FeedbackButton theme={theme} />
      </div>
    </div>
  );
}


// import { Button } from '@/components/ui/button';
// import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
// import { Menu, Moon, Search, Sun, X } from 'lucide-react';
// import { useEffect, useState } from 'react';

// export default function LandingPage() {
//   const [theme, setTheme] = useState('light');
//   const [isOpen, setIsOpen] = useState(false);

//   // Toggle between light and dark theme
//   const toggleTheme = () => {
//     setTheme(theme === 'light' ? 'dark' : 'light');
//   };

//   // Apply theme class to document when theme changes
//   useEffect(() => {
//     document.documentElement.classList.remove('light', 'dark');
//     document.documentElement.classList.add(theme);
//   }, [theme]);

//   return (
//     <div className={`min-h-screen ${theme === 'light' ? 'bg-green-50' : 'bg-gray-900'} transition-colors duration-300`}>
//       {/* Navigation */}
//       <nav className="container mx-auto px-4 py-6 flex items-center justify-between">
//         <div className="flex items-center">
//           <svg className="w-8 h-8 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//             <path d="M12 6a4 4 0 0 0-4 4v8h8v-8a4 4 0 0 0-4-4z" fill={theme === 'light' ? '#84cc16' : '#a3e635'} />
//             <path d="M12 4c0.6 0 1 0.4 1 1v1h-2V5c0-0.6 0.4-1 1-1z" fill={theme === 'light' ? '#84cc16' : '#a3e635'} />
//           </svg>
//           <span className={`text-xl font-bold ${theme === 'light' ? 'text-lime-500' : 'text-lime-400'}`}>Inviteloop</span>
//         </div>

//         {/* Desktop Navigation */}
//         <div className="hidden md:flex items-center space-x-6">
//           <a href="#features" className={`text-sm font-medium ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'} hover:text-lime-500`}>Features</a>
//           <a href="#docs" className={`text-sm font-medium ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'} hover:text-lime-500`}>Docs</a>
//           <button className={`rounded-full p-2 ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'} hover:bg-gray-200 dark:hover:bg-gray-700`}>
//             <Search size={20} />
//           </button>
//           <button
//             onClick={toggleTheme}
//             className={`rounded-full p-2 ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'} hover:bg-gray-200 dark:hover:bg-gray-700`}
//           >
//             {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
//           </button>
//         </div>

//         {/* Mobile Navigation */}
//         <div className="flex md:hidden items-center space-x-3">
//           <button
//             onClick={toggleTheme}
//             className={`rounded-full p-2 ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'} hover:bg-gray-200 dark:hover:bg-gray-700`}
//           >
//             {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
//           </button>

//           <Sheet open={isOpen} onOpenChange={setIsOpen}>
//             <SheetTrigger asChild>
//               <button className={`p-2 ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>
//                 <Menu size={24} />
//               </button>
//             </SheetTrigger>
//             <SheetContent side="right" className={theme === 'light' ? 'bg-white' : 'bg-gray-800'}>
//               <div className="flex flex-col h-full">
//                 <div className="flex justify-end mb-6">
//                   <button onClick={() => setIsOpen(false)}>
//                     <X size={24} className={theme === 'light' ? 'text-gray-700' : 'text-gray-300'} />
//                   </button>
//                 </div>
//                 <div className="flex flex-col space-y-6">
//                   <a
//                     href="#features"
//                     className={`text-lg font-medium ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'} hover:text-lime-500`}
//                     onClick={() => setIsOpen(false)}
//                   >
//                     Features
//                   </a>
//                   <a
//                     href="#docs"
//                     className={`text-lg font-medium ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'} hover:text-lime-500`}
//                     onClick={() => setIsOpen(false)}
//                   >
//                     Docs
//                   </a>
//                   <div className="flex items-center">
//                     <Search size={20} className="mr-2" />
//                     <span className={`text-lg font-medium ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>Search</span>
//                   </div>
//                 </div>
//               </div>
//             </SheetContent>
//           </Sheet>
//         </div>
//       </nav>

//       {/* Hero and Video Section Container - Flex on larger screens, stack on mobile */}
//       <div className="container mx-auto px-4 pb-16">
//         <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between lg:space-x-8">
//           {/* Hero Section - Left aligned on desktop */}
//           <div className="w-full lg:w-1/2 py-8 lg:py-16">
//             <div className="max-w-lg">
//               {/* Cactus Icon */}
//               <div className="mb-6">
//                 <div className="relative w-16 h-16">
//                   <div className="absolute inset-0 rounded-full bg-lime-300 dark:bg-lime-400"></div>
//                   <div className="absolute inset-0 flex items-center justify-center">
//                     <div className="w-8 h-10 bg-lime-500 dark:bg-lime-600 rounded-lg"></div>
//                   </div>
//                   <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
//                     <div className="w-3 h-3 bg-orange-300 dark:bg-orange-400 rounded-full"></div>
//                   </div>
//                   <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/4">
//                     <div className="w-10 h-2 bg-orange-400 dark:bg-orange-500 rounded-full"></div>
//                   </div>
//                 </div>
//               </div>

//               {/* Hero Text - Left aligned text */}
//               <h1 className={`text-4xl md:text-5xl font-bold mb-4 text-left ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
//                 Beautiful Digital Invitations<br />Designs in Minutes
//               </h1>
//               <p className={`text-base md:text-lg mb-8 text-left ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>
//                 Create stunning, personalized digital invitation cards for any occasion. Elegant, eco-friendly, and effortlessly delivered.
//               </p>

//               {/* CTA Button */}
//               <div className="mb-2">
//                 <Button
//                   className="bg-lime-200 hover:bg-lime-300 text-gray-800 text-base md:text-lg font-medium px-6 md:px-8 py-4 md:py-6 h-auto rounded-md shadow-md w-full md:w-auto"
//                 >
//                   Try Inviteloop for free
//                 </Button>
//               </div>
//               <p className="text-sm text-gray-500 dark:text-gray-400">No credit card required</p>
//             </div>
//           </div>

//           {/* Video Player Section - Right aligned on desktop */}
//           <div className="w-full lg:w-1/2 mt-8 lg:mt-0">
//             <div className="max-w-xl mx-auto lg:ml-auto lg:mr-0">
//               <div className="rounded-lg overflow-hidden shadow-xl bg-gradient-to-r from-purple-400 via-pink-400 to-orange-300 dark:from-purple-600 dark:via-pink-600 dark:to-orange-500 p-2 md:p-3">
//                 {/* Video Player */}
//                 <div className="bg-gray-900 rounded-lg overflow-hidden relative">
//                   {/* Video Content Area */}
//                   <div className="relative aspect-video w-full">
//                     {/* Video Placeholder - In a real implementation, this would be replaced with an actual video player */}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Feedback Button (fixed) */}
//       <div className="fixed bottom-4 right-4">
//         <Button
//           className={`rounded-full px-4 py-2 text-white ${theme === 'light' ? 'bg-gray-800' : 'bg-gray-700'} hover:bg-gray-700 dark:hover:bg-gray-600 flex items-center space-x-2`}
//         >
//           <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//             <path d="M20 2H4C2.9 2 2 2.9 2 4V22L6 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2ZM20 16H6L4 18V4H20V16Z" fill="currentColor" />
//           </svg>
//           <span>Feedback</span>
//         </Button>
//       </div>
//     </div>
//   );
// }



