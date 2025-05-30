export const formatHtmlContent = (content: string): string => {
  return JSON.stringify(content.replace(/\n/g, '').replace(/\s+/g, ' '));
};