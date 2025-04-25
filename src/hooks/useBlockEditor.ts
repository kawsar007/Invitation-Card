import { ContentBlock } from "@/types/types";
import { useState } from 'react';
import { DropResult } from "react-beautiful-dnd";

export const useBlockEditor = (content: string, onContentChange: (content: string) => void) => {
  // state for content blocks (for drag and drop)
  const [contentBlocks, setContentBlocks] = useState<ContentBlock[]>([]);

  // Handle drag end event
  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const items = Array.from(contentBlocks);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setContentBlocks(items);
    updateHtmlFromBlocks(items);
  };

  // Update HTML content from rearranged blocks
  const updateHtmlFromBlocks = (blocks: ContentBlock[]) => {
    // Create a temporary DOM element to parse the HTML
    const parser = new DOMParser();
    const doc = parser.parseFromString(content, 'text/html');

    // Get the container div
    const container = doc.querySelector('div > div');
    if (!container) return;

    // Clear the container
    container.innerHTML = '';

    // Add blocks in new order
    blocks.forEach(block => {
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = block.html;
      const element = tempDiv.firstChild;
      if (element) {
        container.appendChild(element);
      }
    });

    // Update content state
    const newContent = doc.documentElement.outerHTML;
    onContentChange(newContent);
  };

  // Handle block content update
  const handleBlockUpdate = (id: string, newHtml: string) => {
    const updatedBlocks = contentBlocks.map(block => {
      if (block.id === id) {
        // Parse the new HTML to extract content
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = newHtml;
        const element = tempDiv.firstChild as HTMLElement;

        return {
          ...block,
          content: element.innerHTML || block.content,
          html: newHtml
        };
      }
      return block;
    });

    setContentBlocks(updatedBlocks);
    updateHtmlFromBlocks(updatedBlocks);
  };

  // Add a new content block
  const addContentBlock = (type: string) => {
    const id = `block-${type}-${contentBlocks.length}`;
    const defaultContent = type === 'h1' ? 'New Heading' :
      type === 'h2' ? 'New Subheading' : 'New paragraph text';

    const style = type === 'h1' ? "color: #a389f4; font-family: 'Georgia', serif; font-size: 32px; margin-bottom: 20px;" :
      type === 'h2' ? "font-family: 'Georgia', serif; font-size: 26px; margin-bottom: 20px;" :
        "font-size: 16px; margin-bottom: 10px;";

    const newBlock = {
      id,
      type,
      content: defaultContent,
      html: `<${type} id="${id}" style="${style}">${defaultContent}</${type}>`
    };

    const updatedBlocks = [...contentBlocks, newBlock];
    setContentBlocks(updatedBlocks);
    updateHtmlFromBlocks(updatedBlocks);
  };

  // Remove a content block
  const removeContentBlock = (id: string) => {
    const updatedBlocks = contentBlocks.filter(block => block.id !== id);
    setContentBlocks(updatedBlocks);
    updateHtmlFromBlocks(updatedBlocks);
  };

  return {
    contentBlocks,
    setContentBlocks,
    handleDragEnd,
    handleBlockUpdate,
    addContentBlock,
    removeContentBlock
  };
};