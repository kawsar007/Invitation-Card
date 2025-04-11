
import React from 'react';
import { useEditor } from '@/context/EditorContext';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Slider } from '@/components/ui/slider';
import { 
  Type, 
  Image, 
  Video, 
  Link, 
  Grid, 
  ZoomIn, 
  ZoomOut, 
  RotateCcw,
  Undo, 
  Redo 
} from 'lucide-react';

interface ToolbarProps {
  onAddText: () => void;
  onAddImage: () => void;
  onAddVideo: () => void;
  onAddLink: () => void;
}

const Toolbar: React.FC<ToolbarProps> = ({ 
  onAddText, 
  onAddImage, 
  onAddVideo, 
  onAddLink 
}) => {
  const { state, undo, redo, reset, toggleGrid, setScale } = useEditor();
  
  const handleZoomIn = () => {
    if (state.scale < 2) {
      setScale(state.scale + 0.1);
    }
  };

  const handleZoomOut = () => {
    if (state.scale > 0.5) {
      setScale(state.scale - 0.1);
    }
  };

  const handleScaleChange = (value: number[]) => {
    setScale(value[0]);
  };

  return (
    <div className="flex items-center p-2 bg-white border-b border-border">
      <div className="flex items-center space-x-1 mr-4">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={onAddText}
                className="toolbar-button"
              >
                <Type size={18} />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Add Text</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={onAddImage}
                className="toolbar-button"
              >
                <Image size={18} />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Add Image</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={onAddVideo}
                className="toolbar-button"
              >
                <Video size={18} />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Add Video</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={onAddLink}
                className="toolbar-button"
              >
                <Link size={18} />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Add Link</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <div className="h-6 w-px bg-border mx-2" />

      <div className="flex items-center space-x-1 mr-4">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={undo}
                disabled={state.history.past.length === 0}
                className="toolbar-button"
              >
                <Undo size={18} />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Undo</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={redo}
                disabled={state.history.future.length === 0}
                className="toolbar-button"
              >
                <Redo size={18} />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Redo</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={reset}
                className="toolbar-button"
              >
                <RotateCcw size={18} />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Reset</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={toggleGrid}
                className={`toolbar-button ${state.showGrid ? 'active' : ''}`}
              >
                <Grid size={18} />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Toggle Grid</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <div className="h-6 w-px bg-border mx-2" />

      <div className="flex items-center space-x-2">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={handleZoomOut}
                disabled={state.scale <= 0.5}
                className="toolbar-button"
              >
                <ZoomOut size={18} />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Zoom Out</TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <div className="w-32">
          <Slider
            value={[state.scale]}
            min={0.5}
            max={2}
            step={0.1}
            onValueChange={handleScaleChange}
          />
        </div>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={handleZoomIn}
                disabled={state.scale >= 2}
                className="toolbar-button"
              >
                <ZoomIn size={18} />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Zoom In</TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <span className="text-sm text-muted-foreground">
          {Math.round(state.scale * 100)}%
        </span>
      </div>
    </div>
  );
};

export default Toolbar;
