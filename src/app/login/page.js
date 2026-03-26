"use client";

import { useState, useRef, useEffect } from "react";
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

      <CursedTrail />

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
        
        {/* THE LOGIN FORM (Now perfectly centered alone) */}
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

          <form className="w-full space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div className="space-y-2">
              <label className="text-red-500 text-xs tracking-widest uppercase ml-1">Sorcerer ID (Email)</label>
              <input 
                type="email" 
                placeholder="Enter your email"
                className="w-full bg-black/80 border border-red-950 text-red-200 px-4 py-3 rounded-md focus:outline-none focus:border-red-600 focus:shadow-[0_0_15px_rgba(200,0,0,0.4)] transition-all placeholder-red-950/50"
              />
            </div>
            <div className="space-y-2">
              <label className="text-red-500 text-xs tracking-widest uppercase ml-1">Cursed Seal (Password)</label>
              <input 
                type="password" 
                placeholder="••••••••"
                className="w-full bg-black/80 border border-red-950 text-red-200 px-4 py-3 rounded-md focus:outline-none focus:border-red-600 focus:shadow-[0_0_15px_rgba(200,0,0,0.4)] transition-all placeholder-red-950/50"
              />
            </div>
            <button 
              type="submit"
              className="w-full mt-4 py-4 px-8 bg-red-950/80 hover:bg-red-800 text-red-200 font-bold tracking-widest transition-all duration-300 border border-red-800 hover:shadow-[0_0_25px_rgba(220,0,0,0.6)] rounded-md"
            >
              Enter the World
            </button>
          </form>
        </div>

        {/* The Bottom Navigation Footer */}
        <div className="absolute bottom-8 left-0 w-full px-12 grid grid-cols-3 items-end pointer-events-none">
          <div className="flex justify-start pointer-events-auto">
            <button 
              className="text-red-600/60 hover:text-red-400 text-xs tracking-[0.3em] font-bold uppercase transition-all duration-300 hover:drop-shadow-[0_0_8px_rgba(220,38,38,0.8)]"
              onPointerDown={(e) => e.stopPropagation()}
            >
              About Project
            </button>
          </div>
          <div className="flex justify-center pointer-events-auto">
            <button 
              className="text-red-500 hover:text-white text-sm tracking-[0.4em] font-bold uppercase transition-all duration-300 border-b border-red-900/0 hover:border-red-500 pb-1 hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]"
              onPointerDown={(e) => e.stopPropagation()}
            >
              Register Sorcerer
            </button>
          </div>
          <div className="flex justify-end pointer-events-auto">
            <button 
              className="text-red-600/60 hover:text-red-400 text-xs tracking-[0.3em] font-bold uppercase transition-all duration-300 hover:drop-shadow-[0_0_8px_rgba(220,38,38,0.8)]"
              onPointerDown={(e) => e.stopPropagation()}
            >
              Developer Profile
            </button>
          </div>
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
// ----------------------------------------------------------------------
// 4. NEW: High-Performance Cursed Energy Mouse Trail
// ----------------------------------------------------------------------
function CursedTrail() {
  const { useEffect } = require("react"); // Make sure useEffect is imported at the top of your file if it isn't already!

  useEffect(() => {
    // Start the trail in the center of the screen
    const coords = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const circles = [];
    const numCircles = 20; // Length of the tail

    // Create the HTML elements for the tail dynamically
    for (let i = 0; i < numCircles; i++) {
      const el = document.createElement("div");
      
      // Styling the cursed energy aesthetic
      el.className = "pointer-events-none fixed top-0 left-0 z-50  bg-black";
      
      // The tail tapers off: starts at 14px, shrinks down to 2px
      const size = 14 - (i * 0.6); 
      el.style.width = `${size}px`;
      el.style.height = `${size}px`;
      
      // The crimson aura fades out towards the end of the tail
      el.style.boxShadow = `0 0 ${12 - i * 0.4}px 2px rgba(220, 0, 0, ${1 - i/numCircles})`;
      
      // The very tip of the cursor gets a tiny white core
      if (i < 2) el.style.border = "1px solid rgba(255, 255, 255, 0.4)";

      document.body.appendChild(el);
      circles.push({ el, x: coords.x, y: coords.y });
    }

    // Update coordinates strictly on mouse movement
    const onMouseMove = (e) => {
      coords.x = e.clientX;
      coords.y = e.clientY;
    };
    window.addEventListener("mousemove", onMouseMove);

    // High-performance animation loop (Bypasses React entirely)
    let animationFrame;
    const animate = () => {
      let x = coords.x;
      let y = coords.y;

      circles.forEach((circle, index) => {
        // Move the physical element
        circle.el.style.transform = `translate(calc(${circle.x}px - 50%), calc(${circle.y}px - 50%))`;

        // The physics: Each circle chases the one in front of it with a slight delay (0.3)
        circle.x += (x - circle.x) * 0.3;
        circle.y += (y - circle.y) * 0.3;

        // Pass the coordinates down the chain
        x = circle.x;
        y = circle.y;
      });

      animationFrame = requestAnimationFrame(animate);
    };
    animate();

    // Cleanup when leaving the page
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(animationFrame);
      circles.forEach(circle => circle.el.remove());
    };
  }, []);

  return null; // This component doesn't render standard HTML, it manipulates the DOM directly!
}