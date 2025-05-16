import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

interface FAQSectionProps {
  theme: string;
}

interface FAQItem {
  question: string;
  answer: string;
  isOpen: boolean;
}

export default function FAQSection({ theme }: FAQSectionProps) {
  const [faqItems, setFaqItems] = useState<FAQItem[]>([
    {
      question: "How does Invite Loop calculate people?",
      answer: "Each person (with or without email) added to the mailing list counts as (1) person. For example, “The Smith Family” of John, Jill, Tim, and Lauren would count as (4) people.",
      isOpen: true
    },
    {
      question: "What if I am unsure how many people I need?",
      answer: "In this case, we recommend purchasing a smaller package initially. You can then easily purchase additional people from within your mailing on an as needed basis.",
      isOpen: false
    },
    {
      question: "Can I send in multiple batches?",
      answer: "Greenvelope allows you to resend invitations or send invitations to new contacts at any time.",
      isOpen: false
    },
    {
      question: "What if I need multiple versions of my card?",
      answer: "The best way to set this up would be to have two different mailings. You will need to purchase a separate 'single mailing' package for each version.",
      isOpen: false
    },
    {
      question: "Do you offer RSVP tracking?",
      answer: "Yes! Greenvelope’s robust RSVP tracking makes planning effortless. You can collect RSVPs, track plus ones, gather meal selections, send RSVP reminders, set up seating charts, and more.",
      isOpen: false
    },
    {
      question: "Can I also send my invitations via text message?",
      answer: "In addition to email, you can send your Greenvelope invitations and cards via SMS text message, WhatsApp, Facebook messenger, or a sharable link.",
      isOpen: false
    },
    {
      question: "Do you offer digital thank you notes or save the dates?",
      answer: "Yes, in addition to our digital invitations and RSVP tracking, Greenvelope offers both save the dates and thank you notes. Each mailing type provides easy-to-use features, such as address collection on save the dates and individual customization for thank you notes.",
      isOpen: false
    },
    {
      question: "What if I need to update my invitation after I’ve sent it?",
      answer: "You can do that! One of the many benefits of digital invitations is that you can add additional information, update your card, or quickly follow-up with guests with ease.",
      isOpen: false
    },
    {
      question: "Can I send a sample to myself?",
      answer: "Yes! When you arrive at the 'Send' step after designing your mailing, your account information will automatically be added so you can easily send yourself a test and make sure everything looks exactly how you want it.",
      isOpen: false
    },
    {
      question: "What if I need help?",
      answer: "Our Help Center is always available to help guide you through the process and answer common questions. If you have additional questions, our in-house customer support team is available 7:30am - 5pm PST Monday through Friday via support@greenvelope.com or 888-505-2588.",
      isOpen: false
    }
  ]);

  const toggleFAQ = (index: number) => {
    const updatedFaqItems = [...faqItems];
    updatedFaqItems[index].isOpen = !updatedFaqItems[index].isOpen;
    setFaqItems(updatedFaqItems);
  };

  const bgColor = theme === "light" ? "bg-green-50" : "bg-gray-900";
  const textColor = theme === "light" ? "text-gray-900" : "text-gray-100";
  const borderColor = theme === "light" ? "border-gray-200" : "border-gray-700";
  // const hoverColor = theme === "light" ? "hover:bg-white" : "hover:bg-gray-800";

  return (
    <div id="faq" className={`min-h-screen w-full ${bgColor} ${textColor} transition-colors duration-300 p-4 sm:p-6 md:p-8`}>
      <div className="max-w-screen-lg mx-auto px-4 sm:px-6 lg:px-2">

        <div className="text-center mb-16">
          <h2 className={`heading-primary mb-6 ${theme === 'light' ? 'text-gray-900' : 'text-white'
            }`}>
            Frequently Asked Questions
          </h2>
          <p className={`font-opensans text-lg sm:text-xl max-w-3xl mx-auto ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'
            }`}>
            Get answers to your questions about transforming your garden with Gnomie.
          </p>
        </div>

        <div className="space-y-2">
          {faqItems.map((item, index) => (
            <div
              key={index}
              className={`border-b ${borderColor} transition-all duration-200`}
            >
              <button
                className={`w-full text-left p-4 flex justify-between items-center rounded-t-md transition-colors duration-200`}
                onClick={() => toggleFAQ(index)}
                aria-expanded={item.isOpen}
                aria-controls={`faq-answer-${index}`}
              >
                <span className="font-medium">{item.question}</span>
                {item.isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>

              {item.isOpen && (
                <div
                  id={`faq-answer-${index}`}
                  className="p-4 pt-0 animate-fadeIn"
                >
                  <p className={`pb-4 ${theme === "light" ? "text-gray-700" : "text-gray-300"}`}>
                    {item.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}