import { Canvas } from '@react-three/fiber';
import { Suspense, lazy } from 'react';
import { useDeviceCapabilities } from '../../hooks';
import { LoadingSpinner } from '../ui';

const HeroScene = lazy(() => import('./HeroScene'));

export const CanvasWrapper = ({ fallback, children }) => {
  const { isDesktop, hasWebGL, prefersReducedMotion } = useDeviceCapabilities();

  // Mobile or no WebGL: show static fallback
  if (!isDesktop || !hasWebGL || prefersReducedMotion) {
    return <div className="hero-fallback">{fallback}</div>;
  }

  // Desktop with WebGL: full 3D experience
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 75 }}
      dpr={[1, 2]}
      performance={{ min: 0.5 }}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance'
      }}
    >
      <Suspense fallback={null}>
        {children || <HeroScene />}
      </Suspense>
    </Canvas>
  );
};

export default CanvasWrapper;
