"use client";

import { Canvas } from "@react-three/fiber";
import { Environment, Float, OrbitControls, useGLTF } from "@react-three/drei";

// 1. The Component that actually loads your 3D file
function MalevolentShrine() {
  // Make sure this string matches exactly what you named the file in your public folder!
  const { scene } = useGLTF("/scene.gltf"); 

  return (
    <Float speed={0} rotationIntensity={0} floatIntensity={0}>
      {/* This is your model! 
        You might need to change the 'scale' if it spawns too big or too small, 
        and the 'position' [x, y, z] to center it.
      */}
      <primitive 
        object={scene} 
        scale={30} 
        position={[0, -2, -2]} 
        rotation={[0.,Math.PI, 0]}
      />
    </Float>
  );
}

// 2. The Main Canvas setup
export default function ShrineBackground() {
  return (
    <Canvas camera={{ position: [0, 2, 14], fov: 50 }}>
      {/* Heavy Blood Red Lighting */}
      <ambientLight intensity={0.4} color="#ff0000" />
      <directionalLight position={[5, 10, -5]} intensity={3} color="#ff3333" />
      <pointLight position={[0, -2, 4]} intensity={5} color="#cc0000" />
      
      {/* The dark atmospheric fog blending into the black background */}
      <fog attach="fog" args={["#050000", 8, 30]} />
      
      {/* Loads the shrine component we built above */}
      <MalevolentShrine />
      
      <OrbitControls 
        enableZoom={false} 
        // Limits how far up and down the user can drag the camera
        maxPolarAngle={Math.PI / 1.5} 
        minPolarAngle={Math.PI / 3}
      />
      <Environment preset="night" />
    </Canvas>
  );
}