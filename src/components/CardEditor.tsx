import { cn } from "@/lib/utils";
import { Editor } from '@tinymce/tinymce-react';
import React, { useEffect, useRef, useState } from 'react';
import { toast } from "sonner";

interface CardEditorProps {
  content: string;
  onChange: (content: string) => void;
  showGrid: boolean;
  editorRef: React.RefObject<any>;
  cardSize: { width: number; height: number };
}

const CardEditor: React.FC<CardEditorProps> = ({
  content,
  onChange,
  showGrid,
  editorRef,
  cardSize
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [editorHeight, setEditorHeight] = useState<string>("80vh");

  // Match editor size to the container
  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        // Set fixed aspect ratio based on the cardSize
        setEditorHeight(`${(cardSize.height / cardSize.width * 100)}%`);
      }
    };

    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, [cardSize]);

  return (
    <div
      className={cn(
        "relative mx-auto border border-gray-300 overflow-hidden",
        "transition-all duration-300 ease-in-out",
        showGrid ? "bg-grid" : "bg-white"
      )}
      ref={containerRef}
      style={{
        width: `${cardSize.width}px`,
        maxWidth: '100%',
        height: 'auto',
        aspectRatio: `${cardSize.width} / ${cardSize.height}`,
      }}
    >
      <Editor
        onInit={(_, editor) => {
          if (editorRef.current) {
            editorRef.current = editor;
          }
        }}
        apiKey={import.meta.env.VITE_TINYMCE_KEY}
        value={content}
        onEditorChange={onChange}
        init={{
          height: '100%',
          menubar: false,
          plugins: [
            'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
            'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
            'insertdatetime', 'media', 'table', 'code', 'help', 'emoticons'
          ],
          toolbar: 'undo redo | blocks | ' + 'image media | ' +
            'bold italic forecolor | alignleft aligncenter ' +
            'alignright alignjustify | bullist numlist outdent indent | ' +

            'removeformat | help',
          image_advtab: true,  // Enables advanced image options
          file_picker_types: 'image',  // Only allow image uploads
          content_style: `
            body { 
              font-family: 'Helvetica', Arial, sans-serif; 
              font-size: 14px; 
              margin: 0; 
              padding: 1rem;
              height: 100%;
              box-sizing: border-box;
            }
            img { max-width: 100%; height: auto; }
          `,
          images_upload_handler: (blobInfo, progress) => {
            return new Promise((resolve, reject) => {
              // For this demo, we're creating a data URL
              const reader = new FileReader();
              reader.onload = () => {
                const dataUrl = reader.result as string;
                resolve(dataUrl);
              };
              reader.onerror = () => {
                reject(`Image upload failed: ${reader.error}`);
              };
              reader.readAsDataURL(blobInfo.blob());
            });
          },
          setup: (editor) => {
            // Custom event handlers can be added here
            editor.on('Error', (e) => {
              toast.error("Editor error: " + e.message);
            });
          }
        }}
      />
    </div>
  );
};

export default CardEditor;