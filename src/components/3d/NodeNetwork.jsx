import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';

export const NodeNetwork = ({ nodeCount = 30 }) => {
  const nodesRef = useRef();

  // Generate random node positions
  const nodes = useMemo(() => {
    return Array.from({ length: nodeCount }, () => ({
      position: [
        (Math.random() - 0.5) * 8,
        (Math.random() - 0.5) * 6,
        (Math.random() - 0.5) * 4
      ],
      connections: Math.floor(Math.random() * 3) + 1
    }));
  }, [nodeCount]);

  // Generate connection lines
  const linePositions = useMemo(() => {
    const positions = [];
    nodes.forEach((node, i) => {
      for (let j = 0; j < node.connections; j++) {
        const targetIndex = (i + j + 1) % nodes.length;
        positions.push(...node.position, ...nodes[targetIndex].position);
      }
    });
    return new Float32Array(positions);
  }, [nodes]);

  useFrame((state) => {
    if (nodesRef.current) {
      nodesRef.current.rotation.y = state.clock.elapsedTime * 0.05;
    }
  });

  return (
    <group ref={nodesRef}>
      {/* Nodes */}
      {nodes.map((node, i) => (
        <mesh key={i} position={node.position}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshStandardMaterial
            color="#10B981"
            emissive="#10B981"
            emissiveIntensity={0.5}
          />
        </mesh>
      ))}

      {/* Connection lines */}
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={linePositions.length / 3}
            array={linePositions}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial color="#2563EB" opacity={0.3} transparent />
      </lineSegments>
    </group>
  );
};

export default NodeNetwork;
