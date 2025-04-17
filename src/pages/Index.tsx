
import CardCanvas from "@/components/CardCanvas";
import EditorHeader from "@/components/EditorHeader";
import { useToast } from "@/hooks/use-toast";
import { useRef, useState } from 'react';
import { toast } from "sonner";

const defaultContent = (bgImage: string) => `
<div style="text-align: center; min-height: 100vh; background-image: url('${bgImage}'); background-size: cover; background-position: center; background-repeat: no-repeat; display: flex; align-items: center; justify-content: center;">
  <div style="padding: 40px; margin: 20px; width: 100%; max-width: 800px;">
    <h1 style="color: #a389f4; font-family: 'Georgia', serif; font-size: 32px; margin-bottom: 20px;">You're Invited</h1>
    <p style="font-size: 18px; margin-bottom: 30px;">Please join us to celebrate</p>
    <h2 style="font-family: 'Georgia', serif; font-size: 26px; margin-bottom: 20px;">Jerry & Jayson's Wedding</h2>
    <p style="font-size: 16px; margin-bottom: 10px;">Saturday, April 19th, 2025 at 8:00 PM</p>
    <p style="font-size: 16px; margin-bottom: 30px;">The Grand Hotel, Gulshan Dhaka</p>
    <p style="font-style: italic; color: #666;">Dinner and dancing to follow</p>
  </div>
</div>
`;

interface CardVersion {
  id: number;
  content: string;
  timestamp: Date;
}

const Index = () => {
  const [backgroundImage, setBackgroundImage] = useState<string>('/default-bg.jpg');
  const [content, setContent] = useState<string>(defaultContent(backgroundImage));
  const [showGrid, setShowGrid] = useState<boolean>(false);
  const [versions, setVersions] = useState<CardVersion[]>([{
    id: 1,
    content: defaultContent(backgroundImage),
    timestamp: new Date()
  }]);

  const [currentVersionIndex, setCurrentVersionIndex] = useState<number>(0);
  const [canUndo, setCanUndo] = useState<boolean>(false);
  const [canRedo, setCanRedo] = useState<boolean>(false);

  const historyRef = useRef<string[]>([defaultContent(backgroundImage)]);
  const historyIndexRef = useRef<number>(0);
  const { toast: showToast } = useToast();

  console.log("History Ref ---> ", historyRef);


  // Add this function to handle background changes
  const handleBackgroundChange = (imageUrl: string) => {
    setBackgroundImage(imageUrl);
    const newContent = content.replace(
      /background-image: url\([^)]+\)/,
      `background-image: url('${imageUrl}')`
    );
    handleContentChange(newContent);
  };

  // Handle content change and update history
  const handleContentChange = (newContent: string) => {
    // Save current content to history if it's different
    if (newContent !== content) {
      const newHistory = historyRef.current.slice(0, historyIndexRef.current + 1);
      newHistory.push(newContent);
      historyRef.current = newHistory;
      historyIndexRef.current = newHistory.length - 1;

      // Update undo/redo buttons state
      setCanUndo(historyIndexRef.current > 0);
      setCanRedo(historyIndexRef.current < historyRef.current.length - 1);
    }

    setContent(newContent);
  };

  // Undo action
  const handleUndo = () => {
    if (historyIndexRef.current > 0) {
      historyIndexRef.current--;
      setContent(historyRef.current[historyIndexRef.current]);
      setCanUndo(historyIndexRef.current > 0);
      setCanRedo(true);
    }
  };

  // Redo action
  const handleRedo = () => {
    if (historyIndexRef.current < historyRef.current.length - 1) {
      historyIndexRef.current++;
      setContent(historyRef.current[historyIndexRef.current]);
      setCanRedo(historyIndexRef.current < historyRef.current.length - 1);
      setCanUndo(true);
    }
  };

  // Update the reset handler
  const handleReset = () => {
    const defaultBg = '/default-bg.jpg';
    setBackgroundImage(defaultBg);
    setContent(defaultContent(defaultBg));
    historyRef.current = [defaultContent(defaultBg)];
    historyIndexRef.current = 0;
    setCanUndo(false);
    setCanRedo(false);
    toast.info("Card has been reset to default");
  };

  // Save card version
  const handleSave = () => {
    // Add new version
    const newId = versions.length + 1;
    const newVersion = {
      id: newId,
      content,
      timestamp: new Date()
    };

    setVersions([...versions, newVersion]);
    setCurrentVersionIndex(versions.length);
    toast.success("Card saved successfully!");
  };

  // Toggle grid
  const handleToggleGrid = () => {
    setShowGrid(!showGrid);
  };

  // Load a specific version
  const handleVersionChange = (version: string) => {
    const versionIndex = parseInt(version) - 1;
    if (versions[versionIndex]) {
      setContent(versions[versionIndex].content);
      setCurrentVersionIndex(versionIndex);

      // Update history
      historyRef.current = [...historyRef.current, versions[versionIndex].content];
      historyIndexRef.current = historyRef.current.length - 1;
      setCanUndo(true);
      setCanRedo(false);

      toast.info(`Loaded version ${version}`);
    }
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-gray-50">
      <EditorHeader
        canUndo={canUndo}
        canRedo={canRedo}
        onUndo={handleUndo}
        onRedo={handleRedo}
        onReset={handleReset}
        onSave={handleSave}
        showGrid={showGrid}
        onToggleGrid={handleToggleGrid}
        currentVersion={currentVersionIndex + 1}
        versions={versions.length}
        onVersionChange={handleVersionChange}
        onBackgroundChange={handleBackgroundChange}
      />

      <CardCanvas
        content={content}
        onChange={handleContentChange}
        showGrid={showGrid}
        onBackgroundChange={handleBackgroundChange}
      />
    </div>
  );
};

export default Index;