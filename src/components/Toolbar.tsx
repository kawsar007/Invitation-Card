import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from '@/components/ui/tabs';
import { useIsMobile } from '@/hooks/use-mobile';
import {
  Palette,
  PanelLeft,
  Type
} from 'lucide-react';
import React from 'react';

interface ToolbarProps {
  onAddText: () => void;
  onAddImage: (imageUrl: string) => void;
  onAddVideo: (videoUrl: string) => void;
  onAddLink: (linkData: { url: string; text: string }) => void;
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

const Toolbar: React.FC<ToolbarProps> = ({
  onAddText,
  onAddImage,
  onAddVideo,
  onAddLink,
  sidebarOpen,
  setSidebarOpen
}) => {
  const [imageUrl, setImageUrl] = React.useState('');
  const [videoUrl, setVideoUrl] = React.useState('');
  const [linkUrl, setLinkUrl] = React.useState('');
  const [linkText, setLinkText] = React.useState('');
  const isMobile = useIsMobile();

  const handleAddImage = () => {
    if (imageUrl) {
      onAddImage(imageUrl);
      setImageUrl('');
    }
  };

  const handleAddVideo = () => {
    if (videoUrl) {
      onAddVideo(videoUrl);
      setVideoUrl('');
    }
  };

  const handleAddLink = () => {
    if (linkUrl && linkText) {
      onAddLink({ url: linkUrl, text: linkText });
      setLinkUrl('');
      setLinkText('');
    }
  };

  return (
    <div className={`${sidebarOpen ? 'w-80' : 'w-0'} transition-all duration-300 overflow-hidden h-full bg-white border-r border-gray-200`}>
      <div className="flex justify-between items-center p-4 border-b border-gray-200">
        <h2 className="font-semibold text-gray-800">Toolbox</h2>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="md:hidden"
        >
          <PanelLeft className="h-4 w-4" />
        </Button>
      </div>

      <Tabs defaultValue="elements" className="p-4">
        <TabsList className="w-full">
          <TabsTrigger value="elements" className="flex-1">Elements</TabsTrigger>
          <TabsTrigger value="design" className="flex-1">Design</TabsTrigger>
        </TabsList>

        <TabsContent value="elements">
          <div className="space-y-4 mt-4">
            <Button
              variant="outline"
              className="w-full justify-start"
              onClick={onAddText}
            >
              <Type className="h-4 w-4 mr-2" />
              Add Text
            </Button>

            <Separator />

            <div className="space-y-2">
              <Label htmlFor="image-url">Image URL</Label>
              <div className="flex space-x-2">
                <Input
                  id="image-url"
                  placeholder="https://example.com/image.jpg"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                />
                <Button onClick={handleAddImage}>Add</Button>
              </div>
            </div>

            <Separator />

            <div className="space-y-2">
              <Label htmlFor="video-url">Video URL (YouTube/Vimeo)</Label>
              <div className="flex space-x-2">
                <Input
                  id="video-url"
                  placeholder="https://youtube.com/watch?v=..."
                  value={videoUrl}
                  onChange={(e) => setVideoUrl(e.target.value)}
                />
                <Button onClick={handleAddVideo}>Add</Button>
              </div>
            </div>

            <Separator />

            <div className="space-y-2">
              <Label htmlFor="link-url">Link</Label>
              <Input
                id="link-url"
                placeholder="https://example.com"
                value={linkUrl}
                onChange={(e) => setLinkUrl(e.target.value)}
                className="mb-2"
              />
              <Input
                placeholder="Link text"
                value={linkText}
                onChange={(e) => setLinkText(e.target.value)}
              />
              <Button onClick={handleAddLink} className="w-full mt-2">
                Add Link
              </Button>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="design">
          <div className="space-y-4 mt-4">
            <div className="p-4 bg-gray-50 rounded-md text-center">
              <Palette className="h-8 w-8 mx-auto text-primary mb-2" />
              <p>Design options will be available here</p>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Toolbar;