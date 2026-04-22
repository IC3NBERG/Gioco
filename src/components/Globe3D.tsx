import React, { useRef, useState, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, Html } from '@react-three/drei';
import * as THREE from 'three';
import { NATIONS_LIST } from '../data/nations';

interface NationMarkerProps {
  position: [number, number];
  color: string;
  name: string;
  flag_emoji: string;
  isSelected: boolean;
  isCurrentPlayer: boolean;
  onClick: () => void;
}

const NationMarker: React.FC<NationMarkerProps> = ({ 
  position: [lat, lng], 
  color, 
  name, 
  flag_emoji,
  isSelected, 
  isCurrentPlayer,
  onClick 
}) => {
  const [hovered, setHovered] = useState(false);
  const markerRef = useRef<THREE.Mesh>(null);
  
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  const radius = 1.02;
  
  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const y = radius * Math.cos(phi);
  const z = radius * Math.sin(phi) * Math.sin(theta);

  useFrame(() => {
    if (markerRef.current) {
      const scale = isSelected || hovered ? 1.5 : isCurrentPlayer ? 1.3 : 1;
      markerRef.current.scale.lerp(new THREE.Vector3(scale, scale, scale), 0.1);
    }
  });

  return (
    <group position={[x, y, z]}>
      <mesh
        ref={markerRef}
        onClick={(e) => {
          e.stopPropagation();
          onClick();
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
        }}
        onPointerOut={() => setHovered(false)}
      >
        <sphereGeometry args={[0.03, 16, 16]} />
        <meshStandardMaterial 
          color={color} 
          emissive={color}
          emissiveIntensity={isSelected || hovered ? 0.8 : isCurrentPlayer ? 0.5 : 0.2}
        />
      </mesh>
      {(hovered || isSelected) && (
        <Html distanceFactor={10} position={[0, 0.1, 0]}>
          <div className="bg-slate-900/95 px-3 py-2 rounded-lg border border-slate-700 whitespace-nowrap">
            <div className="flex items-center gap-2">
              <span className="text-lg">{flag_emoji}</span>
              <span className="text-slate-200 text-sm font-medium">{name}</span>
            </div>
          </div>
        </Html>
      )}
    </group>
  );
};

const Earth: React.FC<{
  nations: typeof NATIONS_LIST;
  currentNationId: string | null;
  selectedNationId: string | null;
  onSelectNation: (id: string) => void;
}> = ({ nations, currentNationId, selectedNationId, onSelectNation }) => {
  const earthRef = useRef<THREE.Mesh>(null);
  const [atmosphereRef, setAtmosphereRef] = useState<THREE.Mesh | null>(null);

  const textureLoader = useMemo(() => new THREE.TextureLoader(), []);

  const earthMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: '#1a365d',
      roughness: 0.8,
      metalness: 0.1,
      emissive: '#0d1b2a',
      emissiveIntensity: 0.1,
    });
  }, []);

  const atmosphereMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      vertexShader: `
        varying vec3 vNormal;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec3 vNormal;
        void main() {
          float intensity = pow(0.65 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.0);
          gl_FragColor = vec4(0.3, 0.6, 1.0, 1.0) * intensity;
        }
      `,
      blending: THREE.AdditiveBlending,
      side: THREE.BackSide,
      transparent: true,
    });
  }, []);

  return (
    <group>
      <Sphere ref={earthRef} args={[1, 64, 64]}>
        <primitive object={earthMaterial} attach="material" />
      </Sphere>
      
      <Sphere args={[1.02, 64, 64]}>
        <primitive object={atmosphereMaterial} attach="material" />
      </Sphere>

      {nations.map((nation) => (
        nation.position && (
          <NationMarker
            key={nation.id}
            position={[nation.position.lat, nation.position.lng]}
            color={nation.color}
            name={nation.name}
            flag_emoji={nation.flag_emoji || ''}
            isSelected={selectedNationId === nation.id}
            isCurrentPlayer={currentNationId === nation.id}
            onClick={() => onSelectNation(nation.id)}
          />
        )
      ))}
    </group>
  );
};

const Stars: React.FC = () => {
  const starsRef = useRef<THREE.Points>(null);
  
  const [positions] = useState(() => {
    const pos = new Float32Array(3000 * 3);
    for (let i = 0; i < 3000; i++) {
      const radius = 50 + Math.random() * 50;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      pos[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = radius * Math.cos(phi);
    }
    return pos;
  });

  useFrame((_, delta) => {
    if (starsRef.current) {
      starsRef.current.rotation.y += delta * 0.01;
    }
  });

  return (
    <points ref={starsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={3000}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.5} color="#ffffff" sizeAttenuation transparent opacity={0.8} />
    </points>
  );
};

const Lighting: React.FC = () => {
  return (
    <>
      <ambientLight intensity={0.15} />
      <directionalLight 
        position={[5, 3, 5]} 
        intensity={1.5} 
        color="#ffeedd"
      />
      <pointLight position={[-5, -3, -5]} intensity={0.3} color="#4488ff" />
    </>
  );
};

interface Globe3DProps {
  currentNationId: string | null;
  selectedNationId: string | null;
  onSelectNation: (id: string) => void;
}

export const Globe3D: React.FC<Globe3DProps> = ({ 
  currentNationId, 
  selectedNationId, 
  onSelectNation 
}) => {
  return (
    <div className="w-full h-full bg-slate-950">
      <Canvas camera={{ position: [0, 0, 3], fov: 45 }}>
        <Lighting />
        <Stars />
        <Earth 
          nations={NATIONS_LIST}
          currentNationId={currentNationId}
          selectedNationId={selectedNationId}
          onSelectNation={onSelectNation}
        />
        <OrbitControls 
          enablePan={false}
          enableZoom={true}
          minDistance={1.5}
          maxDistance={5}
          rotateSpeed={0.5}
          zoomSpeed={0.5}
          autoRotate={false}
        />
      </Canvas>
    </div>
  );
};

export default Globe3D;