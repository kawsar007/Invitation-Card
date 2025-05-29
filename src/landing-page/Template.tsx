import DesignTemplate from "@/components/design-templates";
import { useNavigate } from 'react-router-dom';
interface DesignTemplateProps {
  theme: string;
}

export default function Template({ theme }: DesignTemplateProps) {
  const navigate = useNavigate();
  return (
    <DesignTemplate
      theme={theme}
      maxTemplates={3}
      showViewAllButton={true}
      // onViewAll={() => setShowAllTemplates(true)}
      onViewAll={() => navigate('/templates')}
    />
  );
}