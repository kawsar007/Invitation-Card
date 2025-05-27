import { useTemplateCategories } from "@/hooks/useTemplateData";
import { isAuthenticated } from "@/utils/auth";
import { cardTemplates } from "@/utils/templates";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

interface TemplatePageProps {
  theme: string;
}

export default function TemplatesPage({ theme }: TemplatePageProps) {
  const auth = isAuthenticated();
  const templatesByCategory = useTemplateCategories(cardTemplates);

  // Get all templates from all categories and flatten them into a single array
  const allTemplates = Object.values(templatesByCategory).flat();

  // Select just the first 3 templates
  // const limitedTemplates = allTemplates.slice(0, 3);

  return (
    <div id="templates" className={`py-20 ${theme === 'light' ? 'bg-green-50' : 'bg-gray-900'} transition-colors duration-300`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className={`heading-primary mb-6 ${theme === 'light' ? 'text-gray-900' : 'text-white'
            }`}>
            Stunning Invitation Designs
          </h2>
          <p className={`font-opensans text-lg sm:text-xl max-w-3xl mx-auto ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'
            }`}>
            Browse our collection of beautiful templates for every occasion.
          </p>
        </div>

        {/* Featured Templates Section */}
        <div className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {allTemplates.map(template => (
              <div
                key={template.id}
                className={`rounded-xl overflow-hidden shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 ${theme === 'light' ? 'bg-white' : 'bg-gray-800'
                  }`}
              >
                {/* Template Preview - Responsive Container */}
                <div className={`relative w-full aspect-[3/4] ${theme === 'light' ? 'bg-lime-50' : 'bg-gray-700'
                  } overflow-hidden`}>
                  {/* Template Content Container - Using an iframe for proper rendering and isolation */}
                  <div className="absolute inset-0 w-full h-full p-4 flex items-center justify-center">
                    <div className="w-full h-full shadow-md overflow-hidden relative">
                      <iframe
                        title={template.name}
                        srcDoc={`
                          <!DOCTYPE html>
                          <html>
                          <head>
                            <meta name="viewport" content="width=device-width, initial-scale=1.0">
                            <style>
                              body, html {
                                margin: 0;
                                padding: 0;
                                height: 100%;
                                width: 100%;
                                overflow: hidden;
                              }
                              * {
                                box-sizing: border-box;
                              }
                              .template-container {
                                transform: scale(1);
                                transform-origin: center;
                                height: 100%;
                                width: 100%;
                              }
                            </style>
                          </head>
                          <body>
                            <div class="template-container">
                              ${template.content}
                            </div>
                          </body>
                          </html>
                        `}
                        className="w-full h-full border-0"
                        sandbox="allow-same-origin"
                      />
                    </div>
                  </div>
                </div>

                {/* Template Information */}
                <div className="p-6">
                  {/* <Link to={`/templates/${template.id}`} */}
                  <Link to={auth ? `/editor/${template.id}` : '/sign-in'}
                    className={`inline-flex items-center ${theme === 'light'
                      ? 'text-lime-600 hover:text-lime-700'
                      : 'text-lime-400 hover:text-lime-300'
                      }`}
                  >
                    Customize this design
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}



// interface TemplatePageProps {
//   theme: string;
// }
// const TemplatesPage = ({ theme }: TemplatePageProps) => {
//   return (
//     <div className="container mx-auto px-4 py-12 sm:py-16 md:py-24 lg:py-32">
//       {/* <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8"> */}
//       This is Template pages
//       {/* </div> */}
//     </div>
//   )
// }

// export default TemplatesPage;