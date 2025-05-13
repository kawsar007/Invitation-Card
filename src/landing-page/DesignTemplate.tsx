import { ArrowRight, ChevronRight } from "lucide-react";

interface DesignTemplateProps {
  theme: string;
}

interface InvitationDesign {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  eventType: string;
  eventDetails: string;
  eventDate: string;
  eventLocation?: string;
}

export default function DesignTemplate({ theme }: DesignTemplateProps) {

  const invitationDesigns: InvitationDesign[] = [
    {
      id: 'wedding',
      title: 'Elegant Wedding',
      description: 'A sophisticated design for your special day.',
      imageUrl: '/api/placeholder/300/200',
      eventType: 'WEDDING INVITATION',
      eventDetails: 'Sarah & Michael',
      eventDate: 'JUNE 15, 2025 • CHICAGO, IL'
    },
    {
      id: 'birthday',
      title: 'Birthday Bash',
      description: 'Celebrate another trip around the sun in style.',
      imageUrl: '/api/placeholder/300/200',
      eventType: 'BIRTHDAY CELEBRATION',
      eventDetails: 'Emma\'s 30th',
      eventDate: 'JULY 8, 2025 • 7:00 PM'
    },
    {
      id: 'housewarming',
      title: 'Housewarming',
      description: 'Welcome friends and family to your new home.',
      imageUrl: '/api/placeholder/300/200',
      eventType: 'You\'re Invited to Our',
      eventDetails: 'Housewarming Party',
      eventDate: 'AUGUST 20, 2025 • 4:00 PM'
    }
  ];

  return (
    <div className={`py-20 ${theme === 'light' ? 'bg-green-50' : 'bg-gray-900'} transition-colors duration-300`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 ${theme === 'light' ? 'text-gray-900' : 'text-white'
            }`}>
            Stunning Invitation Designs
          </h2>
          <p className={`text-lg sm:text-xl max-w-3xl mx-auto ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'
            }`}>
            Browse our collection of beautiful templates for every occasion.
          </p>
        </div>

        {/* Invitation Design Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {invitationDesigns.map((design) => (
            <div
              key={design.id}
              className={`rounded-xl overflow-hidden shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 ${theme === 'light' ? 'bg-white' : 'bg-gray-800'
                }`}
            >
              {/* Card Image Part */}
              <div className={`h-64 relative flex items-center justify-center ${theme === 'light' ? 'bg-lime-50' : 'bg-gray-700'
                }`}>
                <div className={`p-6 border mx-auto text-center w-4/5 max-w-xs rounded-lg ${theme === 'light'
                  ? 'bg-white border-lime-200'
                  : 'bg-gray-800 border-gray-600'
                  }`}>
                  <p className={`text-xs tracking-wider font-semibold mb-2 ${theme === 'light' ? 'text-lime-600' : 'text-lime-400'
                    }`}>{design.eventType}</p>
                  <p className={`text-lg font-medium mb-2 ${theme === 'light' ? 'text-gray-900' : 'text-white'
                    }`}>{design.eventDetails}</p>
                  <p className={`text-xs ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'
                    }`}>{design.eventDate}</p>
                </div>
              </div>

              {/* Card Content Part */}
              <div className="p-6">
                <h3 className={`text-xl font-semibold mb-2 ${theme === 'light' ? 'text-gray-900' : 'text-white'
                  }`}>
                  {design.title}
                </h3>
                <p className={`mb-4 ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'
                  }`}>
                  {design.description}
                </p>
                <a
                  href="#"
                  className={`inline-flex items-center ${theme === 'light'
                    ? 'text-lime-600 hover:text-lime-700'
                    : 'text-lime-400 hover:text-lime-300'
                    }`}
                >
                  Customize this design
                  <ChevronRight className="w-4 h-4 ml-1" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <button
            className={`px-8 py-4 rounded-lg inline-flex items-center font-medium transition-all duration-300 ${theme === 'light'
              ? 'bg-lime-200 text-gray-800 hover:bg-lime-300'
              : 'bg-lime-700 text-white hover:bg-lime-600'
              }`}
          >
            View All Designs
            <ArrowRight className="w-5 h-5 ml-2" />
          </button>
        </div>
      </div>
    </div>
  )
};