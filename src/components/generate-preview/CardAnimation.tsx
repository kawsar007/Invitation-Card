import React, { useEffect, useRef, useState } from 'react';

interface InvitationCardAnimationProps {
  coverImage?: string;
  cardImage?: string;
  autoPlay?: boolean;
  fromName?: string;
}

const InvitationCardAnimation: React.FC<InvitationCardAnimationProps> = ({
  coverImage = "https://images.greetingsisland.com/images/invitations/birthday/previews/rainbows-and-magic-44244.jpeg?auto=format,compress",
  cardImage,
  fromName,
  autoPlay = true
}) => {
  console.log(cardImage);

  const [animationPhase, setAnimationPhase] = useState<'idle' | 'envelope-shake' | 'flap-open' | 'card-peek' | 'card-emerge' | 'card-slide' | 'complete'>('idle');
  const [showCard, setShowCard] = useState(false);
  const timeoutRefs = useRef<NodeJS.Timeout[]>([]);

  const clearAllTimeouts = () => {
    timeoutRefs.current.forEach(clearTimeout);
    timeoutRefs.current = [];
  };

  const addTimeout = (callback: () => void, delay: number) => {
    const timeout = setTimeout(callback, delay);
    timeoutRefs.current.push(timeout);
    return timeout;
  };

  useEffect(() => {
    if (!autoPlay) return;

    clearAllTimeouts();

    const animationSequence = async () => {
      // Phase 1: Envelope shake (attention grabber)
      setAnimationPhase('envelope-shake');
      await new Promise<void>(resolve => addTimeout(() => resolve(), 800));

      // Phase 2: Flap opens with anticipation
      setAnimationPhase('flap-open');
      await new Promise<void>(resolve => addTimeout(() => resolve(), 800));

      // Phase 3: Card peeks out slightly
      setAnimationPhase('card-peek');
      setShowCard(true);
      await new Promise<void>(resolve => addTimeout(() => resolve(), 600));

      // Phase 4: Card emerges more from envelope
      setAnimationPhase('card-emerge');
      await new Promise<void>(resolve => addTimeout(() => resolve(), 800));

      // Phase 5: Card slides smoothly to the right
      setAnimationPhase('card-slide');
      await new Promise<void>(resolve => addTimeout(() => resolve(), 1000));

      // Phase 6: Complete state
      setAnimationPhase('complete');
    };

    animationSequence();

    return clearAllTimeouts;
  }, [autoPlay]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[600px] bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4">
      {/* Background Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white opacity-20 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}
          />
        ))}
      </div>

      <div className="relative w-full h-[500px] flex items-center justify-center">
        <div className="relative w-[900px] h-[320px] flex items-center justify-center">
          {/* Envelope Container - Positioned on Left */}
          <div
            className={`absolute left-0 top-1/2 transform -translate-y-1/2 w-[400px] h-[280px] transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${animationPhase === 'envelope-shake' ? 'animate-subtle-shake' : ''
              }`}
          >
            {/* Envelope Shadow */}
            <div className="absolute inset-0 bg-black/20 rounded-2xl blur-xl transform translate-y-8 scale-110"></div>

            {/* Envelope Body */}
            <div className="relative w-full h-full bg-gradient-to-br from-amber-50 to-amber-100 rounded-2xl shadow-2xl border border-amber-200/50 overflow-hidden">
              {/* Envelope Pattern */}
              <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,0,0,0.1)_1px,transparent_1px)] bg-[length:20px_20px]"></div>
              </div>

              {/* Cover Image Preview */}
              <div className={`absolute inset-6 transition-all duration-1000 rounded-xl overflow-hidden ${animationPhase === 'idle' || animationPhase === 'envelope-shake' ?
                'opacity-40 scale-95' : 'opacity-20 scale-100'
                }`}>
                <img
                  src={coverImage}
                  alt="Cover Preview"
                  className="w-full h-full object-cover rounded-xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
              </div>

              {/* Envelope Flap */}
              <div className={`absolute -top-6 left-0 right-0 h-24 bg-gradient-to-br from-amber-100 to-amber-200 transition-all duration-1000 ease-[cubic-bezier(0.34,1.56,0.64,1)] origin-bottom ${animationPhase === 'idle' || animationPhase === 'envelope-shake' ?
                'rotate-0' :
                animationPhase === 'flap-open' ?
                  '-rotate-12 scale-105' :
                  '-rotate-45 scale-110'
                } rounded-t-2xl border border-amber-200/50 shadow-xl z-20`}>
                {/* Wax Seal */}
                <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-500 ${animationPhase === 'flap-open' ?
                  'scale-0 rotate-180 opacity-0' :
                  'scale-100 rotate-0 opacity-100'
                  }`}>
                  <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-700 rounded-full shadow-lg flex items-center justify-center border-2 border-red-400">
                    <div className="w-6 h-6 bg-red-600 rounded-full relative">
                      <div className="absolute inset-1 bg-red-500 rounded-full"></div>
                    </div>
                  </div>
                </div>

                {/* Flap Highlight */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
              </div>
            </div>
          </div>

          {/* Card Animation - Realistic Pull-Out Effect */}
          <div
            className={`absolute transition-all ease-[cubic-bezier(0.33,1,0.68,1)] ${showCard ? 'opacity-100' : 'opacity-0'
              } ${
              // Card starts inside envelope, then gradually emerges and slides to right
              animationPhase === 'card-peek' ?
                'left-[320px] top-1/2 transform -translate-y-1/2 -translate-x-1/2 scale-90 -rotate-3 duration-600' :
                animationPhase === 'card-emerge' ?
                  'left-[380px] top-1/2 transform -translate-y-1/2 -translate-x-1/2 scale-95 rotate-0 duration-800' :
                  animationPhase === 'card-slide' ?
                    'left-[600px] top-1/2 transform -translate-y-1/2 -translate-x-1/2 scale-100 rotate-0 duration-1000' :
                    animationPhase === 'complete' ?
                      'left-[600px] top-1/2 transform -translate-y-1/2 -translate-x-1/2 scale-100 rotate-0 duration-300' :
                      'left-[300px] top-1/2 transform -translate-y-1/2 -translate-x-1/2 scale-80 -rotate-3 duration-400'
              }`}
          >
            {/* Card Shadow - Follows card movement */}
            <div className={`absolute bg-black/25 rounded-3xl blur-xl transition-all ease-out ${animationPhase === 'card-peek' ?
              'inset-0 translate-y-6 translate-x-1 scale-100 duration-600' :
              animationPhase === 'card-emerge' ?
                'inset-0 translate-y-8 translate-x-2 scale-105 duration-800' :
                animationPhase === 'card-slide' ?
                  'inset-0 translate-y-10 translate-x-3 scale-110 duration-1000' :
                  'inset-0 translate-y-12 translate-x-4 scale-115 duration-500'
              }`}></div>

            {/* Main Card */}
            <div className={`relative w-[380px] h-[270px] transition-all ease-[cubic-bezier(0.33,1,0.68,1)] ${animationPhase === 'complete' ?
              'animate-gentle-float duration-1000' : 'duration-400'
              }`}>
              <div className={`absolute inset-0 bg-white rounded-3xl shadow-2xl transition-all duration-1000 overflow-hidden border ${animationPhase === 'complete' ?
                'border-purple-200 shadow-purple-500/25 shadow-2xl' :
                'border-gray-200'
                }`}>
                {/* Card Image */}
                <img
                  src={cardImage}
                  alt="Invitation Card"
                  className="w-full h-full object-cover rounded-3xl"
                />

                {/* Premium Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-white/10"></div>

                {/* Shimmer Effect - Only during slide */}
                <div className={`absolute inset-0 transition-all duration-800 ${animationPhase === 'card-slide' ?
                  'animate-shimmer-professional' : 'opacity-0'
                  }`}>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent -skew-x-12 transform -translate-x-full"></div>
                </div>

                {/* Glow Effect */}
                <div className={`absolute -inset-1 bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 rounded-3xl blur-lg transition-all duration-1000 -z-10 ${animationPhase === 'complete' ?
                  'opacity-60 animate-pulse' : 'opacity-0'
                  }`}></div>
              </div>

              {/* Floating Elements - Only appear after card is placed */}
              {animationPhase === 'complete' && (
                <>
                  <div className="absolute -top-6 -left-6 w-4 h-4 bg-yellow-400 rounded-full animate-float-1 shadow-lg opacity-0 animate-fade-in"></div>
                  <div className="absolute -top-4 -right-8 w-3 h-3 bg-pink-400 rounded-full animate-float-2 shadow-lg opacity-0 animate-fade-in" style={{ animationDelay: '0.2s' }}></div>
                  <div className="absolute -bottom-4 -left-4 w-5 h-5 bg-blue-400 rounded-full animate-float-3 shadow-lg opacity-0 animate-fade-in" style={{ animationDelay: '0.4s' }}></div>
                  <div className="absolute -bottom-6 -right-6 w-3 h-3 bg-green-400 rounded-full animate-float-4 shadow-lg opacity-0 animate-fade-in" style={{ animationDelay: '0.6s' }}></div>
                  <div className="absolute top-4 -right-2 w-2 h-2 bg-purple-400 rounded-full animate-float-5 shadow-lg opacity-0 animate-fade-in" style={{ animationDelay: '0.8s' }}></div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes subtle-shake {
          0%, 100% { transform: translateX(0) translateY(-50%) rotate(0deg); }
          20% { transform: translateX(-3px) translateY(-50%) rotate(-0.5deg); }
          40% { transform: translateX(3px) translateY(-50%) rotate(0.5deg); }
          60% { transform: translateX(-2px) translateY(-50%) rotate(-0.3deg); }
          80% { transform: translateX(2px) translateY(-50%) rotate(0.3deg); }
        }
        
        @keyframes shimmer-professional {
          0% { transform: translateX(-100%) skewX(-12deg); }
          100% { transform: translateX(200%) skewX(-12deg); }
        }
        
        @keyframes gentle-float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-8px) rotate(0.5deg); }
        }
        
        @keyframes float-1 {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          33% { transform: translate(10px, -10px) rotate(120deg); }
          66% { transform: translate(-5px, -15px) rotate(240deg); }
        }
        
        @keyframes float-2 {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          33% { transform: translate(-12px, 8px) rotate(-120deg); }
          66% { transform: translate(8px, -12px) rotate(-240deg); }
        }
        
        @keyframes float-3 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(15px, -20px) scale(1.2); }
        }
        
        @keyframes float-4 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-10px, 15px) scale(0.8); }
        }
        
        @keyframes float-5 {
          0%, 100% { transform: translate(0, 0) rotate(0deg) scale(1); }
          25% { transform: translate(8px, -8px) rotate(90deg) scale(1.1); }
          50% { transform: translate(-8px, -8px) rotate(180deg) scale(0.9); }
          75% { transform: translate(-8px, 8px) rotate(270deg) scale(1.1); }
        }
        
        .animate-subtle-shake {
          animation: subtle-shake 0.8s ease-in-out;
        }
        
        .animate-shimmer-professional {
          animation: shimmer-professional 1.5s ease-out;
        }
        
        .animate-gentle-float {
          animation: gentle-float 4s ease-in-out infinite;
        }
        
        .animate-float-1 {
          animation: float-1 6s ease-in-out infinite;
        }
        
        .animate-float-2 {
          animation: float-2 7s ease-in-out infinite;
        }
        
        .animate-float-3 {
          animation: float-3 5s ease-in-out infinite;
        }
        
        .animate-float-4 {
          animation: float-4 8s ease-in-out infinite;
        }
        
        .animate-float-5 {
          animation: float-5 4s ease-in-out infinite;
        }
        
        @keyframes fade-in {
          0% { opacity: 0; transform: scale(0.8) translateY(10px); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }
        
        .animate-fade-in {
          animation: fade-in 0.6s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default InvitationCardAnimation;