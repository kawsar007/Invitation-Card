import { useTemplateCategories } from "@/hooks/useTemplateData";
import { isAuthenticated } from "@/utils/auth";
import { cardTemplates } from "@/utils/templates";
import { ArrowRight } from "lucide-react";
import SectionHeader from "./SectionHeader";
import TemplateCard from "./TemplateCard";
import { getThemeStyles } from "./TemplateStyles";

// ==================== TYPES ====================
interface DesignTemplateProps {
  theme: string;
  variant?: 'preview' | 'full';
  maxTemplates?: number;
  showHeader?: boolean;
  showViewAllButton?: boolean;
  className?: string;
  title?: string;
  subtitle?: string;
  onViewAll?: () => void;
}

const ViewAllButton = ({
  theme,
  onClick
}: {
  theme: string;
  onClick: () => void;
}) => {
  const styles = getThemeStyles(theme);

  return (
    <div className="text-center mt-12">
      <button
        onClick={onClick}
        className={styles.viewAllButton}
      >
        View All Templates
        <ArrowRight className="w-4 h-4 ml-2" />
      </button>
    </div>
  );
};

// ==================== MAIN COMPONENT ====================
export default function DesignTemplate({
  theme,
  variant = 'full',
  maxTemplates,
  showHeader = true,
  showViewAllButton,
  className = '',
  title,
  subtitle,
  onViewAll
}: DesignTemplateProps) {
  const auth = isAuthenticated();
  const templatesByCategory = useTemplateCategories(cardTemplates);
  const styles = getThemeStyles(theme);

  // Get all templates from all categories and flatten them into a single array
  const allTemplates = Object.values(templatesByCategory).flat();

  // Determine how many templates to show
  const getTemplatesToShow = () => {
    if (maxTemplates) {
      return allTemplates.slice(0, maxTemplates);
    }

    if (variant === 'preview') {
      return allTemplates.slice(0, 3);
    }

    return allTemplates;
  };

  const templatesToShow = getTemplatesToShow();

  return (
    <div id="templates" className={`${styles.container} ${className}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {showHeader && (
          <SectionHeader
            theme={theme}
            title={title}
            subtitle={subtitle}
          />
        )}

        <div className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {templatesToShow.map(template => (
              <TemplateCard
                key={template.id}
                template={template}
                theme={theme}
                isAuthenticated={auth}
              />
            ))}
          </div>
        </div>

        {showViewAllButton && onViewAll && (
          <ViewAllButton theme={theme} onClick={onViewAll} />
        )}
      </div>
    </div>
  );
}