"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

export type RobotMode = "idle" | "name" | "email" | "message";

type ContactSceneProps = {
  mode: RobotMode;
  nameEl: HTMLElement | null;
  emailEl: HTMLElement | null;
  messageEl: HTMLElement | null;
  typingIntensity: number;
};

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}

function useDomTarget3D() {
  const { camera, gl } = useThree();

  return (el: HTMLElement | null, distance = 2.2) => {
    if (!el) return new THREE.Vector3(0, 0, 0);

    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;

    const canvasRect = gl.domElement.getBoundingClientRect();
    if (canvasRect.width === 0 || canvasRect.height === 0) {
      return new THREE.Vector3(0, 0, 0);
    }
    const x = ((cx - canvasRect.left) / canvasRect.width) * 2 - 1;
    const y = -((cy - canvasRect.top) / canvasRect.height) * 2 + 1;

    const ndc = new THREE.Vector3(x, y, 0.5);
    ndc.unproject(camera);

    const dir = ndc.sub(camera.position).normalize();
    return camera.position.clone().add(dir.multiplyScalar(distance));
  };
}

type RobotHeadProps = ContactSceneProps;

function RobotHead({
  mode,
  nameEl,
  emailEl,
  messageEl,
  typingIntensity,
}: RobotHeadProps) {
  const headRef = useRef<THREE.Group>(null);
  const leftEyeRef = useRef<THREE.Group>(null);
  const rightEyeRef = useRef<THREE.Group>(null);

  const lookTarget = useRef(new THREE.Vector3(0, 0, 2));
  const lookTargetSmoothed = useRef(new THREE.Vector3(0, 0, 2));
  const tmp = useMemo(() => new THREE.Vector3(), []);
  const headPos = useMemo(() => new THREE.Vector3(), []);
  const messageTarget = useMemo(() => new THREE.Vector3(), []);
  const awayDir = useMemo(() => new THREE.Vector3(), []);

  const domTo3D = useDomTarget3D();
  const lookAwayPoint = useMemo(() => new THREE.Vector3(1.2, -0.6, 2.0), []);

  useFrame((state, delta) => {
    const head = headRef.current;
    if (!head) return;

    if (mode === "name") {
      lookTarget.current.copy(domTo3D(nameEl, 2.2));

      if (typingIntensity > 0.02) {
        const t = state.clock.getElapsedTime();
        lookTarget.current.x += Math.sin(t * 18) * 0.03 * typingIntensity;
        lookTarget.current.y += Math.cos(t * 16) * 0.02 * typingIntensity;
      }
    } else if (mode === "email") {
      lookTarget.current.copy(domTo3D(emailEl, 2.2));

      if (typingIntensity > 0.02) {
        const t = state.clock.getElapsedTime();
        lookTarget.current.x += Math.sin(t * 18) * 0.03 * typingIntensity;
        lookTarget.current.y += Math.cos(t * 16) * 0.02 * typingIntensity;
      }
    } else if (mode === "message") {
      if (messageEl) {
        head.getWorldPosition(headPos);
        messageTarget.copy(domTo3D(messageEl, 2.2));
        awayDir.copy(headPos).sub(messageTarget);

        if (awayDir.lengthSq() < 0.0001) {
          awayDir.set(1, -0.4, 0.3);
        }

        awayDir.normalize().multiplyScalar(2.2);
        lookTarget.current.copy(headPos).add(awayDir);
      } else {
        head.localToWorld(tmp.copy(lookAwayPoint));
        lookTarget.current.copy(tmp);
      }
    } else {
      head.localToWorld(tmp.set(0, 0, 2));
      lookTarget.current.copy(tmp);
    }

    lookTargetSmoothed.current.lerp(
      lookTarget.current,
      1 - Math.exp(-delta * 10),
    );

    const headLook = tmp.copy(lookTargetSmoothed.current);
    head.lookAt(headLook);

    head.rotation.x = clamp(head.rotation.x, -0.35, 0.35);
    head.rotation.y = clamp(head.rotation.y, -0.55, 0.55);

    const leftEye = leftEyeRef.current;
    const rightEye = rightEyeRef.current;
    if (leftEye && rightEye) {
      leftEye.lookAt(lookTargetSmoothed.current);
      rightEye.lookAt(lookTargetSmoothed.current);

      leftEye.rotation.x = clamp(leftEye.rotation.x, -0.6, 0.6);
      leftEye.rotation.y = clamp(leftEye.rotation.y, -0.8, 0.8);
      rightEye.rotation.x = clamp(rightEye.rotation.x, -0.6, 0.6);
      rightEye.rotation.y = clamp(rightEye.rotation.y, -0.8, 0.8);
    }
  });

  return (
    <group ref={headRef} position={[0, 0, 0]}>
      <mesh scale={[1.05, 0.98, 1]}>
        <sphereGeometry args={[0.95, 32, 32]} />
        <meshPhysicalMaterial
          color="#f3f6fb"
          roughness={0.25}
          metalness={0.1}
          clearcoat={0.6}
          clearcoatRoughness={0.15}
        />
      </mesh>

      <mesh position={[0, 0.05, 0.55]} scale={[1.2, 0.85, 0.55]}>
        <sphereGeometry args={[0.65, 28, 28]} />
        <meshStandardMaterial
          color="#dbe9ff"
          roughness={0.3}
          metalness={0.05}
          emissive="#7cbcff"
          emissiveIntensity={0.15}
        />
      </mesh>

      <group position={[0, 0.12, 0.74]}>
        <group ref={leftEyeRef} position={[-0.26, 0.02, 0]}>
          <mesh>
            <sphereGeometry args={[0.13, 24, 24]} />
            <meshPhysicalMaterial
              color="#f8fbff"
              roughness={0.25}
              metalness={0.0}
              clearcoat={0.4}
              clearcoatRoughness={0.2}
            />
          </mesh>
          <mesh position={[0, 0, 0.12]}>
            <sphereGeometry args={[0.05, 18, 18]} />
            <meshStandardMaterial
              color="#18263b"
              roughness={0.4}
              metalness={0.0}
            />
          </mesh>
        </group>

        <group ref={rightEyeRef} position={[0.26, 0.02, 0]}>
          <mesh>
            <sphereGeometry args={[0.13, 24, 24]} />
            <meshPhysicalMaterial
              color="#f8fbff"
              roughness={0.25}
              metalness={0.0}
              clearcoat={0.4}
              clearcoatRoughness={0.2}
            />
          </mesh>
          <mesh position={[0, 0, 0.12]}>
            <sphereGeometry args={[0.05, 18, 18]} />
            <meshStandardMaterial
              color="#18263b"
              roughness={0.4}
              metalness={0.0}
            />
          </mesh>
        </group>
      </group>

      <mesh position={[-0.36, -0.1, 0.72]}>
        <sphereGeometry args={[0.06, 16, 16]} />
        <meshStandardMaterial
          color="#f7b5c8"
          roughness={0.5}
          metalness={0.0}
        />
      </mesh>
      <mesh position={[0.36, -0.1, 0.72]}>
        <sphereGeometry args={[0.06, 16, 16]} />
        <meshStandardMaterial
          color="#f7b5c8"
          roughness={0.5}
          metalness={0.0}
        />
      </mesh>

      <mesh position={[0, -0.2, 0.76]} scale={[1, 0.6, 1]}>
        <boxGeometry args={[0.22, 0.04, 0.02]} />
        <meshStandardMaterial color="#1f2a3f" roughness={0.5} />
      </mesh>

      <group position={[0, 0.95, 0.05]}>
        <mesh position={[0, 0.16, 0]}>
          <cylinderGeometry args={[0.03, 0.03, 0.32, 12]} />
          <meshStandardMaterial
            color="#ffd1dd"
            emissive="#ff9bb8"
            emissiveIntensity={0.35}
          />
        </mesh>
        <mesh position={[0, 0.38, 0]}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshStandardMaterial
            color="#ff9bb8"
            emissive="#ff9bb8"
            emissiveIntensity={0.6}
          />
        </mesh>
      </group>
    </group>
  );
}

export function ContactScene({
  mode,
  nameEl,
  emailEl,
  messageEl,
  typingIntensity,
}: ContactSceneProps) {
  return (
    <Canvas
      className="h-full w-full"
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 1.6]}
      camera={{ position: [0, 0, 3], fov: 50 }}
    >
      <ambientLight intensity={0.9} />
      <directionalLight position={[3, 3, 3]} intensity={1.1} />
      <pointLight position={[-2.5, 2.5, 3]} intensity={0.6} color="#b7dcff" />
      <pointLight position={[2.5, -1.5, 3]} intensity={0.45} color="#ffd3e1" />
      <RobotHead
        mode={mode}
        nameEl={nameEl}
        emailEl={emailEl}
        messageEl={messageEl}
        typingIntensity={typingIntensity}
      />
    </Canvas>
  );
}
