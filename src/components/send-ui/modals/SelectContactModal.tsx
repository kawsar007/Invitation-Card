import { ChevronDown, X } from "lucide-react";

const SelectContactModal = ({ setShowAddContactModal, setShowNewContactModal }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-96 max-w-md mx-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-medium text-gray-900">Add Contacts</h2>
          <button
            onClick={() => setShowAddContactModal(false)}
            className="text-gray-400 hover:text-gray-600"
          >
            <X size={20} />
          </button>
        </div>

        <div className="space-y-3">
          <button
            onClick={() => {
              setShowAddContactModal(false);
              setShowNewContactModal(true);
            }}
            className="w-full text-left p-3 hover:bg-gray-50 rounded border border-gray-200"
          >
            <div className="font-medium text-gray-900">New Contact</div>
          </button>

          <button className="w-full text-left p-3 hover:bg-gray-50 rounded border border-gray-200">
            <div className="font-medium text-gray-900">Upload Spreadsheet (Excel/CSV)</div>
          </button>

          <button className="w-full text-left p-3 hover:bg-gray-50 rounded border border-gray-200">
            <div className="font-medium text-gray-900">Paste Emails</div>
          </button>

          <button className="w-full text-left p-3 hover:bg-gray-50 rounded border border-gray-200">
            <div className="font-medium text-gray-900">Address Book</div>
          </button>

          <div className="border-t pt-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-900">Import from:</span>
            </div>
            <button className="flex items-center space-x-2 p-2 border border-gray-200 rounded hover:bg-gray-50">
              <div className="w-5 h-5 bg-blue-500 rounded text-white text-xs flex items-center justify-center">G</div>
              <span className="text-sm">Google</span>
            </button>
          </div>

          <button className="flex items-center space-x-1 text-blue-600 text-sm mt-3">
            <span>More options</span>
            <ChevronDown size={14} />
          </button>
        </div>
      </div>
    </div>
  )
}

export default SelectContactModal