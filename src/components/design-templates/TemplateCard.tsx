import { Template } from "@/types/types";
import { ArrowRight } from "lucide-react";
import { EventModalTrigger } from "./EventModalTrigger";
import TemplatePreview from "./TemplatePreview";
import { getThemeStyles } from "./TemplateStyles";

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

export default TemplateCard;