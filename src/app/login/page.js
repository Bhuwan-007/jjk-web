"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import ShrineBackground from "./ShrineBackground";

export default function LoginPage() {
  const [slashes, setSlashes] = useState([]);
  const [shards, setShards] = useState([]);
  const [scars, setScars] = useState([]); // NEW: Tracks the holes left behind
  
  const timerRef = useRef(null);
  const isLongPress = useRef(false);

  // When the mouse presses DOWN
  const handlePointerDown = (e) => {
    isLongPress.current = false;
    
    // Start charging the massive attack... (350ms)
    timerRef.current = setTimeout(() => {
      isLongPress.current = true;
      
      const newSlash = {
        id: Date.now(),
        x: e.clientX,
        y: e.clientY,
        rotation: Math.random() * 360,
        length: Math.floor(Math.random() * 400) + 400,
        thickness: Math.floor(Math.random() * 20) + 25,
      };
      setSlashes((prev) => [...prev, newSlash]);
    }, 350); 
  };

  // When the mouse lets GO
  const handlePointerUp = (e) => {
    clearTimeout(timerRef.current);

    if (!isLongPress.current) {
      const isCleave = Math.random() > 0.5;

      if (isCleave) {
        // NORMAL CLEAVE
        const newSlash = {
          id: Date.now(),
          x: e.clientX,
          y: e.clientY,
          rotation: Math.random() * 360,
          length: Math.floor(Math.random() * 200) + 150,
          thickness: Math.floor(Math.random() * 8) + 12,
        };
        setSlashes((prev) => [...prev, newSlash]);

      } else {
        // DISMANTLE: SHARD & SCAR
        const uniqueId = Date.now();
        const randomSize = Math.floor(Math.random() * 80) + 60;
        const randomRotation = Math.random() * 360;
        // Generate ONE shape to be used by both the floating glass and the hole left behind
        const sharedClipPath = `polygon(${Math.random() * 20}% 0%, ${80 + Math.random() * 20}% ${Math.random() * 20}%, ${80 + Math.random() * 20}% ${80 + Math.random() * 20}%, 0% ${80 + Math.random() * 20}%)`;

        // 1. The Floating Glass
        const newShard = {
          id: uniqueId,
          x: e.clientX,
          y: e.clientY,
          size: randomSize,
          rotation: randomRotation,
          clipPath: sharedClipPath,
          // Massive drift coordinates covering the entire monitor
          floatX: (Math.random() - 0.5) * window.innerWidth * 1.2, 
          floatY: (Math.random() - 0.5) * window.innerHeight * 1.2, 
          floatRotation: (Math.random() - 0.5) * 180, 
        };
        
        // 2. The Void Left Behind
        const newScar = {
          id: uniqueId,
          x: e.clientX,
          y: e.clientY,
          size: randomSize,
          rotation: randomRotation,
          clipPath: sharedClipPath,
        };

        setShards((prev) => [...prev, newShard]);
        setScars((prev) => [...prev, newScar]); // Render the hole permanently
      }
    }
  };

  return (
    <div 
      className="relative w-screen h-screen overflow-hidden bg-black cursor-crosshair touch-none select-none"
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onContextMenu={(e) => e.preventDefault()}
    >
      <div className="absolute inset-0 z-0 pointer-events-none">
        <ShrineBackground />
      </div>

      {/* Layer 1: The Void Holes (Rendered underneath everything so things float over them) */}
      {scars.map((scar) => (
        <DismantleScar key={`scar-${scar.id}`} scar={scar} />
      ))}

      {/* Layer 2: The Black Diamond Cleaves */}
      {slashes.map((slash) => (
        <SlashEffect key={`slash-${slash.id}`} slash={slash} />
      ))}

      {/* Layer 3: The Floating Glass Shards */}
      {shards.map((shard) => (
        <ScreenShard key={`shard-${shard.id}`} shard={shard} />
      ))}

      {/* UI Overlay */}
      {/* UI Overlay: The Login Form */}
      <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
        
        {/* 1. bg-transparent makes the box invisible.
          2. onPointerDown & onPointerUp stop clicks inside the box from triggering Slashes!
        */}
        <div 
          className="p-8 w-full max-w-md bg-transparent border border-red-900/50 rounded-xl pointer-events-auto shadow-[0_0_50px_rgba(220,0,0,0.15)] flex flex-col items-center backdrop-blur-[2px]"
          onPointerDown={(e) => e.stopPropagation()}
          onPointerUp={(e) => e.stopPropagation()}
        >
          <h1 className="text-3xl text-red-600 font-bold tracking-widest mb-2 text-center drop-shadow-[0_0_15px_rgba(200,0,0,0.8)]">
            MALEVOLENT SHRINE
          </h1>
          <p className="text-red-800/80 text-sm tracking-widest mb-8 text-center uppercase">
            Authenticate Cursed Energy
          </p>

          {/* The Actual Form Inputs */}
          <form className="w-full space-y-6" onSubmit={(e) => e.preventDefault()}>
            
            <div className="space-y-2">
              <label className="text-red-500 text-xs tracking-widest uppercase ml-1">Sorcerer ID (Email)</label>
              <input 
                type="email" 
                placeholder="Enter your email"
                className="w-full bg-black/40 border border-red-950 text-red-200 px-4 py-3 rounded-md focus:outline-none focus:border-red-600 focus:shadow-[0_0_15px_rgba(200,0,0,0.4)] transition-all placeholder-red-950/50"
              />
            </div>

            <div className="space-y-2">
              <label className="text-red-500 text-xs tracking-widest uppercase ml-1">Cursed Seal (Password)</label>
              <input 
                type="password" 
                placeholder="••••••••"
                className="w-full bg-black/40 border border-red-950 text-red-200 px-4 py-3 rounded-md focus:outline-none focus:border-red-600 focus:shadow-[0_0_15px_rgba(200,0,0,0.4)] transition-all placeholder-red-950/50"
              />
            </div>

            <button 
              type="submit"
              className="w-full mt-4 py-4 px-8 bg-red-950/80 hover:bg-red-800 text-red-200 font-bold tracking-widest transition-all duration-300 border border-red-800 hover:shadow-[0_0_25px_rgba(220,0,0,0.6)] rounded-md"
            >
              MANIFEST DOMAIN
            </button>
          </form>

        </div>
      </div>
    </div>
  );
}

// ----------------------------------------------------------------------
// 1. The Cleave (Black Diamond)
// ----------------------------------------------------------------------
function SlashEffect({ slash }) {
  return (
    <div style={{ position: "fixed", left: slash.x, top: slash.y, zIndex: 10, pointerEvents: "none" }}>
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
        transition={{ duration: 0.08, ease: "easeIn" }}
        style={{
          position: "absolute", left: -slash.length / 2, top: -slash.thickness / 2,
          width: `${slash.length}px`, height: `${slash.thickness}px`,
          rotate: slash.rotation, transformOrigin: "center center",
          clipPath: "polygon(0% 50%, 50% 0%, 100% 50%, 50% 100%)",
          backgroundColor: "#000000", display: "flex", alignItems: "center", justifyContent: "center",
          filter: "drop-shadow(0px 0px 8px rgba(180, 0, 0, 1))",
        }}
      >
        <div style={{ width: "75%", height: "10%", backgroundColor: "#ffffff", borderRadius: "50%", boxShadow: "0px 0px 12px 4px rgba(220, 20, 20, 0.9)" }} />
      </motion.div>
    </div>
  );
}

// ----------------------------------------------------------------------
// 2. NEW: The Dismantle Scar (The Hole Left Behind)
// ----------------------------------------------------------------------
function DismantleScar({ scar }) {
  return (
    <div style={{ position: "fixed", left: scar.x, top: scar.y, zIndex: 5, pointerEvents: "none" }}>
      <div
        style={{
          position: "absolute",
          transform: `translate(-50%, -50%) rotate(${scar.rotation}deg)`,
          transformOrigin: "center center",
          // The minor darkish-white glow radiating from the void
          filter: "drop-shadow(0px 0px 4px rgba(200, 200, 255, 0.4))",
        }}
      >
        <div
          style={{
            width: `${scar.size}px`, height: `${scar.size}px`,
            clipPath: scar.clipPath,
            // Pure pitch black to look like an empty hole in reality
            backgroundColor: "#000000",
          }}
        />
      </div>
    </div>
  );
}

// ----------------------------------------------------------------------
// 3. The Floating Glass Shard (Zero Gravity)
// ----------------------------------------------------------------------
function ScreenShard({ shard }) {
  return (
    <div style={{ position: "fixed", left: shard.x, top: shard.y, zIndex: 15, pointerEvents: "none" }}>
      <motion.div
        initial={{ x: "-50%", y: "-50%", rotate: shard.rotation, scale: 0.5, opacity: 0 }}
        animate={{ 
          x: `calc(-50% + ${shard.floatX}px)`, 
          y: `calc(-50% + ${shard.floatY}px)`, 
          rotate: shard.rotation + shard.floatRotation,
          scale: 1, opacity: 1 
        }}
        transition={{ 
          scale: { duration: 0.2 }, opacity: { duration: 0.2 },
          // Massive durations (15 to 35 seconds) keep the speed incredibly slow across the huge screen
          x: { duration: 20 + Math.random() * 15, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" },
          y: { duration: 20 + Math.random() * 15, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" },
          rotate: { duration: 25 + Math.random() * 10, repeat: Infinity, repeatType: "mirror", ease: "linear" },
        }}
        style={{
          position: "absolute",
          width: `${shard.size}px`, height: `${shard.size}px`,
          clipPath: shard.clipPath,
          backdropFilter: "blur(12px) brightness(1.2)", WebkitBackdropFilter: "blur(12px) brightness(1.2)",
          border: "1px solid rgba(255, 255, 255, 0.2)", backgroundColor: "rgba(255, 255, 255, 0.05)",
          boxShadow: "0 10px 30px rgba(0,0,0,0.5)", 
        }}
      />
    </div>
  );
}