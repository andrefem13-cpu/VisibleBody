import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Suspense } from 'react';
import BodyMesh from './BodyMesh.jsx';

export default function BodyViewer({ selectedRegionId, onRegionSelect, scanResult }) {
  return (
    <div className="relative w-full h-full bg-gradient-to-b from-bg-primary via-bg-secondary to-bg-primary">
      <Canvas camera={{ position: [0, 0.9, 3], fov: 45 }} dpr={[1, 2]}>
        <ambientLight intensity={0.4} />
        <directionalLight position={[3, 5, 4]} intensity={0.7} color="#bfd8ff" />
        <directionalLight position={[-3, 2, -2]} intensity={0.3} color="#4db8ff" />
        <Suspense fallback={null}>
          <BodyMesh
            selectedRegionId={selectedRegionId}
            onRegionSelect={onRegionSelect}
            scanResult={scanResult}
          />
        </Suspense>
        <OrbitControls
          enablePan={false}
          minDistance={1.4}
          maxDistance={5}
          minPolarAngle={Math.PI / 6}
          maxPolarAngle={Math.PI - Math.PI / 6}
          target={[0, 0.9, 0]}
        />
      </Canvas>
      <div className="absolute bottom-3 left-3 text-xs text-text-muted font-mono pointer-events-none">
        click a glowing dot · drag to rotate · scroll to zoom
      </div>
    </div>
  );
}
