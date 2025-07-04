import { Template } from "@/types/types";
import { getThemeStyles } from "../../styles/TemplateStyles";
import { createTemplateIframe } from "./TemplateIframe";

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
            sandbox="allow-same-origin allow-scripts"
          />
        </div>
      </div>
    </div>
  );
};

export default TemplatePreview;