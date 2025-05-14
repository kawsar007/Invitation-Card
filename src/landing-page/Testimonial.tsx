
interface TestimonialSectionProps {
  theme: string;
}

interface Testimonial {
  quote: string;
  name: string;
  username: string;
  imageSrc: string;
  verified: boolean;
}

export default function TestimonialsSection({ theme }: TestimonialSectionProps) {
  const testimonials: Testimonial[] = [
    {
      quote: "Elegant Invites made our wedding planning so easy! The digital invites were beautiful, and guests loved the seamless RSVP tracking.",
      name: "Emily Green",
      username: "@emilyplants",
      imageSrc: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      verified: true
    },
    {
      quote: "As an event planner, Elegant Invites stands out with stunning designs and a user-friendly platform—my clients are always impressed!",
      name: "Sarah Ivy",
      username: "@sarahlovesplants",
      imageSrc: "https://images.pexels.com/photos/5234256/pexels-photo-5234256.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      verified: true
    },
    {
      quote: "I was unsure about digital invites, but Elegant Invites won me over with beautiful designs and big savings in time and cost.",
      name: "Lily Forrest",
      username: "@lilyforrest",
      imageSrc: "https://images.pexels.com/photos/8971793/pexels-photo-8971793.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      verified: true
    },
    {
      quote: "Elegant Invites made event planning so easy. Beautiful designs and effortless guest tracking!",
      name: "Michael Bloom",
      username: "@bloomingmichael",
      imageSrc: "https://images.pexels.com/photos/19664611/pexels-photo-19664611/free-photo-of-handsome-elegant-man-with-eyeglasses.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      verified: true
    },
    {
      quote: "Love how simple and stylish the platform is. My guests were truly impressed!",
      name: "Jake Stone",
      username: "@jakestone",
      imageSrc: "https://images.pexels.com/photos/5450575/pexels-photo-5450575.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      verified: true
    },
    {
      quote: "Quick, affordable, and gorgeous invitations—couldn’t have asked for more!",
      name: "Chris Fields",
      username: "@chrisfields",
      imageSrc: "https://images.pexels.com/photos/19676498/pexels-photo-19676498/free-photo-of-dark-portrait-of-an-adult-man-with-a-stubble.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      verified: true
    }
  ];

  return (
    <div className={`py-16 ${theme === 'light' ? 'bg-green-50' : 'bg-gray-900'} transition-colors duration-300`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className={`text-4xl sm:text-5xl font-bold mb-4 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
            Gardeners Love Inviteloop
          </h2>
          <p className={`text-lg max-w-3xl mx-auto ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>
            See what our community of 120k gardeners have to say about Inviteloop.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={index}
              testimonial={testimonial}
              theme={theme}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

interface TestimonialCardProps {
  testimonial: Testimonial;
  theme: string;
}

function TestimonialCard({ testimonial, theme }: TestimonialCardProps) {
  return (
    <div
      className={`p-6 rounded-lg ${theme === 'light'
        ? 'bg-white border border-gray-100 shadow-sm'
        : 'bg-gray-800 border border-gray-700'
        }`}
    >
      <p className={`mb-6 text-lg ${theme === 'light' ? 'text-gray-700' : 'text-gray-200'}`}>
        "{testimonial.quote}"
      </p>

      <div className="flex items-center">
        <div className="flex-shrink-0">
          <img
            src={testimonial.imageSrc}
            alt={testimonial.name}
            className="w-12 h-12 rounded-full object-cover"
          />
        </div>
        <div className="ml-3">
          <div className="flex items-center">
            <h3 className={`text-base font-medium ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
              {testimonial.name}
            </h3>
            {testimonial.verified && (
              <span className="ml-1 text-blue-500">
                <VerifiedBadge />
              </span>
            )}
          </div>
          <p className={`text-sm ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>
            {testimonial.username}
          </p>
        </div>
      </div>
    </div>
  );
}

function VerifiedBadge() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
      <path fillRule="evenodd" d="M8.603 3.799A4.49 4.49 0 0112 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 013.498 1.307 4.491 4.491 0 011.307 3.497A4.49 4.49 0 0121.75 12a4.49 4.49 0 01-1.549 3.397 4.491 4.491 0 01-1.307 3.497 4.491 4.491 0 01-3.497 1.307A4.49 4.49 0 0112 21.75a4.49 4.49 0 01-3.397-1.549 4.49 4.49 0 01-3.498-1.306 4.491 4.491 0 01-1.307-3.498A4.49 4.49 0 012.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 011.307-3.497 4.49 4.49 0 013.497-1.307zm7.007 6.387a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
    </svg>
  );
}