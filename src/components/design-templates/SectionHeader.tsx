import { getThemeStyles } from "./TemplateStyles";

const SectionHeader = ({
  theme,
  title = "Stunning Invitation Designs",
  subtitle = "Browse our collection of beautiful templates for every occasion."
}: {
  theme: string;
  title?: string;
  subtitle?: string;
}) => {
  const styles = getThemeStyles(theme);

  return (
    <div className="text-center mb-16">
      <h2 className={styles.heading}>
        {title}
      </h2>
      <p className={styles.subtitle}>
        {subtitle}
      </p>
    </div>
  );
};

export default SectionHeader;