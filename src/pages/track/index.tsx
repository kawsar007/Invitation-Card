const TrackInvitationPage = () => (
  <div className="p-6 w-full max-w-4xl mx-auto">
    <div className="bg-white rounded-lg shadow-sm border p-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Track Responses</h2>
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-blue-50 p-4 rounded-lg text-center">
            <div className="text-2xl font-bold text-blue-600">24</div>
            <div className="text-sm text-gray-600">Invitations Sent</div>
          </div>
          <div className="bg-green-50 p-4 rounded-lg text-center">
            <div className="text-2xl font-bold text-green-600">18</div>
            <div className="text-sm text-gray-600">Responses Received</div>
          </div>
          <div className="bg-yellow-50 p-4 rounded-lg text-center">
            <div className="text-2xl font-bold text-yellow-600">6</div>
            <div className="text-sm text-gray-600">Pending Responses</div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-700">Response Details</h3>
          <div className="border rounded-lg overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Guest Name</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Status</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Response Date</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Guests</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-900">John Doe</td>
                  <td className="px-4 py-3">
                    <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                      Attending
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">Dec 15, 2024</td>
                  <td className="px-4 py-3 text-sm text-gray-600">+1</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-900">Jane Smith</td>
                  <td className="px-4 py-3">
                    <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800">
                      Declined
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">Dec 14, 2024</td>
                  <td className="px-4 py-3 text-sm text-gray-600">0</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-900">Mike Johnson</td>
                  <td className="px-4 py-3">
                    <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">
                      Pending
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">-</td>
                  <td className="px-4 py-3 text-sm text-gray-600">-</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default TrackInvitationPage;