

interface Step {
  number: number;
  title: string;
  description: string;
}

interface HowItWorksProps {
  theme: string;
}
export default function HowItWorksSection({ theme }: HowItWorksProps) {

  const steps: Step[] = [
    {
      number: 1,
      title: "Choose a Design",
      description: "Browse our collection and select the perfect template for your occasion."
    },
    {
      number: 2,
      title: "Personalize",
      description: "Customize text, colors, and images to match your event's style."
    },
    {
      number: 3,
      title: "Send & Track",
      description: "Deliver your invitations and manage RSVPs all in one place."
    }
  ];

  return (
    <div className={`py-16 px-4 ${theme === 'light' ? 'bg-green-50' : 'bg-gray-900'} transition-colors duration-300`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className={`heading-primary mb-6 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
            How It Works
          </h2>
          <p className={`font-opensans text-xl max-w-3xl mx-auto ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>
            Create and send beautiful digital invitations in just a few simple steps.
          </p>
        </div>

        {/* Steps with connecting lines */}
        <div className="relative">
          {/* Connecting Lines */}
          <div className="hidden md:block absolute top-8 left-0 right-0 z-0">
            <div className="flex justify-between items-center px-8 mx-auto max-w-4xl">
              <div className={`h-px w-full ${theme === 'light' ? 'bg-gray-700' : 'bg-gray-300'}`}></div>
            </div>
          </div>

          {/* Steps */}
          <div className="flex flex-col md:flex-row justify-between items-start space-y-12 md:space-y-0 z-10 relative">
            {steps.map((step) => (
              <div key={step.number} className="flex-1 flex flex-col items-center text-center px-4">
                {/* Step Number Circle */}
                <div className={`flex items-center justify-center w-16 h-16 rounded-full mb-6 ${theme === 'light' ? 'bg-teal-400 text-gray-800' : 'bg-teal-700 text-white'
                  } text-2xl font-bold z-10`}>
                  {step.number}
                </div>

                {/* Step Title */}
                <h3 className={`text-xl font-semibold mb-4 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
                  {step.title}
                </h3>

                {/* Step Description */}
                <p className={`${theme === 'light' ? 'text-gray-600' : 'text-gray-300'} max-w-xs mx-auto`}>
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
};