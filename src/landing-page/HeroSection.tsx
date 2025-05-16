import { Button } from '@/components/ui/button';

interface HeroSectionProps {
  theme: string;
}

export default function HeroSection({ theme }: HeroSectionProps) {
  return (
    <div className="container mx-auto px-4 py-12 sm:py-16 md:py-24 lg:py-32 text-center">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Cactus Icon */}
        <div className="my-8 sm:mb-12 flex justify-center">
          <div className="relative w-16 h-16 sm:w-20 sm:h-20">
            <div className="absolute inset-0 rounded-full bg-lime-300 dark:bg-lime-400"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-8 h-10 bg-lime-500 dark:bg-lime-600 rounded-lg"></div>
            </div>
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="w-3 h-3 bg-orange-300 dark:bg-orange-400 rounded-full"></div>
            </div>
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/4">
              <div className="w-10 h-2 bg-orange-400 dark:bg-orange-500 rounded-full"></div>
            </div>
          </div>
        </div>

        {/* Hero Text */}
        <h1 className={`hero-heading mb-6 ${theme === 'light' ? 'text-gray-900' : 'text-white'
          }`}>
          Beautiful Digital Invitations
          <br className="hidden sm:block" />
          <span className="inline sm:inline-block">Designs in Minutes</span>
        </h1>

        <p className={`subheading-primary ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'
          }`}>
          Create stunning, personalized digital invitation cards for any occasion.
          Elegant, eco-friendly, and effortlessly delivered.
        </p>

        {/* CTA Button */}
        <div className="flex flex-col items-center space-y-4">
          <Button
            className="w-full sm:w-auto bg-lime-200 hover:bg-lime-300 active:bg-lime-400 
            text-gray-800 text-base sm:text-lg font-medium px-6 sm:px-8 py-4 sm:py-6 
            h-auto rounded-md shadow-md transition-all duration-200 
            hover:shadow-lg hover:scale-105 active:scale-100"
          >
            Try Envelope for free
          </Button>
          <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 font-medium">
            No credit card required
          </p>
        </div>
      </div>
    </div>
  );
}