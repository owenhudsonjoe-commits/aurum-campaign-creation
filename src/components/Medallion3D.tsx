import { useRef, useMemo, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float } from "@react-three/drei";
import * as THREE from "three";

function Medallion() {
  const groupRef = useRef<THREE.Group>(null);

  // Build a Mughal-inspired 8-fold radial medallion using ExtrudeGeometry
  const geometry = useMemo(() => {
    const shape = new THREE.Shape();
    const points = 16;
    const outer = 1.4;
    const inner = 1.05;

    // Scalloped outer edge (cusped petals)
    for (let i = 0; i <= points; i++) {
      const t = (i / points) * Math.PI * 2;
      const r = i % 2 === 0 ? outer : inner;
      const x = Math.cos(t) * r;
      const y = Math.sin(t) * r;
      if (i === 0) shape.moveTo(x, y);
      else shape.lineTo(x, y);
    }

    // Inner cutout (8-pointed star)
    const hole = new THREE.Path();
    const starPoints = 16;
    const starOuter = 0.55;
    const starInner = 0.28;
    for (let i = 0; i <= starPoints; i++) {
      const t = (i / starPoints) * Math.PI * 2 + Math.PI / 8;
      const r = i % 2 === 0 ? starOuter : starInner;
      const x = Math.cos(t) * r;
      const y = Math.sin(t) * r;
      if (i === 0) hole.moveTo(x, y);
      else hole.lineTo(x, y);
    }
    shape.holes.push(hole);

    const geom = new THREE.ExtrudeGeometry(shape, {
      depth: 0.18,
      bevelEnabled: true,
      bevelThickness: 0.06,
      bevelSize: 0.04,
      bevelSegments: 6,
      curveSegments: 24,
    });
    geom.center();
    return geom;
  }, []);

  const ringGeometry = useMemo(() => {
    return new THREE.TorusGeometry(1.65, 0.025, 16, 128);
  }, []);

  const outerRingGeometry = useMemo(() => {
    return new THREE.TorusGeometry(1.85, 0.012, 12, 128);
  }, []);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.25;
    }
  });

  return (
    <Float speed={1.4} rotationIntensity={0.15} floatIntensity={0.4}>
      <group ref={groupRef}>
        <mesh geometry={geometry} castShadow>
          <meshPhysicalMaterial
            color="#d4a548"
            metalness={1}
            roughness={0.18}
            clearcoat={1}
            clearcoatRoughness={0.1}
            reflectivity={1}
            envMapIntensity={1.4}
          />
        </mesh>
        <mesh geometry={ringGeometry} rotation={[Math.PI / 2, 0, 0]}>
          <meshPhysicalMaterial
            color="#e8c77a"
            metalness={1}
            roughness={0.15}
            clearcoat={1}
            envMapIntensity={1.6}
          />
        </mesh>
        <mesh geometry={outerRingGeometry} rotation={[Math.PI / 2, 0, 0]}>
          <meshPhysicalMaterial
            color="#b8893a"
            metalness={1}
            roughness={0.2}
            envMapIntensity={1.5}
          />
        </mesh>
      </group>
    </Float>
  );
}

export function Medallion3D() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 35 }}
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 2]}
      style={{ background: "transparent" }}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 5, 5]} intensity={1.2} color="#fff4d6" />
        <directionalLight position={[-4, -2, 3]} intensity={0.6} color="#ffd97a" />
        <pointLight position={[0, 0, 3]} intensity={0.8} color="#e8c77a" />
        <Environment preset="studio" />
        <Medallion />
      </Suspense>
    </Canvas>
  );
}
