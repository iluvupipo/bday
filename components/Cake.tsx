import React, { useEffect, useRef, useState } from 'react';
import { AudioHandler } from '../services/audioService';
import { Balloons } from './Balloons';

declare global {
  interface Window {
    confetti: any;
  }
}

export const Cake: React.FC = () => {
  const [candles, setCandles] = useState<boolean[]>([true, true, true, true, true]); 
  // 0 = No blows, 1 = First 3 out, 2 = All out
  const [blowStage, setBlowStage] = useState(0);
  const [isAudioInitialized, setIsAudioInitialized] = useState(false);
  const [forecast, setForecast] = useState<string | null>(null);
  const [showCelebration, setShowCelebration] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  
  const audioHandlerRef = useRef<AudioHandler | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const lastBlowTimeRef = useRef<number>(0);

  const allExtinguished = candles.every(lit => !lit);

  // Trigger Celebration Sequence
  useEffect(() => {
    if (allExtinguished && !showCelebration) {
      // 1. Wait for flame off animation (approx 500ms) + smoke
      // 2. Trigger Confetti
      setTimeout(() => {
        setShowConfetti(true);
        triggerConfetti();
      }, 1000);

      // 3. Set static message and Show Happy Birthday Overlay slowly
      const message = `Happy birthday beboo

No more 19 might sound very overwhelming but its fine, if something comes u can always blame it on it being just on being in our 20s.

20 years in this world, 3 years with you and i wanna spend my rest of all your bdays being your boyfriend and loving you very much.

this is very last miniute so mind all the bugs in website but i love you very much pipo.
umwahhhh <3`;

      setForecast(message);
      setTimeout(() => {
         setShowCelebration(true);
      }, 2500); // Delay text appearance until after confetti pop
    }
  }, [allExtinguished, showCelebration]);

  const triggerConfetti = () => {
    const duration = 5 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 100, scalar: 0.7 };

    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

    const interval: any = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      window.confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
      window.confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
    }, 250);
  };

  const startListening = async () => {
    audioHandlerRef.current = new AudioHandler();
    try {
      await audioHandlerRef.current.initialize();
      setIsAudioInitialized(true);
      detectBlow();
    } catch (err) {
      console.error("Mic error", err);
    }
  };

  const detectBlow = () => {
    if (!audioHandlerRef.current) return;
    
    const vol = audioHandlerRef.current.getVolume();
    const now = Date.now();

    // Threshold set to 12 (balanced).
    // Cooldown set to 4000ms (4 seconds) to strictly prevent double-triggering in one breath.
    if (vol > 12 && (now - lastBlowTimeRef.current > 4000)) { 
        
        setBlowStage(prev => {
            if (prev === 0) {
                // BLOW 1: Extinguish Left 3
                setCandles([false, false, false, true, true]);
                lastBlowTimeRef.current = now;
                return 1;
            } else if (prev === 1) {
                // BLOW 2: Extinguish Remaining
                setCandles([false, false, false, false, false]);
                lastBlowTimeRef.current = now;
                return 2;
            }
            return prev;
        });
    }

    animationFrameRef.current = requestAnimationFrame(detectBlow);
  };

  useEffect(() => {
    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
      audioHandlerRef.current?.cleanup();
    };
  }, []);

  return (
    <div className="w-full flex flex-col items-center justify-center relative z-30">
      
      {showConfetti && <Balloons zIndex={-1} />}

      {/* Celebration Overlay */}
      <div className={`absolute -top-32 md:top-0 left-0 w-full h-full flex flex-col items-center justify-center z-50 transition-all duration-[2000ms] ease-out pointer-events-none ${showCelebration ? 'opacity-100 scale-100' : 'opacity-0 scale-95 translate-y-10'}`}>
          <h1 className="font-['Playfair_Display'] text-5xl md:text-8xl text-rose-500 mb-4 md:mb-8 drop-shadow-sm font-bold text-center px-4">Happy Birthday!</h1>
          {forecast && (
            <div className="bg-white/90 backdrop-blur-md p-6 md:p-8 rounded-xl shadow-2xl max-w-xs md:max-w-lg border border-rose-100 mx-4 text-center animate-[float_6s_ease-in-out_infinite] pointer-events-auto">
                <h3 className="font-['Dancing_Script'] text-2xl md:text-3xl text-rose-800 mb-3">A note for you</h3>
                <p className="font-['Lato'] text-sm md:text-lg text-gray-700 leading-relaxed whitespace-pre-line">{forecast}</p>
            </div>
          )}
      </div>
      
      {/* Controls */}
      <div className={`relative z-40 text-center mb-8 md:mb-12 transition-all duration-1000 ${showCelebration ? 'opacity-0 -translate-y-10' : 'opacity-100'}`}>
          <h2 className="font-['Playfair_Display'] text-4xl md:text-6xl text-rose-900 mb-4 md:mb-6">Make a Wish</h2>
          
          {!isAudioInitialized && !allExtinguished && (
             <div className="flex flex-col gap-4 justify-center items-center">
                <button 
                    onClick={startListening}
                    className="px-6 py-3 md:px-8 md:py-3 bg-rose-500 text-white rounded-full font-['Lato'] shadow-lg hover:bg-rose-600 hover:scale-105 transition-all active:scale-95 text-sm md:text-base"
                >
                    Enable Microphone
                </button>
             </div>
          )}
          
          {isAudioInitialized && !allExtinguished && (
            <div className="flex flex-col items-center gap-2">
                <p className="font-['Lato'] text-rose-400 animate-pulse">
                    {blowStage === 0 ? "Blow gently..." : "Wait for it... Blow again!"}
                </p>
            </div>
          )}
      </div>

      {/* 3D CAKE CONTAINER */}
      <div className={`relative w-[300px] h-[300px] transition-all duration-[1500ms] md:scale-100 scale-75 ${showCelebration ? 'blur-sm grayscale-[0.3] scale-75 md:scale-90 opacity-50' : ''}`}>
         
         <div className="absolute bottom-[-20px] left-1/2 -translate-x-1/2 w-[380px] h-[140px] bg-white rounded-[50%] shadow-2xl border border-gray-100 z-0"></div>

         {/* BOTTOM TIER */}
         <div className="absolute bottom-[20px] left-1/2 -translate-x-1/2 w-[280px] z-10">
             <div className="w-full h-[100px] bg-gradient-to-b from-rose-400 to-rose-500 rounded-[50%_50%_50%_50%_/_20%_20%_20%_20%] shadow-xl"></div>
             <div className="absolute top-0 w-full h-[60px] bg-rose-400 rounded-[50%] shadow-inner"></div>
         </div>

         {/* MIDDLE TIER */}
         <div className="absolute bottom-[80px] left-1/2 -translate-x-1/2 w-[200px] z-20">
             <div className="w-full h-[90px] bg-gradient-to-b from-rose-300 to-rose-400 rounded-[50%_50%_50%_50%_/_20%_20%_20%_20%] shadow-xl"></div>
             <div className="absolute top-0 w-full h-[50px] bg-rose-300 rounded-[50%] shadow-inner"></div>
         </div>

         {/* TOP TIER */}
         <div className="absolute bottom-[140px] left-1/2 -translate-x-1/2 w-[130px] z-30">
             <div className="w-full h-[80px] bg-gradient-to-b from-rose-200 to-rose-300 rounded-[50%_50%_50%_50%_/_20%_20%_20%_20%] shadow-xl"></div>
             <div className="absolute top-0 w-full h-[40px] bg-rose-200 rounded-[50%] shadow-inner flex items-center justify-center">
                 <div className="absolute top-0 left-0 w-full h-full bg-white/30 rounded-[50%] scale-[0.8]"></div>
             </div>
             
             {/* CANDLES */}
             <div className="absolute top-[-25px] left-0 w-full h-full z-40 flex justify-center items-end pb-8 gap-3 px-2">
                {candles.map((isLit, i) => (
                    <div key={i} className="relative flex flex-col items-center" style={{ marginBottom: `${Math.abs(i - 2) * -5}px` }}>
                        
                        {/* Smoke Effect */}
                        <div className={`absolute bottom-[100%] w-4 h-10 bg-gray-200 rounded-full blur-md opacity-0 transition-all duration-[1500ms] ${!isLit && allExtinguished === false ? 'animate-[smoke_2s_ease-out]' : ''}`} style={{ animationDelay: `${i * 100}ms`}}></div>
                        <div className={`absolute bottom-[100%] w-4 h-10 bg-gray-200 rounded-full blur-md opacity-0 transition-all duration-[1500ms] ${!isLit && allExtinguished ? 'animate-[smoke_2s_ease-out]' : ''}`} style={{ animationDelay: `${i * 100}ms`}}></div>

                        {/* Flame */}
                        <div className={`w-3 h-5 bg-gradient-to-t from-orange-500 to-yellow-300 rounded-[50%] origin-bottom transition-all duration-500 ease-in-out ${isLit ? 'opacity-100 scale-100 animate-flicker' : 'opacity-0 scale-0'}`}
                             style={{ boxShadow: isLit ? '0 0 20px 5px rgba(255, 165, 0, 0.5)' : 'none' }}></div>
                        
                        <div className="w-[2px] h-3 bg-gray-800/80"></div>
                        <div className="w-3 h-10 bg-gradient-to-r from-pink-100 to-pink-50 border border-pink-200 rounded-sm shadow-sm"></div>
                    </div>
                ))}
             </div>
         </div>

      </div>
      <style>{`
        @keyframes smoke {
            0% { opacity: 0.6; transform: translateY(0) scale(1); }
            100% { opacity: 0; transform: translateY(-40px) scale(2); }
        }
      `}</style>
    </div>
  );
};