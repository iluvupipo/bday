import React, { useState } from 'react';
import { Photo } from '../types';

const PHOTOS: Photo[] = [
  { id: 1, url: "./photo1.jpg", caption: "bebooooo :3" },
  { id: 2, url: "./photo2.jpg", caption: "I" },
  { id: 3, url: "./photo3.jpg", caption: "Love" },
  { id: 4, url: "./photo4.jpg", caption: "You" },
  { id: 5, url: "./photo5.jpg", caption: "very much <3" },
];

export const Gallery: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextPhoto = () => {
    setCurrentIndex((prev) => (prev + 1) % PHOTOS.length);
  };

  const prevPhoto = () => {
    setCurrentIndex((prev) => (prev - 1 + PHOTOS.length) % PHOTOS.length);
  };

  const currentPhoto = PHOTOS[currentIndex];

  return (
    <div className="w-full h-full flex flex-col items-center justify-center relative py-10">
      
      <h2 className="font-['Playfair_Display'] text-3xl md:text-5xl text-rose-900 mb-8 md:mb-12">Our Story Book</h2>

      {/* BOOK CONTAINER */}
      <div className="relative w-[320px] md:w-[700px] h-[450px] md:h-[450px] perspective-1000">
         
         {/* BOOK BINDING / COVER SHADOW */}
         <div className="absolute top-2 left-2 w-full h-full bg-rose-900/20 rounded-r-md rounded-l-sm transform rotate-1 z-0"></div>
         
         {/* OPEN BOOK */}
         <div className="relative w-full h-full flex bg-[#fdfbf7] rounded-r-md rounded-l-sm shadow-2xl overflow-hidden border border-[#e8e4d9]">
            
            {/* SPINE (Middle) - Desktop Only */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-8 bg-gradient-to-r from-gray-200 via-white to-gray-200 -translate-x-1/2 z-20 shadow-inner"></div>

            {/* LEFT PAGE (Text) - Hidden on small mobile, visible on Desktop */}
            <div className="hidden md:flex w-1/2 h-full p-8 flex-col justify-center items-center text-center bg-[url('https://www.transparenttextures.com/patterns/paper.png')]">
                <div className="border-2 border-rose-900/10 p-6 w-full h-full flex flex-col justify-center">
                  <span className="font-['Lato'] text-rose-400 tracking-[0.2em] text-sm uppercase mb-4">Page {currentIndex + 1} of {PHOTOS.length}</span>
                  <h3 className="font-['Playfair_Display'] text-4xl text-rose-800 mb-6 italic">"{currentPhoto.caption}"</h3>
                  <div className="w-16 h-[1px] bg-rose-300 mx-auto"></div>
                </div>
            </div>

            {/* RIGHT PAGE (Photo) - Full width on mobile */}
            <div className="w-full md:w-1/2 h-full p-4 md:p-6 bg-[url('https://www.transparenttextures.com/patterns/paper.png')] relative">
                
                {/* Mobile Caption Overlay */}
                <div className="md:hidden absolute top-6 left-0 w-full text-center z-10">
                     <h3 className="font-['Playfair_Display'] text-2xl text-rose-800 bg-white/80 backdrop-blur-sm py-2 px-4 inline-block shadow-sm rounded-full">{currentPhoto.caption}</h3>
                </div>

                {/* Stacked Pages Effect */}
                <div className="absolute right-0 top-0 bottom-0 w-2 md:w-4 bg-gradient-to-l from-gray-200 to-white border-l border-gray-300"></div>

                {/* Photo Area */}
                <div className="w-full h-full p-2 bg-white shadow-sm rotate-1 transition-all duration-500">
                    <img 
                      key={currentIndex} // Trigger animation on change
                      src={currentPhoto.url} 
                      alt="Memory" 
                      className="w-full h-full object-cover animate-[fadeIn_0.7s_ease-in-out]"
                      onError={(e) => {
                        // Fallback if image is missing
                        (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?q=80&w=600&auto=format&fit=crop";
                      }}
                    />
                </div>
            </div>

         </div>

         {/* CONTROLS */}
         <div className="absolute -bottom-16 w-full flex justify-center gap-8 items-center">
             <button 
                onClick={prevPhoto}
                className="p-3 rounded-full bg-white text-rose-500 shadow-lg hover:scale-110 transition-transform border border-rose-100 active:scale-95"
             >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18L9 12L15 6" strokeLinecap="round" strokeLinejoin="round"/></svg>
             </button>
             
             <span className="font-['Lato'] text-rose-400 text-sm">Flip Page</span>

             <button 
                onClick={nextPhoto}
                className="p-3 rounded-full bg-white text-rose-500 shadow-lg hover:scale-110 transition-transform border border-rose-100 active:scale-95"
             >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18L15 12L9 6" strokeLinecap="round" strokeLinejoin="round"/></svg>
             </button>
         </div>

      </div>
      <style>{`
        @keyframes fadeIn {
            from { opacity: 0.6; filter: blur(2px); transform: scale(0.98); }
            to { opacity: 1; filter: blur(0); transform: scale(1); }
        }
      `}</style>
    </div>
  );
};