
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useEditor } from '@/context/EditorContext';
import {
  FileVideo,
  Image as ImageIcon,
  Link,
  Type,
  Video
} from 'lucide-react';
import React, { useState } from 'react';
import { toast } from 'sonner';
import ImageUploader from './ImageUploader';
import TextEditor from './TextEditor';
import VersionHistory from './VersionHistory';

const EditorPanel: React.FC = () => {
  const { addElement } = useEditor();
  const [videoUrl, setVideoUrl] = useState('');
  const [linkText, setLinkText] = useState('');
  const [linkUrl, setLinkUrl] = useState('');
  const [isVideoDialogOpen, setIsVideoDialogOpen] = useState(false);
  const [isLinkDialogOpen, setIsLinkDialogOpen] = useState(false);

  const handleAddText = () => {
    addElement({
      type: 'text',
      x: 100,
      y: 100,
      width: 200,
      height: 100,
      content: 'Double click to edit text',
    });
    toast.success('Text element added');
  };

  const handleAddVideo = () => {
    if (!videoUrl) {
      toast.error('Please enter a video URL');
      return;
    }

    addElement({
      type: 'video',
      x: 100,
      y: 100,
      width: 300,
      height: 200,
      content: videoUrl,
    });

    setVideoUrl('');
    setIsVideoDialogOpen(false);
    toast.success('Video added successfully');
  };

  const handleAddLink = () => {
    if (!linkUrl) {
      toast.error('Please enter a URL');
      return;
    }

    addElement({
      type: 'link',
      x: 100,
      y: 100,
      width: 200,
      height: 50,
      content: linkUrl,
    });

    setLinkText('');
    setLinkUrl('');
    setIsLinkDialogOpen(false);
    toast.success('Link added successfully');
  };

  return (
    <div className="w-64 bg-white border-l border-border h-full flex flex-col">
      <div className="p-4 border-b border-border">
        <h2 className="text-xl font-bold">Editor Tools</h2>
      </div>

      <Tabs defaultValue="elements" className="flex-1 flex flex-col">
        <TabsList className="grid grid-cols-3">
          <TabsTrigger value="elements">Elements</TabsTrigger>
          <TabsTrigger value="edit">Edit</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
        </TabsList>

        <TabsContent value="elements" className="flex-1 overflow-auto">
          <div className="p-4 grid grid-cols-2 gap-2">
            <Button
              variant="outline"
              className="h-24 flex flex-col items-center justify-center"
              onClick={handleAddText}
            >
              <Type size={24} className="mb-2" />
              <span>Text</span>
            </Button>

            <Button
              variant="outline"
              className="h-24 flex flex-col items-center justify-center"
              asChild
            >
              <label>
                <ImageIcon size={24} className="mb-2" />
                <span>Image</span>
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onload = (event) => {
                        const result = event.target?.result as string;
                        addElement({
                          type: 'image',
                          x: 100,
                          y: 100,
                          width: 200,
                          height: 200,
                          content: result,
                        });
                        toast.success('Image uploaded successfully');
                      };
                      reader.readAsDataURL(file);
                      // Reset input
                      e.target.value = '';
                    }
                  }}
                />
              </label>
            </Button>

            <Dialog open={isVideoDialogOpen} onOpenChange={setIsVideoDialogOpen}>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  className="h-24 flex flex-col items-center justify-center"
                >
                  <Video size={24} className="mb-2" />
                  <span>Video</span>
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add Video</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="video-url">Video URL</Label>
                    <Input
                      id="video-url"
                      placeholder="https://example.com/video.mp4"
                      value={videoUrl}
                      onChange={(e) => setVideoUrl(e.target.value)}
                    />
                  </div>
                  <Button
                    onClick={handleAddVideo}
                    disabled={!videoUrl}
                    className="w-full"
                  >
                    <FileVideo size={16} className="mr-2" />
                    Add Video
                  </Button>
                </div>
              </DialogContent>
            </Dialog>

            <Dialog open={isLinkDialogOpen} onOpenChange={setIsLinkDialogOpen}>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  className="h-24 flex flex-col items-center justify-center"
                >
                  <Link size={24} className="mb-2" />
                  <span>Link</span>
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add Link</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="link-text">Link Text (Optional)</Label>
                    <Input
                      id="link-text"
                      placeholder="Click here"
                      value={linkText}
                      onChange={(e) => setLinkText(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="link-url">URL</Label>
                    <Input
                      id="link-url"
                      placeholder="https://example.com"
                      value={linkUrl}
                      onChange={(e) => setLinkUrl(e.target.value)}
                    />
                  </div>
                  <Button
                    onClick={handleAddLink}
                    disabled={!linkUrl}
                    className="w-full"
                  >
                    <Link size={16} className="mr-2" />
                    Add Link
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <ImageUploader />
        </TabsContent>

        <TabsContent value="edit" className="flex-1 overflow-auto">
          <TextEditor />
        </TabsContent>

        <TabsContent value="history" className="flex-1 overflow-auto">
          <VersionHistory />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EditorPanel;
