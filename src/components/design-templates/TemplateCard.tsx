import { CardTemplate } from "@/types/types";
import { ArrowRight } from "lucide-react";
import { getThemeStyles } from "../../styles/TemplateStyles";
import { EventModalTrigger } from "./EventModalTrigger";
import TemplatePreview from "./TemplatePreview";

const TemplateCard = ({
  template,
  theme,
  isAuthenticated
}: {
  template: CardTemplate;
  theme: string;
  isAuthenticated: boolean;
}) => {
  const styles = getThemeStyles(theme);

  return (
    <div className={styles.templateCard}>
      <TemplatePreview template={template} theme={theme} />
      <div className="p-6">
        <EventModalTrigger
          template={template}
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