import React from 'react';
import { Balloons } from './components/Balloons';
import { Letter } from './components/Letter';
import { Gallery } from './components/Gallery';
import { Cake } from './components/Cake';

function App() {
  return (
    <main className="relative w-full min-h-screen bg-[#fff1f2] scroll-smooth">
      {/* Global Background Texture */}
      <div className="fixed inset-0 pointer-events-none z-0 bg-[url('https://www.transparenttextures.com/patterns/snow.png')] opacity-30"></div>
      
      {/* Balloons (Fixed Background) */}
      <Balloons />

      <div className="relative z-10 flex flex-col w-full">
        
        {/* SECTION 1: LETTER */}
        <section className="w-full min-h-screen flex items-center justify-center p-4">
          <Letter />
        </section>

        {/* SECTION 2: GALLERY */}
        <section className="w-full min-h-screen flex items-center justify-center p-4">
          <Gallery />
        </section>

        {/* SECTION 3: CAKE */}
        <section className="w-full min-h-screen flex items-center justify-center p-4 mb-20">
          <Cake />
        </section>

      </div>

      {/* Footer Credit */}
      <div className="fixed bottom-4 right-4 z-50 opacity-50 hover:opacity-100 transition-opacity pointer-events-none md:pointer-events-auto">
          <div className="bg-white/60 backdrop-blur-md px-3 py-1 rounded-full shadow-sm text-[10px] text-rose-400 font-bold cursor-default tracking-widest uppercase">
              Made for You
          </div>
      </div>
    </main>
  );
}

export default App;