import { ArrowLeft, ArrowRight, X } from 'lucide-react';
import Envelope from './Envelope';

const ImageModal = ({ isOpen, onClose, imageUrl, versionNo, previewData, fromName }) => {

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-75">
      <div className="relative max-w-7xl w-full max-h-full bg-white rounded-lg overflow-hidden shadow-2xl">

        {/* Top notification bar */}
        <div className="bg-gray-100 border-b border-gray-200 p-1 text-center text-sm text-gray-600">
          <div className="flex items-center justify-between">
            <div></div>
            <div className="flex items-center justify-center">
              <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center mr-2">
                <span className="text-white text-xs">i</span>
              </div>
              <span className="text-xs">Please keep in mind that the front of the inviteloop says {fromName} in the preview, but when you actually send your mailing, your recipient's name will appear there instead.</span>
            </div>
            <button onClick={onClose} className="ml-4 text-gray-400 hover:text-gray-600"><X /></button>
          </div>
        </div>

        {/* Navigation bar */}
        <div className="bg-white border-b border-gray-200 p-1 flex items-center justify-between">
          <button onClick={onClose} className="text-gray-600 hover:text-gray-800 flex items-center text-xs">
            <ArrowLeft size={18} className='mr-1' />
            Back to Preview Email
          </button>
          <div className="text-center text-xs">
            <span className="text-gray-600">Full card preview. You can </span>
            <button className="text-blue-600 hover:text-blue-800 underline">edit your card</button>
            <span className="text-gray-600"> at any time.</span>
          </div>
          <button className="text-gray-600 hover:text-gray-800 flex items-center text-xs">
            Continue to Add Contacts
            {/* <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg> */}
            <ArrowRight size={18} className='ml-1' />
          </button>
        </div>

        {/* RSVP header */}
        <div className="bg-gray-800 text-white p-1 text-center">
          <span className="text-white mr-4">Please RSVP for this Event</span>
          <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-1 rounded text-sm font-semibold transition-colors">
            RSVP NOW
          </button>
        </div>

        {/* <InvitationCardAnimation cardImage={previewData.data?.imageUrl} /> */}

        <Envelope image={imageUrl} />

        <div className="bg-white border-t border-gray-200 p-3 text-left">
          <div className="flex items-center text-xs text-gray-500">
            <span className="mr-2">Powered by</span>
            <span className="font-bold text-gray-700 tracking-wider">INVITELOOP</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageModal;