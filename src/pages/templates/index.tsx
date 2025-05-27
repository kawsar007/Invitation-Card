// ==================== UPDATED DESIGN TEMPLATE COMPONENT ====================
// File: components/DesignTemplate.tsx

import { useTemplateCategories } from "@/hooks/useTemplateData";
import { isAuthenticated } from "@/utils/auth";
import { cardTemplates } from "@/utils/templates";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { EventModalTrigger } from "./EventModalTrigger";

// ==================== TYPES ====================
interface DesignTemplateProps {
  theme: string;
}

interface Template {
  id: string;
  name: string;
  content: string;
}

// ==================== STYLES ====================
const getThemeStyles = (theme: string) => ({
  container: `py-20 ${theme === 'light' ? 'bg-green-50' : 'bg-gray-900'} transition-colors duration-300`,
  heading: `heading-primary mb-6 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`,
  subtitle: `font-opensans text-lg sm:text-xl max-w-3xl mx-auto ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`,
  templateCard: `rounded-xl overflow-hidden shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 ${theme === 'light' ? 'bg-white' : 'bg-gray-800'}`,
  templatePreview: `relative w-full aspect-[3/4] ${theme === 'light' ? 'bg-lime-50' : 'bg-gray-700'} overflow-hidden`,
  customizeButton: `${theme === 'light' ? 'text-lime-600 hover:text-lime-700' : 'text-lime-400 hover:text-lime-300'}`,
  viewAllButton: `px-8 py-4 rounded-lg inline-flex items-center font-medium transition-all duration-300 ${theme === 'light' ? 'bg-teal-500 text-gray-800 hover:bg-teal-400' : 'bg-teal-700 text-white hover:bg-teal-600'}`,
});

// ==================== UTILITY FUNCTIONS ====================
const createTemplateIframe = (template: Template) => `
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
`;

// ==================== SUB-COMPONENTS ====================
const SectionHeader = ({ theme }: { theme: string }) => {
  const styles = getThemeStyles(theme);

  return (
    <div className="text-center mb-16">
      <h2 className={styles.heading}>
        Stunning Invitation Designs
      </h2>
      <p className={styles.subtitle}>
        Browse our collection of beautiful templates for every occasion.
      </p>
    </div>
  );
};

const TemplatePreview = ({ template, theme }: { template: Template; theme: string }) => {
  const styles = getThemeStyles(theme);

  return (
    <div className={styles.templatePreview}>
      <div className="absolute inset-0 w-full h-full p-4 flex items-center justify-center">
        <div className="w-full h-full shadow-md overflow-hidden relative">
          <iframe
            title={template.name}
            srcDoc={createTemplateIframe(template)}
            className="w-full h-full border-0"
            sandbox="allow-same-origin"
          />
        </div>
      </div>
    </div>
  );
};

const TemplateCard = ({
  template,
  theme,
  isAuthenticated
}: {
  template: Template;
  theme: string;
  isAuthenticated: boolean;
}) => {
  const styles = getThemeStyles(theme);

  return (
    <div className={styles.templateCard}>
      <TemplatePreview template={template} theme={theme} />
      <div className="p-6">
        <EventModalTrigger
          templateId={template.id}
          isAuthenticated={isAuthenticated}
          className={styles.customizeButton}
        >
          Customize this design
          <ArrowRight className="w-4 h-4 ml-1" />
        </EventModalTrigger>
      </div>
    </div>
  );
};

const ViewAllButton = ({ theme }: { theme: string }) => {
  const styles = getThemeStyles(theme);

  return (
    <div className="text-center mt-12">
      <Link to="/templates" className={styles.viewAllButton}>
        View All Designs
        <ArrowRight className="w-5 h-5 ml-2" />
      </Link>
    </div>
  );
};

// ==================== MAIN COMPONENT ====================
export default function DesignTemplate({ theme }: DesignTemplateProps) {
  const auth = isAuthenticated();
  const templatesByCategory = useTemplateCategories(cardTemplates);
  const styles = getThemeStyles(theme);

  // Get all templates from all categories and flatten them into a single array
  const allTemplates = Object.values(templatesByCategory).flat();

  return (
    <div id="templates" className={styles.container}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader theme={theme} />

        <div className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {allTemplates.map(template => (
              <TemplateCard
                key={template.id}
                template={template}
                theme={theme}
                isAuthenticated={auth}
              />
            ))}
          </div>
        </div>

        <ViewAllButton theme={theme} />
      </div>
    </div>
  );
}