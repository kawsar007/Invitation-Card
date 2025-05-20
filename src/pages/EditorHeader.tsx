import { DropdownMenuDemo } from "@/components/DropDownMenu";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Toggle } from "@/components/ui/toggle";
import { logoutUser } from "@/utils/auth";
import {
  Grid3X3,
  GripVertical,
  Image,
  ListTree,
  Redo,
  RotateCcw,
  Save,
  Undo
} from 'lucide-react';
import React from 'react';
import { useNavigate } from "react-router-dom";

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
  showModifiedBlocks?: boolean;
  onToggleModifiedBlocks?: () => void;
  showBlockEditor?: boolean;
  onToggleBlockEditor?: () => void;

  onToggleTemplateSelector: () => void; // New prop
  currentTemplate: string; // New prop
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
  onBackgroundChange,
  showModifiedBlocks = false,
  onToggleModifiedBlocks = () => { },
  showBlockEditor = false,
  onToggleBlockEditor = () => { },
  onToggleTemplateSelector,
  currentTemplate
}) => {
  const navigate = useNavigate();

  const logout = () => {
    logoutUser();
    navigate('/sign-in')
  }

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

  // Generate version options
  const versionOptions = [];
  for (let i = 1; i <= versions; i++) {
    versionOptions.push(
      <option key={i} value={i}>
        Version {i} {i === currentVersion ? '(current)' : ''}
      </option>
    );
  }
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

        {/* Toggle for Modified Blocks */}
        <Toggle
          pressed={showModifiedBlocks}
          onPressedChange={onToggleModifiedBlocks}
          title="Track Content Changes"
        >
          <ListTree className="h-4 w-4" />
        </Toggle>

        {/* New Toggle for Block Editor */}
        <Toggle
          pressed={showBlockEditor}
          onPressedChange={onToggleBlockEditor}
          title="Drag & Drop Block Editor"
        >
          <GripVertical className="h-4 w-4" />
        </Toggle>

        <div className="flex items-center">
          <span className="text-sm text-gray-500 mr-2">Current Template:</span>
          <button
            onClick={onToggleTemplateSelector}
            className="inline-flex items-center px-3 py-1.5 bg-indigo-50 border border-indigo-200 rounded-md text-sm font-medium text-indigo-700 hover:bg-indigo-100"
          >
            {currentTemplate} <span className="ml-1">▼</span>
          </button>
        </div>

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
        <DropdownMenuDemo logout={logout} />
      </div>
    </header>
  );
};

export default EditorHeader;