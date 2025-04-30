import CustomEditorToolbar from "@/components/CustomEditorToolbar";
import TextFormattingControls from "@/components/TestFormitingControls";
// import TextFormattingControls from "@/components/TextFormitingControls";
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
  toolbarTheme?: 'light' | 'dark';
  toolbarSize?: 'sm' | 'md' | 'lg';
}

const CardEditor: React.FC<CardEditorProps> = ({
  content,
  onChange,
  showGrid,
  editorRef,
  cardSize,
  toolbarTheme = 'light',
  toolbarSize = 'md'
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [editorHeight, setEditorHeight] = useState<string>("80vh");
  const [editorInstance, setEditorInstance] = useState<any>(null);
  const [showFormatting, setShowFormatting] = useState(false);

  // Update handleAddText function
  const handleAddText = () => {
    if (editorInstance) {
      editorInstance.focus();
      setShowFormatting(!showFormatting); // Toggle formatting controls
    }
  };

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
    <div className="flex flex-col w-full">
      {/* Custom toolbar with theme support */}
      <div className="w-full mb-4">
        <CustomEditorToolbar
          editor={editorInstance}
          theme={toolbarTheme}
          size={toolbarSize}
          handleAddText={handleAddText}
        />
      </div>

      {/* Main content area with side-by-side layout */}
      <div className="flex flex-row gap-4 w-full">
        {showFormatting && (
          <div className="w-72 flex-shrink-0 transition-all duration-300 ease-in-out">
            <TextFormattingControls editor={editorInstance} theme={toolbarTheme} size={toolbarSize} />
          </div>
        )}

        {/* Right side editor container */}
        <div className="flex-grow flex justify-center">
          <div
            className={cn(
              "relative border border-gray-300 overflow-hidden",
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
                setEditorInstance(editor);
              }}
              apiKey={import.meta.env.VITE_TINYMCE_KEY}
              value={content}
              onEditorChange={onChange}
              init={{
                height: '100%',
                menubar: false,
                toolbar: false, // Disable the default toolbar
                plugins: [
                  'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                  'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                  'insertdatetime', 'media', 'table', 'code', 'help', 'emoticons'
                ],
                image_advtab: true,
                file_picker_types: 'image',
                content_style: `
              body { 
                font-family: 'Helvetica', Arial, sans-serif; 
                font-size: 14px; 
                margin: 0; 
                padding: 1rem;
                height: 100%;
                box-sizing: border-box;
              }
              p, h1, h2, h3, h4, h5, h6, div, section, article {
                display: block;
                padding: 0.5rem;
                margin: 0.5rem 0;
                min-height: 2rem;
                cursor: move;
                position: relative;
                transition: all 0.2s ease;
              }
              p:hover, h1:hover, h2:hover, h3:hover, h4:hover, h5:hover, h6:hover, div:hover, section:hover, article:hover {
                outline: 1px dashed #ccc;
              }
              .mce-selected-element {
                outline: 1px solid #4a90e2 !important;
                box-shadow: 0 0 0 1px #4a90e2;
              }
              img { 
                max-width: 100%; 
                height: auto;
                cursor: move;
                display: block;
                margin: 0.5rem 0;
              }
              @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;700&family=Pacifico&family=Great+Vibes&family=Satisfy&family=Tangerine:wght@400;700&family=Kalam:wght@300;400;700&family=Caveat:wght@400;700&family=Sacramento&family=Courgette&family=Marck+Script&family=Yellowtail&family=Italianno&family=Rouge+Script&display=swap');
            `,
                images_upload_handler: (blobInfo, progress) => {
                  return new Promise((resolve, reject) => {
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
                  editor.on('Error', (e) => {
                    toast.error("Editor error: " + e.message);
                  });
                }
              }}
            />
          </div>
        </div>
      </div>



    </div>
  );
};

export default CardEditor;