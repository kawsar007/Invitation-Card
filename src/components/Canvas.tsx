
import { Element as EditorElement, useEditor } from '@/context/EditorContext';
import { cn } from '@/lib/utils';
import React, { useState } from 'react';

const Canvas: React.FC = () => {
  const { state, selectElement, updateElement } = useEditor();
  const [draggedElement, setDraggedElement] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  const handleElementClick = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    selectElement(id);
  };

  const handleCanvasClick = () => {
    selectElement(null);
  };

  const handleDragStart = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const element = state.history.present.find(el => el.id === id);
    if (element) {
      const canvasRect = e.currentTarget.getBoundingClientRect();
      const offsetX = e.clientX - canvasRect.left - element.x;
      const offsetY = e.clientY - canvasRect.top - element.y;
      setDragOffset({ x: offsetX, y: offsetY });
      setDraggedElement(id);
    }
  };

  const handleDragMove = (e: React.MouseEvent) => {
    if (draggedElement) {
      const canvasRect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - canvasRect.left - dragOffset.x;
      const y = e.clientY - canvasRect.top - dragOffset.y;
      updateElement(draggedElement, { x, y });
    }
  };

  const handleDragEnd = () => {
    setDraggedElement(null);
  };

  const handleTextDoubleClick = (e: React.MouseEvent, element: EditorElement) => {
    e.stopPropagation();
    const target = e.currentTarget as HTMLDivElement;
    target.contentEditable = 'true';
    target.focus();
    // updateElement(element.id, { content: target.innerText });
  };

  const handleTextBlur = (e: React.FocusEvent, element: EditorElement) => {
    const target = e.currentTarget as HTMLDivElement;
    target.contentEditable = 'false';
    updateElement(element.id, { content: target.textContent || '' });
  };

  const renderElement = (element: EditorElement) => {
    const isSelected = state.selectedElement === element.id;
    const baseStyles = {
      position: 'absolute',
      left: `${element.x}px`,
      top: `${element.y}px`,
      width: `${element.width}px`,
      height: `${element.height}px`,
      zIndex: element.zIndex,
      ...element.style,
    } as React.CSSProperties;

    const selectedStyles = isSelected
      ? {
        outline: '2px solid #4E97F5',
        outlineOffset: '2px',
      }
      : {};

    const styles = { ...baseStyles, ...selectedStyles };

    switch (element.type) {
      case 'text':
        return (
          <div
            key={element.id}
            style={styles}
            onClick={(e) => handleElementClick(element.id, e)}
            onMouseDown={(e) => handleDragStart(element.id, e)}
            className="cursor-move"
          >
            <div
              dangerouslySetInnerHTML={{ __html: element.content }}
              className="w-full h-full overflow-hidden"
              onDoubleClick={(e) => handleTextDoubleClick(e, element)}
              onBlur={(e) => handleTextBlur(e, element)}
              suppressContentEditableWarning
            />
          </div>
        );

      case 'image':
        return (
          <div
            key={element.id}
            style={styles}
            onClick={(e) => handleElementClick(element.id, e)}
            onMouseDown={(e) => handleDragStart(element.id, e)}
            className="cursor-move"
          >
            <img
              src={element.content}
              alt="User uploaded"
              className="w-full h-full object-contain"
            />
          </div>
        );

      case 'video':
        return (
          <div
            key={element.id}
            style={styles}
            onClick={(e) => handleElementClick(element.id, e)}
            onMouseDown={(e) => handleDragStart(element.id, e)}
            className="cursor-move"
          >
            <video
              src={element.content}
              controls
              className="w-full h-full"
            />
          </div>
        );

      case 'link':
        return (
          <div
            key={element.id}
            style={styles}
            onClick={(e) => handleElementClick(element.id, e)}
            onMouseDown={(e) => handleDragStart(element.id, e)}
            className="cursor-move"
          >
            <a
              href={element.content}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full h-full text-blue-600 underline"
            >
              {element.content}
            </a>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div
      className="relative bg-white overflow-hidden editor-shadow border border-border"
      style={{
        width: '600px',
        height: '800px',
        transform: `scale(${state.scale})`,
        transformOrigin: 'top left',
      }}
      onClick={handleCanvasClick}
      onMouseMove={handleDragMove}
      onMouseUp={handleDragEnd}
      onMouseLeave={handleDragEnd}
    >
      <div
        className={cn(
          "absolute inset-0 pointer-events-none",
          state.showGrid && "canvas-grid"
        )}
      />
      {state.history.present.map(renderElement)}
    </div>
  );
};

export default Canvas;
