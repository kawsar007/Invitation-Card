// types.ts
export interface ModifiedBlock {
  id: string;
  type: string;
  originalContent: string;
  newContent: string;
  timestamp: Date;
}

export interface CardVersion {
  id: number;
  content: string;
  timestamp: Date;
  modifiedBlocks: ModifiedBlock[];
}

export interface ContentBlock {
  id: string;
  type: string;
  content: string;
  html: string;
}

export interface CardTemplate {
  id: string;
  name: string;
  thumbnail: string;
  backgroundImage: string;
  content: string;
  description: string;
  category: string; // e.g., "wedding", "birthday", "professional"
}