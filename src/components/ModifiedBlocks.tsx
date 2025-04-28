
const ModifiedBlocksPanel = ({ modifiedBlocks }) => {
  // Format timestamp for display
  const formatTimestamp = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    }).format(date);
  };
  return (
    <div className="w-1/4 bg-white border-l border-gray-200 overflow-y-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-gray-900">Modified Blocks</h3>
        <span className="text-xs text-gray-500">{modifiedBlocks.length} changes</span>
      </div>

      {modifiedBlocks.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-center h-40 border border-dashed border-gray-200 rounded-md p-4">
          <p className="text-gray-400 mb-2">No changes detected</p>
          <p className="text-xs text-gray-400">Edit content to see tracked changes</p>
        </div>
      ) : (
        <div className="space-y-3">
          {modifiedBlocks.map((block, index) => (
            <div key={`${block.id}-${index}`} className="p-3 bg-gray-50 rounded-md border border-gray-200">
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium text-sm text-gray-700 capitalize">
                  {block.type === 'image' ? 'Background' : block.type}
                </span>
                <span className="text-gray-400 text-xs">{formatTimestamp(block.timestamp)}</span>
              </div>
              <div className="space-y-2">
                <div className="bg-red-50 p-2 rounded-sm border-l-2 border-red-200">
                  <p className="text-xs text-gray-600 mb-1 font-medium">Original:</p>
                  <p className="text-xs line-clamp-2 text-gray-800">{block.originalContent}</p>
                </div>
                <div className="bg-green-50 p-2 rounded-sm border-l-2 border-green-200">
                  <p className="text-xs text-gray-600 mb-1 font-medium">New:</p>
                  <p className="text-xs line-clamp-2 text-gray-800">{block.newContent}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default ModifiedBlocksPanel;