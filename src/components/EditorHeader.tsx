import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Toggle } from "@/components/ui/toggle";
import {
  Grid3X3,
  Image,
  Redo,
  RotateCcw,
  Save,
  Undo
} from 'lucide-react';
import React from 'react';

interface EditorHeaderProps {
  canUndo: boolean;
  canRedo: boolean;
  onUndo: () => void;
  onRedo: () => void;
  onReset: () => void;
  onSave: () => void;
  hasUnsavedChanges: boolean;
  showGrid: boolean;
  onToggleGrid: () => void;
  currentVersion: number;
  versions: number;
  onVersionChange: (version: string) => void;
  onBackgroundChange: (imageUrl: string) => void;
}

const EditorHeader: React.FC<EditorHeaderProps> = ({
  canUndo,
  canRedo,
  onUndo,
  onRedo,
  onReset,
  onSave,
  hasUnsavedChanges,
  showGrid,
  onToggleGrid,
  currentVersion,
  versions,
  onVersionChange,
  onBackgroundChange
}) => {
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const imageUrl = event.target?.result as string;
        onBackgroundChange(imageUrl);
      };
      reader.readAsDataURL(file);
    }
  };
  return (
    <header className="bg-white border-b border-gray-200 p-4 flex flex-wrap justify-between items-center">
      <div className="flex items-center space-x-2">
        <h1 className="text-2xl font-bold text-primary">Card Editor</h1>


      </div>

      <div className="flex flex-wrap items-center space-x-2">

        <input
          type="file"
          id="bg-upload"
          accept="image/*"
          className="hidden"
          onChange={handleImageUpload}
        />
        <Button
          variant="outline"
          size="icon"
          onClick={() => document.getElementById('bg-upload')?.click()}
          title="Change Background"
        >
          <Image className="h-4 w-4" />
          {/* Change Background */}
        </Button>

        <Button
          variant="outline"
          size="icon"
          onClick={onUndo}
          disabled={!canUndo}
          title="Undo"
        >
          <Undo className="h-4 w-4" />
        </Button>

        <Button
          variant="outline"
          size="icon"
          onClick={onRedo}
          disabled={!canRedo}
          title="Redo"
        >
          <Redo className="h-4 w-4" />
        </Button>

        <Toggle
          pressed={showGrid}
          onPressedChange={onToggleGrid}
          title="Toggle Grid"
        >
          <Grid3X3 className="h-4 w-4" />
        </Toggle>

        <Select
          value={currentVersion.toString()}
          onValueChange={onVersionChange}
        >
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Version History" />
          </SelectTrigger>
          <SelectContent>
            {Array.from({ length: versions }, (_, i) => (
              <SelectItem key={i} value={(i + 1).toString()}>
                Version {i + 1}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Button
          variant="outline"
          size="icon"
          onClick={onReset}
          title="Reset to Default"
        >
          <RotateCcw className="h-4 w-4" />
        </Button>

        <Button
          onClick={onSave}
          disabled={!hasUnsavedChanges}
          className="bg-primary hover:bg-primary/90"
        >
          <Save className="h-4 w-4 mr-2" />
          Save
        </Button>
      </div>
    </header>
  );
};

export default EditorHeader;