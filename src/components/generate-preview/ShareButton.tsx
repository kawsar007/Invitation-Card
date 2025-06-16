import { useState } from "react";

const ShareButton = ({ imageUrl, versionNo, className = "" }) => {
  const [isSharing, setIsSharing] = useState(false);

  const handleShare = async () => {
    setIsSharing(true);

    try {
      // Check if Web Share API is supported
      if (navigator.share) {
        // For mobile devices and supported browsers
        await navigator.share({
          title: `Invitation Preview - Version ${versionNo}`,
          text: 'Check out my beautifully crafted invitation!',
          url: imageUrl
        });
      } else {
        // Fallback: Copy link to clipboard
        await navigator.clipboard.writeText(imageUrl);

        // Show temporary success message
        const originalText = document.activeElement.textContent;
        document.activeElement.textContent = 'Link Copied!';
        setTimeout(() => {
          if (document.activeElement.textContent === 'Link Copied!') {
            document.activeElement.textContent = originalText;
          }
        }, 2000);
      }
    } catch (error) {
      console.error('Share failed:', error);
      // Final fallback: open in new tab
      window.open(imageUrl, '_blank');
    } finally {
      setIsSharing(false);
    }
  };

  return (
    <button
      onClick={handleShare}
      disabled={!imageUrl || isSharing}
      className={`${className} ${!imageUrl ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      {isSharing ? (
        <>
          <svg className="w-4 h-4 mr-2 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Sharing...
        </>
      ) : (
        <>
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
          </svg>
          Share
        </>
      )}
    </button>
  );
};
export default ShareButton;