import { Html } from '@react-three/drei';

export default function RegionHotspot({ region, selected, hovered, affected, onHover, onSelect }) {
  const { x, y, z } = region.position3D;
  // Mirror to opposite side for paired joints
  const positions = (region.meshGroup === 'upper-limb' || region.meshGroup === 'lower-limb')
    ? [[x, y, z], [-x, y, z]]
    : [[x, y, z]];

  return (
    <>
      {positions.map((pos, i) => (
        <group key={i} position={pos}>
          <mesh
            onPointerOver={(e) => { e.stopPropagation(); onHover(region.id); document.body.style.cursor = 'pointer'; }}
            onPointerOut={() => { onHover(null); document.body.style.cursor = 'auto'; }}
            onClick={(e) => { e.stopPropagation(); onSelect(region.id); }}
          >
            <sphereGeometry args={[0.045, 16, 16]} />
            <meshStandardMaterial
              color={affected ? '#f5a623' : '#00d4c8'}
              emissive={affected ? '#f5a623' : '#00d4c8'}
              emissiveIntensity={selected ? 1.4 : hovered ? 1.0 : 0.6}
              transparent
              opacity={0.9}
            />
          </mesh>
          {(selected || hovered) && (
            <Html distanceFactor={6} center style={{ pointerEvents: 'none' }}>
              <div className="px-2 py-0.5 rounded bg-bg-panel/95 border border-bg-border text-[10px] font-mono text-text-primary whitespace-nowrap">
                {region.label}
              </div>
            </Html>
          )}
        </group>
      ))}
    </>
  );
}
