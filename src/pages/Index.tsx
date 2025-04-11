
import React, { useState } from 'react';
import { EditorProvider } from '@/context/EditorContext';
import Canvas from '@/components/Canvas';
import Toolbar from '@/components/Toolbar';
import EditorPanel from '@/components/EditorPanel';
import HistoryControls from '@/components/HistoryControls';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

const Index = () => {
  const [videoUrl, setVideoUrl] = useState('');
  const [linkUrl, setLinkUrl] = useState('');
  const [isVideoDialogOpen, setIsVideoDialogOpen] = useState(false);
  const [isLinkDialogOpen, setIsLinkDialogOpen] = useState(false);

  const handleAddText = () => {
    toast('Text element added to canvas');
  };

  const handleAddImage = () => {
    toast('Please select an image file to upload');
  };

  const handleAddVideo = () => {
    setIsVideoDialogOpen(true);
  };

  const handleAddLink = () => {
    setIsLinkDialogOpen(true);
  };

  return (
    <EditorProvider>
      <div className="min-h-screen flex flex-col bg-editor-light-bg">
        <header className="bg-white border-b border-border p-4">
          <h1 className="text-2xl font-bold text-center text-editor-blue">Invitation Card Editor</h1>
        </header>
        
        <div className="flex flex-1 overflow-hidden">
          <main className="flex-1 flex flex-col overflow-hidden">
            <Toolbar 
              onAddText={handleAddText}
              onAddImage={handleAddImage}
              onAddVideo={handleAddVideo}
              onAddLink={handleAddLink}
            />
            
            <div className="flex-1 overflow-auto p-8 flex items-center justify-center">
              <Canvas />
            </div>
            
            <HistoryControls />
          </main>
          
          <EditorPanel />
        </div>
      </div>
      
      <Dialog open={isVideoDialogOpen} onOpenChange={setIsVideoDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Video</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="video-url-main">Video URL</Label>
              <Input
                id="video-url-main"
                placeholder="https://example.com/video.mp4"
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
              />
            </div>
            <Button 
              onClick={() => {
                toast.success('Video added to canvas');
                setVideoUrl('');
                setIsVideoDialogOpen(false);
              }}
              disabled={!videoUrl}
              className="w-full"
            >
              Add Video
            </Button>
          </div>
        </DialogContent>
      </Dialog>
      
      <Dialog open={isLinkDialogOpen} onOpenChange={setIsLinkDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Link</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="link-url-main">URL</Label>
              <Input
                id="link-url-main"
                placeholder="https://example.com"
                value={linkUrl}
                onChange={(e) => setLinkUrl(e.target.value)}
              />
            </div>
            <Button 
              onClick={() => {
                toast.success('Link added to canvas');
                setLinkUrl('');
                setIsLinkDialogOpen(false);
              }}
              disabled={!linkUrl}
              className="w-full"
            >
              Add Link
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </EditorProvider>
  );
};

export default Index;
