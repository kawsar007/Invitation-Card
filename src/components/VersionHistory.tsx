
import React, { useEffect, useState } from 'react';
import { useEditor, Element } from '@/context/EditorContext';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';
import { History, Check, Clock } from 'lucide-react';

const VersionHistory: React.FC = () => {
  const { state, setVersion } = useEditor();
  const [versions, setVersions] = useState<Array<{ id: number; elements: Element[] }>>([]);

  // Update versions when history changes
  useEffect(() => {
    if (state.history.past.length > 0) {
      // Add the current state to versions if it's not already there
      const newId = versions.length > 0 ? versions[0].id + 1 : 1;
      const newVersion = {
        id: newId,
        elements: [...state.history.present],
      };
      
      // Only add if there are actual changes
      if (versions.length === 0 || JSON.stringify(versions[0].elements) !== JSON.stringify(newVersion.elements)) {
        setVersions([newVersion, ...versions]);
      }
    }
  }, [state.history.present]);

  const handleRestoreVersion = (version: { id: number; elements: Element[] }) => {
    setVersion([...version.elements]);
    toast.success(`Restored version ${version.id}`);
  };

  const formatDate = (id: number) => {
    // Simulating timestamps for versions
    const now = new Date();
    const minutesAgo = versions.length - id;
    const timestamp = new Date(now.getTime() - minutesAgo * 60000);
    return timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  if (versions.length === 0) {
    return (
      <div className="p-4 text-center text-muted-foreground">
        <History size={24} className="mx-auto mb-2" />
        <p>No version history available yet</p>
      </div>
    );
  }

  return (
    <div className="p-4 border-t border-border">
      <h3 className="text-lg font-medium mb-4 flex items-center">
        <History size={18} className="mr-2" />
        Version History
      </h3>
      
      <ScrollArea className="h-64">
        {versions.map((version, index) => (
          <div key={version.id}>
            <div className="flex items-center justify-between py-2">
              <div className="flex items-center">
                <Clock size={14} className="mr-2 text-muted-foreground" />
                <span className="text-sm">
                  Version {version.id} - {formatDate(version.id)}
                </span>
              </div>
              <Button 
                variant="ghost" 
                size="sm"
                disabled={index === 0}
                onClick={() => handleRestoreVersion(version)}
              >
                <Check size={14} className="mr-1" />
                Restore
              </Button>
            </div>
            {index < versions.length - 1 && <Separator />}
          </div>
        ))}
      </ScrollArea>
    </div>
  );
};

export default VersionHistory;
