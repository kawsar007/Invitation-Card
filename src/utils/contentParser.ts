import { ContentBlock } from "@/types/types";

export const extractContentBlocks = (htmlContent: string) => {
  // Create a temporary DOM element to parse the HTML
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlContent, 'text/html');

  const blocks: Record<string, string> = {};
  const extractedBlocks: ContentBlock[] = [];

  // Get the container div
  const container = doc.querySelector('div > div');
  if (!container) return { blocks, extractedBlocks };

  // Extract all direct children (content blocks)
  Array.from(container.children).forEach((element, index) => {
    const tagName = element.tagName.toLowerCase();

    // Create an ID if the element doesn't have one
    const id = element.id || `block-${tagName}-${index}`;
    if (!element.id) {
      element.id = id;
    }

    blocks[id] = element.innerHTML.trim();

    extractedBlocks.push({
      id,
      type: tagName,
      content: element.innerHTML.trim(),
      html: element.outerHTML
    });
  });
  return { blocks, extractedBlocks };
};