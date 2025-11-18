import React, { useState, useEffect } from 'react';

export const Letter: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    setMessage(`Hey kichu here,

Welcome to the 20's club finally.
Am super proud of you.

Things will only be tougher from here
but always know that whatever happens,
I will always be by your side as the biggest support.`);
  }, []);

  const handleOpen = () => {
    if (!isOpen) {
      setIsOpen(true);
    }
  };

  return (
    <div className="relative w-full flex flex-col items-center justify-center min-h-[80vh] py-20">
      
      <div className="relative w-[300px] md:w-[500px] h-[200px] md:h-[320px] flex items-center justify-center perspective-1000">
        
        {/* ENVELOPE CONTAINER - Fades out and moves down when open */}
        <div 
            className={`absolute inset-0 w-full h-full transition-all duration-1000 ease-in-out z-20 ${isOpen ? 'opacity-0 translate-y-20 pointer-events-none' : 'opacity-100 hover:scale-105 cursor-pointer'}`}
            onClick={handleOpen}
        >
            {/* Envelope Body */}
            <div className="absolute inset-0 bg-rose-300 rounded-b-lg shadow-2xl"></div>
            
            {/* Flap */}
            <div 
                className="absolute top-0 left-0 w-full h-1/2 bg-rose-400 z-30 origin-top preserve-3d transition-transform duration-700 ease-in-out"
                style={{ 
                    transform: isOpen ? 'rotateX(180deg)' : 'rotateX(0deg)',
                }}
            >
                <div className="absolute inset-0 bg-rose-200 backface-hidden rotate-x-180 rounded-t-lg shadow-inner"></div>
            </div>

            {/* Front Pockets */}
            <div className="absolute bottom-0 left-0 w-full h-full z-40 pointer-events-none">
                 <div className="absolute bottom-0 left-0 w-full h-full bg-rose-400 shadow-sm" style={{ clipPath: 'polygon(0 0, 50% 55%, 0 100%)' }}></div>
                 <div className="absolute bottom-0 right-0 w-full h-full bg-rose-400 shadow-sm" style={{ clipPath: 'polygon(100% 0, 50% 55%, 100% 100%)' }}></div>
                 <div className="absolute bottom-0 left-0 w-full h-full bg-rose-500 shadow-lg" style={{ clipPath: 'polygon(0 100%, 50% 55%, 100% 100%)' }}></div>
            </div>
            
            {/* Wax Seal */}
            <div className={`absolute top-[45%] left-1/2 -translate-x-1/2 w-12 h-12 bg-red-900 rounded-full shadow-xl z-50 flex items-center justify-center text-white/90 border-[2px] border-red-950/30 transition-opacity duration-300 ${isOpen ? 'opacity-0' : 'opacity-100'}`}>
                <span className="font-serif text-lg font-bold">20</span>
            </div>
        </div>

        {/* LETTER PAPER - Slides up and takes center stage */}
        <div 
            className={`absolute left-1/2 -translate-x-1/2 bg-[#fffdf9] text-center transition-all duration-[1.5s] ease-in-out shadow-xl rounded-sm flex items-center justify-center z-10 ${isOpen ? 'w-[90vw] md:w-[600px] h-auto min-h-[400px] translate-y-0 opacity-100' : 'w-[90%] h-[90%] translate-y-0 opacity-0'}`}
            style={{
              top: isOpen ? '50%' : '10px',
              transform: isOpen ? 'translate(-50%, -50%)' : 'translate(-50%, 0)',
            }}
        >
            <div className={`w-full h-full border-double border-4 border-rose-200 p-6 md:p-10 flex flex-col justify-center items-center bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')] transition-opacity duration-1000 delay-500 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
                <h3 className="font-['Playfair_Display'] text-2xl md:text-4xl text-rose-800 mb-4 md:mb-6 font-bold">My Dearest</h3>
                <div className="w-full overflow-y-auto max-h-[60vh] scrollbar-hide">
                    <p className="font-['Dancing_Script'] text-xl md:text-3xl text-gray-800 leading-relaxed text-center px-2 md:px-8 whitespace-pre-line">
                        {message}
                    </p>
                </div>
            </div>
        </div>

      </div>
      
      {/* Scroll Hint (Only shows when letter is open) */}
      <div className={`absolute bottom-10 left-0 w-full transition-all duration-1000 delay-[1500ms] ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="animate-bounce flex flex-col items-center">
            <span className="text-rose-400 font-['Lato'] text-xs uppercase tracking-widest mb-2">Scroll Down</span>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fb7185" strokeWidth="2">
              <path d="M7 13L12 18L17 13M7 6L12 11L17 6" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
        </div>
      </div>
    </div>
  );
};