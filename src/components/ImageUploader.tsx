
import React, { useState, useRef } from 'react';
import { useEditor } from '@/context/EditorContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Image, Upload } from 'lucide-react';

const ImageUploader: React.FC = () => {
  const { addElement } = useEditor();
  const [imageUrl, setImageUrl] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImageUrl(e.target.value);
  };

  const handleAddImageByUrl = () => {
    if (!imageUrl) {
      toast.error('Please enter an image URL');
      return;
    }

    addElement({
      type: 'image',
      x: 100,
      y: 100,
      width: 200,
      height: 200,
      content: imageUrl,
    });

    setImageUrl('');
    toast.success('Image added successfully');
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

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

    // Reset the input to allow uploading the same file again
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleFileUploadClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="p-4 border-t border-border">
      <h3 className="text-lg font-medium mb-4">Add Image</h3>
      
      <div className="mb-4">
        <Label htmlFor="file-upload" className="mb-2 block">Upload Image</Label>
        <Input
          ref={fileInputRef}
          id="file-upload"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />
        <Button 
          onClick={handleFileUploadClick}
          className="w-full"
          variant="outline"
        >
          <Upload size={16} className="mr-2" />
          Choose Image
        </Button>
      </div>
      
      <div className="mb-4">
        <Label htmlFor="image-url" className="mb-2 block">Image URL</Label>
        <div className="flex space-x-2">
          <Input
            id="image-url"
            placeholder="https://example.com/image.jpg"
            value={imageUrl}
            onChange={handleUrlChange}
          />
          <Button 
            onClick={handleAddImageByUrl}
            disabled={!imageUrl}
          >
            <Image size={16} className="mr-2" />
            Add
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ImageUploader;
