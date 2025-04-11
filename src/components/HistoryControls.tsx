
import React from 'react';
import { useEditor } from '@/context/EditorContext';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Undo, Redo, RotateCcw } from 'lucide-react';
import { toast } from 'sonner';

const HistoryControls: React.FC = () => {
  const { state, undo, redo, reset } = useEditor();

  const handleUndo = () => {
    undo();
    toast.info('Undo completed');
  };

  const handleRedo = () => {
    redo();
    toast.info('Redo completed');
  };

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset the design? This action cannot be undone.')) {
      reset();
      toast.success('Design has been reset');
    }
  };

  return (
    <div className="flex space-x-2 p-4 border-t border-border">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleUndo}
              disabled={state.history.past.length === 0}
            >
              <Undo size={16} className="mr-1" />
              Undo
            </Button>
          </TooltipTrigger>
          <TooltipContent>Undo last action</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleRedo}
              disabled={state.history.future.length === 0}
            >
              <Redo size={16} className="mr-1" />
              Redo
            </Button>
          </TooltipTrigger>
          <TooltipContent>Redo last undone action</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleReset}
            >
              <RotateCcw size={16} className="mr-1" />
              Reset
            </Button>
          </TooltipTrigger>
          <TooltipContent>Reset to initial state</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export default HistoryControls;
