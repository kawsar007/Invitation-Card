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
            'insertdatetime', 'media', 'table', 'code', 'help', 'emoticons', 'fontsize', 'fontfamily'
          ],
          toolbar: 'undo redo | blocks | fontfamily | fontsizeinput | ' + 'image media | ' +
            'bold italic forecolor | alignleft aligncenter ' +
            'alignright alignjustify | bullist numlist outdent indent | ' +
            'removeformat | help',
          font_family_formats: 'Arial=arial,helvetica,sans-serif;' +
            'Arial Black=arial black,avant garde;' +
            'Book Antiqua=book antiqua,palatino;' +
            'Comic Sans MS=comic sans ms,sans-serif;' +
            'Courier New=courier new,courier;' +
            'Georgia=georgia,palatino;' +
            'Helvetica=helvetica;' +
            'Impact=impact,chicago;' +
            'Tahoma=tahoma,arial,helvetica,sans-serif;' +
            'Terminal=terminal,monaco;' +
            'Times New Roman=times new roman,times;' +
            'Trebuchet MS=trebuchet ms,geneva;' +
            'Dancing Script=Dancing Script,cursive;' +
            'Pacifico=Pacifico,cursive;' +
            'Great Vibes=Great Vibes,cursive;' +
            'Satisfy=Satisfy,cursive;' +
            'Tangerine=Tangerine,cursive;' +
            'Kalam=Kalam,cursive;' +
            'Caveat=Caveat,cursive;' +
            'Sacramento=Sacramento,cursive;' +
            'Courgette=Courgette,cursive;' +
            'Marck Script=Marck Script,cursive;' +
            'Yellowtail=Yellowtail,cursive;' +
            'Italianno=Italianno,cursive;' +
            'Rouge Script=Rouge Script,cursive;' +
            'Times New Roman=times new roman,times',
          fontsize_formats: '8pt 10pt 12pt 14pt 16pt 18pt 24pt 36pt 48pt',
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
            /* Make block elements have distinct boundaries */
            p, h1, h2, h3, h4, h5, h6, div, section, article {
              display: block;
              padding: 0.5rem;
              margin: 0.5rem 0;
              min-height: 2rem;
              cursor: move;
              position: relative;
              transition: all 0.2s ease;
            }
            /* Highlight on hover */
            p:hover, h1:hover, h2:hover, h3:hover, h4:hover, h5:hover, h6:hover, div:hover, section:hover, article:hover {
              outline: 1px dashed #ccc;
            }
            /* Selected element style */
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