"use client";

import { useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  Float,
  MeshDistortMaterial,
  Sparkles,
  Environment,
} from "@react-three/drei";
import * as THREE from "three";

function FloatingOrb() {
  const mesh = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!mesh.current) return;
    const t = state.clock.elapsedTime;
    mesh.current.position.y = Math.sin(t * 0.6) * 0.15;
  });
  return (
    <Float speed={1.6} rotationIntensity={0.35} floatIntensity={0.6}>
      <mesh ref={mesh} scale={1.35}>
        <icosahedronGeometry args={[1, 1]} />
        <MeshDistortMaterial
          color="#c4a574"
          roughness={0.25}
          metalness={0.85}
          distort={0.35}
          speed={2}
        />
      </mesh>
    </Float>
  );
}

function FloatingTorus() {
  const mesh = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!mesh.current) return;
    mesh.current.rotation.x =
      state.clock.elapsedTime * 0.12 + Math.sin(state.clock.elapsedTime * 0.4) * 0.08;
    mesh.current.rotation.y = state.clock.elapsedTime * 0.18;
  });
  return (
    <Float speed={1.2} rotationIntensity={0.5} floatIntensity={0.4}>
      <mesh ref={mesh} position={[2.1, -0.4, -1.2]} scale={0.85}>
        <torusKnotGeometry args={[0.55, 0.16, 120, 16]} />
        <meshStandardMaterial
          color="#2a2a32"
          roughness={0.35}
          metalness={0.9}
          emissive="#1a1520"
          emissiveIntensity={0.25}
        />
      </mesh>
    </Float>
  );
}

function ParallaxGroup({ children }: { children: React.ReactNode }) {
  const group = useRef<THREE.Group>(null);
  const { pointer } = useThree();
  useFrame(() => {
    if (!group.current) return;
    group.current.rotation.y = THREE.MathUtils.lerp(
      group.current.rotation.y,
      pointer.x * 0.45,
      0.06
    );
    group.current.rotation.x = THREE.MathUtils.lerp(
      group.current.rotation.x,
      -pointer.y * 0.28,
      0.06
    );
  });
  return <group ref={group}>{children}</group>;
}

export function HeroScene() {
  return (
    <div className="absolute inset-0">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 42 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <color attach="background" args={["#0a0a0b"]} />
        <fog attach="fog" args={["#0a0a0b", 6, 18]} />
        <ambientLight intensity={0.35} />
        <spotLight
          position={[6, 8, 6]}
          angle={0.35}
          penumbra={1}
          intensity={1.8}
          color="#f5f0e8"
        />
        <pointLight position={[-4, -2, 2]} intensity={0.6} color="#c4a574" />
        <ParallaxGroup>
          <FloatingOrb />
          <FloatingTorus />
          <Sparkles
            count={90}
            scale={7}
            size={2}
            speed={0.35}
            opacity={0.45}
            color="#e8e6e3"
          />
        </ParallaxGroup>
        <Environment preset="city" />
      </Canvas>
    </div>
  );
}
