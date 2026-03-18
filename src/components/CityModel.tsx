import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows, useGLTF } from '@react-three/drei';
import * as THREE from 'three';

const RoadNetwork = () => {
  return (
    <group>
      {/* Main vertical road */}
      <mesh position={[0, -0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[4, 50]} />
        <meshStandardMaterial color="#333" />
      </mesh>
      {/* Main horizontal road */}
      <mesh position={[0, -0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[50, 4]} />
        <meshStandardMaterial color="#333" />
      </mesh>
      {/* Intersection markings */}
      <mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[3.8, 3.8]} />
        <meshStandardMaterial color="#555" />
      </mesh>
    </group>
  );
};

const Vehicle = ({ position, color, speed, direction, type }: any) => {
  const meshRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (meshRef.current) {
      if (direction === 'north') { meshRef.current.position.z -= speed; meshRef.current.rotation.y = Math.PI; }
      if (direction === 'south') { meshRef.current.position.z += speed; meshRef.current.rotation.y = 0; }
      if (direction === 'east') { meshRef.current.position.x += speed; meshRef.current.rotation.y = Math.PI / 2; }
      if (direction === 'west') { meshRef.current.position.x -= speed; meshRef.current.rotation.y = -Math.PI / 2; }

      // Loop vehicles
      if (meshRef.current.position.z < -25) meshRef.current.position.z = 25;
      if (meshRef.current.position.z > 25) meshRef.current.position.z = -25;
      if (meshRef.current.position.x < -25) meshRef.current.position.x = 25;
      if (meshRef.current.position.x > 25) meshRef.current.position.x = -25;
    }
  });

  // Different geometry dimensions based on vehicle type
  let dims: [number, number, number] = [0.8, 0.6, 1.8];
  if (type === 'bus') dims = [1.2, 1.4, 4.0];
  if (type === 'truck') dims = [1.2, 1.5, 4.5];
  if (type === 'bike') dims = [0.3, 0.7, 1.0];

  return (
    <group ref={meshRef} position={position}>
      <mesh castShadow position={[0, dims[1]/2, 0]}>
        <boxGeometry args={dims} />
        <meshStandardMaterial color={color} roughness={0.3} metalness={0.6} />
      </mesh>
      {/* Headlights */}
      <mesh position={[dims[0]/3, dims[1]/4, dims[2]/2 + 0.01]}>
        <planeGeometry args={[0.2, 0.1]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>
      <mesh position={[-dims[0]/3, dims[1]/4, dims[2]/2 + 0.01]}>
        <planeGeometry args={[0.2, 0.1]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>
      {/* Taillights */}
      <mesh position={[dims[0]/3, dims[1]/4, -dims[2]/2 - 0.01]}>
        <planeGeometry args={[0.2, 0.1]} />
        <meshBasicMaterial color="#ff0000" />
      </mesh>
      <mesh position={[-dims[0]/3, dims[1]/4, -dims[2]/2 - 0.01]}>
        <planeGeometry args={[0.2, 0.1]} />
        <meshBasicMaterial color="#ff0000" />
      </mesh>
    </group>
  );
};

const VehiclesOverlay = ({ congestionLevel }: { congestionLevel: number }) => {
  const vehicleCount = useMemo(() => Math.floor(20 + congestionLevel * 80), [congestionLevel]); // Increased density for Bangalore
  const vehicles = useMemo(() => {
    return Array.from({ length: vehicleCount }).map((_, i) => {
      const directions = ['north', 'south', 'east', 'west'];
      const dir = directions[Math.floor(Math.random() * 4)];
      
      const vehicleTypes = ['car', 'car', 'car', 'bus', 'truck', 'bike', 'bike'];
      const type = vehicleTypes[Math.floor(Math.random() * vehicleTypes.length)];
      
      let color = ['#ffffff', '#cccccc', '#333333', '#880000'][Math.floor(Math.random() * 4)];
      if (type === 'bus') color = '#2563eb'; // BMTC Blue Buses
      if (type === 'truck') color = '#fbbf24'; // Yellow/orange trucks
      if (type === 'bike') color = '#ef4444'; // Red bikes

      let laneOffset = (Math.random() - 0.5) * 1.5; // Spread out across lanes
      
      let x = 0, z = 0;
      if (dir === 'north') { x = 1 + laneOffset; z = Math.random() * 50 - 25; }
      if (dir === 'south') { x = -1 + laneOffset; z = Math.random() * 50 - 25; }
      if (dir === 'east') { z = 1 + laneOffset; x = Math.random() * 50 - 25; }
      if (dir === 'west') { z = -1 + laneOffset; x = Math.random() * 50 - 25; }

      let baseSpeed = 0.06;
      if (type === 'bus' || type === 'truck') baseSpeed = 0.04;
      if (type === 'bike') baseSpeed = 0.09;

      return {
        id: i,
        type,
        position: [x, 0, z] as [number, number, number],
        color,
        speed: (baseSpeed + Math.random() * 0.03) * (1 - congestionLevel * 0.7), // Severe slowdown
        direction: dir,
      };
    });
  }, [vehicleCount, congestionLevel]);

  return (
    <>
      {vehicles.map(v => (
        <Vehicle key={v.id} {...v} />
      ))}
    </>
  );
};

const Buildings = () => {
    return (
        <group>
            {[...Array(20)].map((_, i) => {
                const isVertical = i % 2 === 0;
                const offsetMultiplier = i > 10 ? -1 : 1;
                const x = isVertical ? (4 + Math.random() * 10) * offsetMultiplier : (Math.random() * 40 - 20);
                const z = isVertical ? (Math.random() * 40 - 20) : (4 + Math.random() * 10) * offsetMultiplier;
                const height = 2 + Math.random() * 10;
                
                return (
                    <mesh key={i} position={[x, height/2, z]} castShadow receiveShadow>
                        <boxGeometry args={[3 + Math.random()*2, height, 3 + Math.random()*2]} />
                        <meshStandardMaterial color="#1f2937" roughness={0.8} />
                    </mesh>
                )
            })}
        </group>
    )
}

export default function CityModel({ congestionLevel = 0.5 }: { congestionLevel: number }) {
  return (
    <div className="w-full h-full bg-slate-900 pointer-events-auto">
      <Canvas shadows camera={{ position: [15, 15, 15], fov: 45 }}>
        <color attach="background" args={['#0f172a']} />
        <ambientLight intensity={0.5} />
        <directionalLight castShadow position={[10, 20, 10]} intensity={1.5} shadow-mapSize={[1024, 1024]} />
        <RoadNetwork />
        <Buildings />
        <VehiclesOverlay congestionLevel={congestionLevel} />
        <ContactShadows position={[0, -0.05, 0]} opacity={0.4} scale={50} blur={2} far={10} />
        <OrbitControls 
            target={[0, 0, 0]}
            maxPolarAngle={Math.PI / 2.2}
            minDistance={5}
            maxDistance={50}
        />
      </Canvas>
    </div>
  );
}
