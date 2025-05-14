import { CircleCheck } from 'lucide-react';
import { useState } from 'react';

export default function PricingSection({ theme }) {
  const [billingCycle, setBillingCycle] = useState('annually');

  return (
    <div className={`py-20 ${theme === 'light' ? 'bg-green-50' : 'bg-gray-900'} transition-colors duration-300`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 ${theme === 'light' ? 'text-gray-900' : 'text-white'
            }`}>
            Affordable Plans for Every Gardener
          </h2>
          <p className={`text-lg sm:text-xl max-w-3xl mx-auto ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'
            }`}>
            Choose the plan that works best for your event needs.
          </p>
        </div>

        {/* Billing Toggle */}
        <div className="flex justify-center mb-12">
          <div className={`${theme === 'light' ? 'bg-gray-100' : 'bg-lime-700 text-white'} rounded-full p-1 flex`}>

            <button
              className={`px-6 py-2 rounded-full text-sm transition-all duration-300 ${billingCycle === 'monthly'
                ? theme === 'light'
                  ? 'bg-white text-gray-900 shadow-md'
                  : 'bg-gray-700 text-white shadow-md'
                : theme === 'light'
                  ? 'text-gray-600'
                  : 'text-gray-400'
                }`}
              onClick={() => setBillingCycle('monthly')}
            >
              Monthly
            </button>
            <button
              className={`px-6 py-2 rounded-full text-sm transition-all duration-300 ${billingCycle === 'annually'
                ? theme === 'light'
                  ? 'bg-green-400 text-white'
                  : 'bg-green-400 text-white'
                : theme === 'light'
                  ? 'text-gray-600'
                  : 'text-gray-400'
                }`}
              onClick={() => setBillingCycle('annually')}
            >
              Annually
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {/* Basic Plan */}
          <div className="border rounded-lg p-8">
            <h2 className={`text-xl font-semibold mb-4 ${theme === 'light' ? 'text-gray-900' : 'text-white'
              }`}>Basic</h2>
            <p className={`
              ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'} mb-6
            `}>
              Use up to 5 photos per months and generate 60 garden variations
            </p>

            <div className="mb-6">
              <span className="text-4xl font-bold">$29</span>
              <span className="text-gray-500">/year</span>
            </div>

            <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 py-3 rounded mb-6">
              Get started
            </button>

            <ul className="space-y-3">
              <li className="flex items-center">
                <CircleCheck className="h-5 w-5 text-gray-500 mr-2" />
                <span>Up to 50 guests</span>
              </li>
              <li className="flex items-center">
                <CircleCheck className="h-5 w-5 text-gray-500 mr-2" />
                <span>Basic design templates</span>
              </li>
              <li className="flex items-center">
                <CircleCheck className="h-5 w-5 text-gray-500 mr-2" />
                <span>RSVP tracking</span>
              </li>
              <li className="flex items-center">
                <CircleCheck className="h-5 w-5 text-gray-500 mr-2" />
                <span>Email support</span>
              </li>
            </ul>
          </div>

          {/* Premium Plan */}
          <div className={`border rounded-lg p-8 ${theme === 'light' ? 'bg-gray-100' : 'bg-gray-800'} `}>
            <h2 className={`text-xl font-semibold mb-4 ${theme === 'light' ? 'text-gray-900' : 'text-white'
              }`}>Premium</h2>
            <p className={`
              ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'} mb-6
            `}>
              Use up to 10 photos per months and generate 200 garden variations
            </p>

            <div className="mb-6">
              <span className="text-4xl font-bold">$49</span>
              <span className="text-gray-500">/year</span>
            </div>

            <button className="w-full bg-green-400 hover:bg-green-500 text-white py-3 rounded mb-6">
              Get started
            </button>

            <ul className="space-y-3">
              <li className="flex items-center">
                <CircleCheck className="h-5 w-5 text-gray-500 mr-2" />
                <span>Up to 150 guests</span>
              </li>
              <li className="flex items-center">
                <CircleCheck className="h-5 w-5 text-gray-500 mr-2" />
                <span>All design templates</span>
              </li>
              <li className="flex items-center">
                <CircleCheck className="h-5 w-5 text-gray-500 mr-2" />
                <span>Advanced RSVP features</span>
              </li>
              <li className="flex items-center">
                <CircleCheck className="h-5 w-5 text-gray-500 mr-2" />
                <span>Custom event website</span>
              </li>
              <li className="flex items-center">
                <CircleCheck className="h-5 w-5 text-gray-500 mr-2" />
                <span>Priority support</span>
              </li>
            </ul>
          </div>

          {/* Professional Plan */}
          <div className="border rounded-lg p-8">
            <h2 className={`text-xl font-semibold mb-4 ${theme === 'light' ? 'text-gray-900' : 'text-white'
              }`}>Professional</h2>
            <p className={`
              ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'} mb-6
            `}>
              Use up to 5 photos per months and generate 60 garden variations
            </p>

            <div className="mb-6">
              <span className="text-4xl font-bold">$99</span>
              <span className="text-gray-500">/year</span>
            </div>

            <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 py-3 rounded mb-6">
              Get started
            </button>

            <ul className="space-y-3">
              <li className="flex items-center">
                <CircleCheck className="h-5 w-5 text-gray-500 mr-2" />
                <span>Unlimited guests</span>
              </li>
              <li className="flex items-center">
                <CircleCheck className="h-5 w-5 text-gray-500 mr-2" />
                <span>Premium design templates</span>
              </li>
              <li className="flex items-center">
                <CircleCheck className="h-5 w-5 text-gray-500 mr-2" />
                <span>Custom design assistance</span>
              </li>
              <li className="flex items-center">
                <CircleCheck className="h-5 w-5 text-gray-500 mr-2" />
                <span>Advanced event website</span>
              </li>
              <li className="flex items-center">
                <CircleCheck className="h-5 w-5 text-gray-500 mr-2" />
                <span>Dedicated support manager</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}