import { useState } from 'react';
import { BODY_REGIONS } from '../../data/bodyRegions.js';
import RegionHotspot from './RegionHotspot.jsx';
import ScanOverlay from './ScanOverlay.jsx';

// Phase 1 primitive body. Each cylinder/sphere is anatomically approximate.
// Phase 2 swap: replace with useGLTF('/models/human-anatomy.glb') and map node names → region ids.
export default function BodyMesh({ selectedRegionId, onRegionSelect, scanResult }) {
  const [hovered, setHovered] = useState(null);
  const affectedIds = new Set((scanResult?.affectedRegions || []).map((r) => r.regionId));

  const bodyMat = {
    color: '#1a2942',
    emissive: '#4db8ff',
    emissiveIntensity: 0.08,
    roughness: 0.55,
    metalness: 0.05,
  };

  return (
    <group>
      {/* Head */}
      <mesh position={[0, 1.7, 0]}>
        <sphereGeometry args={[0.18, 32, 32]} />
        <meshStandardMaterial {...bodyMat} />
      </mesh>
      {/* Neck */}
      <mesh position={[0, 1.5, 0]}>
        <cylinderGeometry args={[0.06, 0.08, 0.12, 16]} />
        <meshStandardMaterial {...bodyMat} />
      </mesh>
      {/* Torso */}
      <mesh position={[0, 1.05, 0]}>
        <cylinderGeometry args={[0.22, 0.18, 0.7, 24]} />
        <meshStandardMaterial {...bodyMat} />
      </mesh>
      {/* Pelvis */}
      <mesh position={[0, 0.7, 0]}>
        <cylinderGeometry args={[0.2, 0.16, 0.18, 24]} />
        <meshStandardMaterial {...bodyMat} />
      </mesh>
      {/* Upper arms */}
      <mesh position={[0.32, 1.18, 0]} rotation={[0, 0, 0.1]}>
        <cylinderGeometry args={[0.06, 0.05, 0.4, 16]} />
        <meshStandardMaterial {...bodyMat} />
      </mesh>
      <mesh position={[-0.32, 1.18, 0]} rotation={[0, 0, -0.1]}>
        <cylinderGeometry args={[0.06, 0.05, 0.4, 16]} />
        <meshStandardMaterial {...bodyMat} />
      </mesh>
      {/* Forearms */}
      <mesh position={[0.4, 0.78, 0]} rotation={[0, 0, 0.15]}>
        <cylinderGeometry args={[0.05, 0.045, 0.4, 16]} />
        <meshStandardMaterial {...bodyMat} />
      </mesh>
      <mesh position={[-0.4, 0.78, 0]} rotation={[0, 0, -0.15]}>
        <cylinderGeometry args={[0.05, 0.045, 0.4, 16]} />
        <meshStandardMaterial {...bodyMat} />
      </mesh>
      {/* Thighs */}
      <mesh position={[0.1, 0.45, 0]}>
        <cylinderGeometry args={[0.08, 0.07, 0.45, 16]} />
        <meshStandardMaterial {...bodyMat} />
      </mesh>
      <mesh position={[-0.1, 0.45, 0]}>
        <cylinderGeometry args={[0.08, 0.07, 0.45, 16]} />
        <meshStandardMaterial {...bodyMat} />
      </mesh>
      {/* Calves */}
      <mesh position={[0.1, 0.08, 0]}>
        <cylinderGeometry args={[0.06, 0.04, 0.4, 16]} />
        <meshStandardMaterial {...bodyMat} />
      </mesh>
      <mesh position={[-0.1, 0.08, 0]}>
        <cylinderGeometry args={[0.06, 0.04, 0.4, 16]} />
        <meshStandardMaterial {...bodyMat} />
      </mesh>

      {/* Hotspots */}
      {BODY_REGIONS.map((region) => (
        <RegionHotspot
          key={region.id}
          region={region}
          selected={region.id === selectedRegionId}
          hovered={hovered === region.id}
          affected={affectedIds.has(region.id)}
          onHover={setHovered}
          onSelect={onRegionSelect}
        />
      ))}

      {scanResult && <ScanOverlay scanResult={scanResult} />}
    </group>
  );
}
