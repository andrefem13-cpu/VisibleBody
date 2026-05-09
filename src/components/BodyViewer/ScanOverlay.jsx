import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { REGION_BY_ID } from '../../data/bodyRegions.js';

export default function ScanOverlay({ scanResult }) {
  const refs = useRef([]);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    refs.current.forEach((m) => {
      if (m) m.material.opacity = 0.25 + Math.abs(Math.sin(t * 1.6)) * 0.35;
    });
  });

  return (
    <group>
      {scanResult.affectedRegions.map((finding, i) => {
        const region = REGION_BY_ID[finding.regionId];
        if (!region) return null;
        const { x, y, z } = region.position3D;
        return (
          <mesh
            key={`${finding.regionId}-${i}`}
            position={[x, y, z]}
            ref={(el) => (refs.current[i] = el)}
          >
            <sphereGeometry args={[0.12, 24, 24]} />
            <meshBasicMaterial color="#f5a623" transparent opacity={0.4} />
          </mesh>
        );
      })}
    </group>
  );
}
