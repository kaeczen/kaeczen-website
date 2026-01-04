import { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import {
  Environment,
  Float,
  MeshDistortMaterial,
  Sparkles
} from '@react-three/drei';
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing';
import NodeNetwork from './NodeNetwork';

export const HeroScene = () => {
  const meshRef = useRef();
  const { pointer } = useThree();

  useFrame((state) => {
    if (meshRef.current) {
      // Smooth mouse follow
      meshRef.current.rotation.x += (pointer.y * 0.2 - meshRef.current.rotation.x) * 0.05;
      meshRef.current.rotation.y += (pointer.x * 0.2 - meshRef.current.rotation.y) * 0.05;

      // Subtle floating animation
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <pointLight position={[-10, -10, -5]} color="#2563EB" intensity={0.5} />

      {/* Main geometry - parametric shape */}
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
        <mesh ref={meshRef}>
          <icosahedronGeometry args={[1.5, 4]} />
          <MeshDistortMaterial
            color="#2563EB"
            wireframe
            distort={0.3}
            speed={2}
            roughness={0}
          />
        </mesh>
      </Float>

      {/* Particle system */}
      <Sparkles
        count={200}
        scale={10}
        size={2}
        speed={0.5}
        color="#10B981"
      />

      {/* Node connections (Grasshopper style) */}
      <NodeNetwork />

      {/* Environment */}
      <Environment preset="night" />

      {/* Postprocessing */}
      <EffectComposer>
        <Bloom luminanceThreshold={0.2} intensity={0.5} />
        <Vignette eskil={false} offset={0.1} darkness={0.5} />
      </EffectComposer>
    </>
  );
};

export default HeroScene;
