import { Button } from '@/components/ui/button';

interface FeedbackButtonProps {
  theme: string;
}

export default function FeedbackButton({ theme }: FeedbackButtonProps) {
  return (
    <div className="fixed bottom-4 right-4">
      <Button
        className={`rounded-full px-4 py-2 text-white ${theme === 'light' ? 'bg-gray-800' : 'bg-gray-700'} hover:bg-gray-700 dark:hover:bg-gray-600 flex items-center space-x-2`}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M20 2H4C2.9 2 2 2.9 2 4V22L6 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2ZM20 16H6L4 18V4H20V16Z" fill="currentColor" />
        </svg>
        <span>Feedback</span>
      </Button>
    </div>
  );
}