"use client";

import { Canvas } from "@react-three/fiber";
import { Environment, Float, OrbitControls, useGLTF, Sparkles } from "@react-three/drei";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";

function MalevolentShrine() {
  const { scene } = useGLTF("/scene.gltf"); 

  return (
    // Reduced the floating so it feels heavier and more grounded
    <Float speed={1} rotationIntensity={0.05} floatIntensity={0.1}>
      <primitive 
        object={scene} 
        scale={29} 
        position={[0, -1.75, -2]} 
        rotation={[0.,Math.PI, 0]}
      />
    </Float>
  );
}

export default function ShrineBackground() {
  return (
    <Canvas camera={{ position: [0, 2, 14], fov: 50 }}>
      {/* 1. Base Lighting */}
      <ambientLight intensity={0.2} color="#ff0000" />
      <directionalLight position={[5, 10, -5]} intensity={2} color="#ff3333" />
      <pointLight position={[0, -2, 4]} intensity={8} color="#cc0000" />
      
      {/* 2. Cursed Energy Embers filling the empty space */}
      {/* Red ambient dust */}
      <Sparkles count={300} scale={25} size={3} speed={0.4} opacity={0.4} color="#ff0000" />
      {/* Bright glowing sparks */}
      <Sparkles count={100} scale={30} size={5} speed={0.8} opacity={0.8} color="#ffffff" />
      
      {/* 3. The Fog */}
      <fog attach="fog" args={["#050000", 8, 25]} />
      
      <MalevolentShrine />

      {/* 4. Cinematic Post-Processing */}
      <EffectComposer>
        {/* Bloom makes the red lights and white sparks actually glow */}
        <Bloom luminanceThreshold={0.2} luminanceSmoothing={0.9} intensity={1.5} />
        {/* Vignette adds heavy shadows to the corners of the screen */}
        <Vignette eskil={false} offset={0.1} darkness={1.2} />
      </EffectComposer>
      
      <OrbitControls 
        enableZoom={true} 
        minDistance={5.5}
        maxDistance={22}
        zoomSpeed={0.6}
        maxPolarAngle={Math.PI / 1.9} 
        minPolarAngle={Math.PI / 2.2}
        target={[0, -1.5, -1]}
      />
      <Environment preset="night" />
    </Canvas>
  );
}