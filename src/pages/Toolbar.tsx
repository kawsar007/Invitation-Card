import { Button } from '@/components/ui/button';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from '@/components/ui/tabs';
import {
  PanelLeft
} from 'lucide-react';
import React from 'react';

interface ToolbarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  onBackgroundChange: (imageUrl: string) => void;
}

const Toolbar: React.FC<ToolbarProps> = ({
  sidebarOpen,
  setSidebarOpen,
  onBackgroundChange
}) => {


  const backgroundImages = [
    '/default-bg.jpg',
    '/card-bg-1.jpg',
    '/card-bg-2.jpg',
    '/card-bg-3.jpg',
    '/card-bg-4.jpg',
    '/card-bg-5.jpg',
    // Add more background images as needed
  ];

  return (
    <>
      {!sidebarOpen && (
        <Button
          variant="outline"
          size="icon"
          onClick={() => setSidebarOpen(true)}
          className="mr-2"
        >
          <PanelLeft className="h-4 w-4" />
        </Button>
      )}

      <div className={`${sidebarOpen ? 'w-72' : 'w-0'} transition-all duration-300 overflow-hidden h-full bg-white border-r border-gray-200`}>


        <div className="flex justify-between items-center p-2 border-b border-gray-200">
          <h2 className="font-semibold text-gray-800">Toolbox</h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          // className="md:hidden"
          >
            <PanelLeft className="h-4 w-4" />
          </Button>
        </div>

        <Tabs defaultValue="design" className="p-4">
          <TabsList className="w-full">
            <TabsTrigger value="design" className="flex-1">Design</TabsTrigger>
            <TabsTrigger value="elements" className="flex-1">Elements</TabsTrigger>

          </TabsList>

          <TabsContent value="design">
            <div className="space-y-4 mt-4">
              <h3 className="font-medium text-sm">Background Images</h3>
              <div className="h-[calc(100vh-280px)] overflow-y-auto pr-2">
                <div className="grid grid-cols-2 gap-2">
                  {backgroundImages.map((image, index) => (
                    <div
                      key={index}
                      className="relative aspect-[3/4] cursor-pointer overflow-hidden rounded-lg border-2 hover:border-primary transition-all"
                      onClick={() => onBackgroundChange(image)}
                    >
                      <img
                        src={image}
                        alt={`Background ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="elements">
            <div className="space-y-4 mt-4">
              <h3 className=''>Content now not available.</h3>
            </div>
          </TabsContent>


        </Tabs>
      </div>
    </>
  );
};

export default Toolbar;