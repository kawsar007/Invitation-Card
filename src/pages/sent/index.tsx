// Placeholder components for Send and Track tabs
const SendInvitationPage = () => (
  <div className="p-6 w-full max-w-4xl mx-auto">
    <div className="bg-white rounded-lg shadow-sm border p-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Send Invitations</h2>
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-700">Guest List</h3>
            <div className="border rounded-lg p-4 bg-gray-50">
              <p className="text-gray-600">Upload or manage your guest list here</p>
              <button className="mt-3 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                Import Contacts
              </button>
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-700">Send Options</h3>
            <div className="space-y-3">
              <label className="flex items-center">
                <input type="radio" name="sendMethod" value="email" className="mr-2" defaultChecked />
                <span>Send via Email</span>
              </label>
              <label className="flex items-center">
                <input type="radio" name="sendMethod" value="sms" className="mr-2" />
                <span>Send via SMS</span>
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                <span>Schedule sending</span>
              </label>
            </div>
          </div>
        </div>
        <div className="flex justify-center">
          <button className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 font-semibold">
            Send All Invitations
          </button>
        </div>
      </div>
    </div>
  </div>
);

export default SendInvitationPage;