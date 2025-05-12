import VideoPlayer from '@/components/VideoPlayer';

interface VideoSectionProps {
  theme: string;
}

export default function VideoSection({ theme }: VideoSectionProps) {
  return (
    <div className="container mx-auto px-4 pb-16">
      <div className="max-w-4xl mx-auto">
        <div className={`rounded-lg overflow-hidden shadow-xl bg-gradient-to-r ${theme === 'light'
          ? 'from-purple-400 via-pink-400 to-orange-300'
          : 'from-purple-600 via-pink-600 to-orange-500'} p-3`}>
          <VideoPlayer
            src="/public/video.mp4"
            poster="https://tse3.mm.bing.net/th?id=OIF.jEGfTjhsdaAI%2fv%2fkRfaFgg&pid=Api&P=0&h=220"
            className="aspect-video"
          />
        </div>
      </div>
    </div>
  );
}