import { ContentBlock } from '@/types/types';
import { DragDropContext, Draggable, Droppable, DropResult } from 'react-beautiful-dnd';

interface BlockEditorProps {
  contentBlocks: ContentBlock[];
  onDragEnd: (result: DropResult) => void;
  onBlockUpdate: (id: string, newHtml: string) => void;
  onAddBlock: (type: string) => void;
  onRemoveBlock: (id: string) => void;
}

const BlockEditor = ({
  contentBlocks,
  onDragEnd,
  onBlockUpdate,
  onAddBlock,
  onRemoveBlock
}: BlockEditorProps) => {
  return (
    <div className="w-1/4 bg-white border-l border-gray-200 overflow-y-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-gray-900">Content Blocks</h3>
        <div className="space-x-2">
          <button
            onClick={() => onAddBlock('h1')}
            className="px-2 py-1 bg-blue-50 text-blue-600 text-xs rounded hover:bg-blue-100"
          >
            Add H1
          </button>
          <button
            onClick={() => onAddBlock('p')}
            className="px-2 py-1 bg-green-50 text-green-600 text-xs rounded hover:bg-green-100"
          >
            Add P
          </button>
        </div>
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="content-blocks">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="space-y-2"
            >
              {contentBlocks.map((block, index) => (
                <Draggable key={block.id} draggableId={block.id} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      className="p-3 bg-white rounded-md border border-gray-200 shadow-sm"
                    >
                      <div className="flex justify-between items-center mb-2">
                        <div className="flex items-center">
                          <div
                            {...provided.dragHandleProps}
                            className="cursor-move p-1 mr-2 bg-gray-100 rounded"
                          >
                            ⋮⋮
                          </div>
                          <span className="font-medium text-sm text-gray-700 capitalize bg-gray-100 px-2 py-0.5 rounded">
                            {block.type}
                          </span>
                        </div>
                        <button
                          onClick={() => onRemoveBlock(block.id)}
                          className="text-red-500 hover:text-red-700 text-xs"
                        >
                          Remove
                        </button>
                      </div>
                      <div className="mt-2">
                        <textarea
                          value={block.content}
                          onChange={(e) => {
                            const newHtml = block.html.replace(
                              />.*?</,
                              `>${e.target.value}<`
                            );
                            onBlockUpdate(block.id, newHtml);
                          }}
                          className="w-full text-sm p-2 border border-gray-200 rounded resize-y"
                          rows={2}
                        />
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default BlockEditor;