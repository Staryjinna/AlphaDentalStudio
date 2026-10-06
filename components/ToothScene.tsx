"use client";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";

/** Builds a stylised molar: a rounded, softly cusped crown with a cervical waist, plus two splayed tapered roots. Procedural, so no model files to load. */
function useToothGeometry() {
  return useMemo(() => {
    const crown = new THREE.SphereGeometry(1, 160, 120);
    const p = crown.attributes.position;
    const v = new THREE.Vector3();
    const sm = (a: number, b: number, x: number) => { const t = Math.min(1, Math.max(0, (x - a) / (b - a))); return t * t * (3 - 2 * t); };
    for (let i = 0; i < p.count; i++) {
      v.fromBufferAttribute(p, i);
      // superellipsoid: squarer, rounded-box crown
      const e = 0.62;
      let x = Math.sign(v.x) * Math.pow(Math.abs(v.x), e);
      let y = Math.sign(v.y) * Math.pow(Math.abs(v.y), e);
      let z = Math.sign(v.z) * Math.pow(Math.abs(v.z), e);
      x *= 0.78; z *= 0.7; y *= 0.62;
      if (y > 0) {
        // cusps: four soft peaks, with a central fissure between them
        const peaks = Math.cos(x * 4.2) * Math.cos(z * 4.6);
        const fissure = Math.exp(-(x * x) / 0.012) * 0.07 + Math.exp(-(z * z) / 0.012) * 0.07;
        y += (0.07 * peaks - fissure) * sm(0.15, 0.55, y);
      } else {
        // cervical waist narrowing toward the roots
        const waist = 1 - 0.32 * sm(-0.1, -0.62, y);
        x *= waist; z *= waist;
      }
      p.setXYZ(i, x, y, z);
    }
    crown.computeVertexNormals();

    const root = (bend: number, len: number) => {
      const pts: THREE.Vector2[] = [];
      for (let i = 0; i <= 40; i++) {
        const t = i / 40;
        const r = 0.27 * Math.pow(1 - t, 0.85) * (1 + 0.12 * Math.sin(t * 2.4)) + 0.018;
        pts.push(new THREE.Vector2(r, -t * len));
      }
      const g = new THREE.LatheGeometry(pts, 56);
      const pp = g.attributes.position;
      for (let i = 0; i < pp.count; i++) {
        const t = -pp.getY(i) / len;
        pp.setX(i, pp.getX(i) + bend * t * t);
      }
      g.computeVertexNormals();
      return g;
    };
    return { crown, rootA: root(-0.42, 1.55), rootB: root(0.42, 1.45) };
  }, []);
}

function Env() {
  const { gl, scene } = useThree();
  useEffect(() => {
    const pm = new THREE.PMREMGenerator(gl);
    const env = pm.fromScene(new RoomEnvironment(), 0.04).texture;
    scene.environment = env;
    return () => { scene.environment = null; env.dispose(); pm.dispose(); };
  }, [gl, scene]);
  return null;
}

function Tooth({ still }: { still: boolean }) {
  const group = useRef<THREE.Group>(null);
  const { crown, rootA, rootB } = useToothGeometry();
  const mat = useMemo(
    () => new THREE.MeshPhysicalMaterial({
      color: "#fbf8f2", roughness: 0.2, metalness: 0, clearcoat: 1, clearcoatRoughness: 0.08,
      sheen: 0.6, sheenColor: new THREE.Color("#bfeee8"), sheenRoughness: 0.4, envMapIntensity: 1.15,
    }),
    [],
  );
  const target = useRef({ x: 0, y: 0 });
  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      target.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      target.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);
  useFrame((state, dt) => {
    const g = group.current;
    if (!g) return;
    const t = state.clock.elapsedTime;
    const scroll = Math.min(window.scrollY / 900, 1);
    const idle = still ? 0 : t * 0.35;
    g.rotation.y = THREE.MathUtils.damp(g.rotation.y, idle + target.current.x * 0.6 + scroll * 1.6, 3, dt);
    g.rotation.x = THREE.MathUtils.damp(g.rotation.x, 0.18 + target.current.y * 0.25 - scroll * 0.4, 3, dt);
    g.position.y = 0.55 + (still ? 0 : Math.sin(t * 0.9) * 0.08);
  });
  return (
    <group ref={group} scale={1.0} position={[0, 0.55, 0]}>
      <mesh geometry={crown} material={mat} />
      <mesh geometry={rootA} material={mat} position={[-0.3, -0.5, 0.04]} />
      <mesh geometry={rootB} material={mat} position={[0.3, -0.5, -0.04]} />
    </group>
  );
}

function Rings({ still }: { still: boolean }) {
  const a = useRef<THREE.Mesh>(null);
  const b = useRef<THREE.Mesh>(null);
  useFrame((_, dt) => {
    if (still) return;
    if (a.current) a.current.rotation.z += dt * 0.12;
    if (b.current) b.current.rotation.z -= dt * 0.08;
  });
  const gold = <meshStandardMaterial color="#D9BC8C" metalness={1} roughness={0.25} envMapIntensity={1.4} />;
  return (
    <group rotation={[1.15, 0.2, 0]}>
      <mesh ref={a}><torusGeometry args={[1.75, 0.012, 16, 160]} />{gold}</mesh>
      <mesh ref={b} rotation={[0.35, 0, 0]}><torusGeometry args={[2.15, 0.008, 16, 180]} />{gold}</mesh>
    </group>
  );
}

function Sparkles({ still }: { still: boolean }) {
  const ref = useRef<THREE.InstancedMesh>(null);
  const items = useMemo(
    () => Array.from({ length: 26 }, () => ({
      r: 1.3 + Math.random() * 1.0, a: Math.random() * Math.PI * 2, y: (Math.random() - 0.5) * 3.2,
      s: 0.015 + Math.random() * 0.03, sp: 0.1 + Math.random() * 0.25,
    })),
    [],
  );
  const dummy = useMemo(() => new THREE.Object3D(), []);
  useFrame((state) => {
    const m = ref.current;
    if (!m) return;
    const t = still ? 0 : state.clock.elapsedTime;
    items.forEach((it, i) => {
      const ang = it.a + t * it.sp;
      dummy.position.set(Math.cos(ang) * it.r, it.y + Math.sin(t * 0.7 + i) * 0.1, Math.sin(ang) * it.r);
      dummy.scale.setScalar(it.s * (1 + 0.4 * Math.sin(t * 2 + i)));
      dummy.updateMatrix();
      m.setMatrixAt(i, dummy.matrix);
    });
    m.instanceMatrix.needsUpdate = true;
  });
  return (
    <instancedMesh ref={ref} args={[undefined, undefined, items.length]}>
      <sphereGeometry args={[1, 12, 12]} />
      <meshBasicMaterial color="#cdf5ee" />
    </instancedMesh>
  );
}

export default function ToothScene({ active, still }: { active: boolean; still: boolean }) {
  return (
    <Canvas
      dpr={[1, 1.75]}
      frameloop={active ? "always" : "never"}
      camera={{ position: [0, 0.1, 8], fov: 32 }}
      gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
      aria-hidden
    >
      <Env />
      <ambientLight intensity={0.25} />
      <directionalLight position={[3, 4, 4]} intensity={1.6} color="#fff4e6" />
      <directionalLight position={[-4, 1, -2]} intensity={1.2} color="#7fd1c7" />
      <Tooth still={still} />
      <Rings still={still} />
      <Sparkles still={still} />
    </Canvas>
  );
}
