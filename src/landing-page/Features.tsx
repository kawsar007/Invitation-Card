import { CheckCircle, Edit, Globe, Home, Image, Mail } from 'lucide-react';

interface FeatureSectionProps {
  theme: string;
}

export default function FeaturesSection({ theme }: FeatureSectionProps) {
  const features = [
    {
      icon: <Image className="w-12 h-12" />,
      title: "Beautiful Designs",
      description: "Choose from hundreds of professionally designed templates for any occasion."
    },
    {
      icon: <Edit className="w-12 h-12" />,
      title: "Easy Customization",
      description: "Personalize every detail with our intuitive design editor. No design skills needed."
    },
    {
      icon: <Mail className="w-12 h-12" />,
      title: "Instant Delivery",
      description: "Send your invitations instantly via email, text, or social media with just a few clicks."
    },
    {
      icon: <CheckCircle className="w-12 h-12" />,
      title: "RSVP Tracking",
      description: "Manage guest responses and send reminders all in one place."
    },
    {
      icon: <Home className="w-12 h-12" />,
      title: "Event Websites",
      description: "Create a matching event website with all the details your guests need."
    },
    {
      icon: <Globe className="w-12 h-12" />,
      title: "Eco-Friendly",
      description: "Save trees and reduce your carbon footprint with paperless invitations."
    }
  ];

  return (
    <div id="features" className={`py-20 ${theme === 'light' ? 'bg-green-50' : 'bg-gray-900'} transition-colors duration-300`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className={`heading-primary mb-6 ${theme === 'light' ? 'text-gray-900' : 'text-white'
            }`}>
            Why Choose Our Digital Invitations
          </h2>
          <p className={`font-opensans text-lg sm:text-xl max-w-3xl mx-auto ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'
            }`}>
            Beautiful, customizable, and eco-friendly alternatives to traditional paper invitations.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`p-8 rounded-xl flex flex-col items-center text-center transform hover:scale-105 transition-all duration-300 cursor-pointer ${theme === 'light'
                ? 'bg-white shadow-lg hover:shadow-xl'
                : 'bg-gray-800 hover:bg-gray-750'
                }`}
            >
              <div className={`mb-6 ${theme === 'light' ? 'text-lime-600' : 'text-lime-400'
                }`}>
                {feature.icon}
              </div>
              <h3 className={`text-xl font-semibold mb-4 ${theme === 'light' ? 'text-gray-900' : 'text-white'
                }`}>
                {feature.title}
              </h3>
              <p className={
                theme === 'light' ? 'text-gray-600' : 'text-gray-300'
              }>
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}