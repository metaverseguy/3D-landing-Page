/* eslint-disable react/no-unknown-property */
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { OrbitControls, useContextBridge } from '@react-three/drei';
import { Trail, Float, Line, Sphere, Stars } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { useContext, useEffect, useMemo, useRef, useState } from 'react';
import ModelLoader from 'componentsForThree/ModelLoader';
import Style from './style.module.scss';
import { ControlContext } from 'provider/ControlProvider';
import Particles from 'componentsForThree/Particle';

type Props = {
  radius?: number;
  speed?: number;
  position?: Array<number>;
  rotation?: Array<number>;
};

const Electron = ({
  radius = 6.5,
  speed = 6,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
}: Props) => {
  const ref = useRef<any>();
  useFrame((state) => {
    const t = state.clock.getElapsedTime() * speed;
    ref.current.position.set(Math.sin(t) * radius, Math.cos(t) * radius, 0);
  });
  return (
    <group
      rotation={[rotation[0], rotation[1], rotation[2]]}
      position={[position[0], position[1], position[2]]}
    >
      <Trail
        local
        width={5}
        length={6}
        color={new THREE.Color(2, 1, 10)}
        attenuation={(t) => t * t}
      >
        <mesh ref={ref}>
          <sphereGeometry args={[0.25]} />
          <meshBasicMaterial color={[10, 1, 10]} toneMapped={false} />
        </mesh>
      </Trail>
    </group>
  );
};

export default function Configurator() {
  const ContextBridge = useContextBridge(ControlContext);
  return (
    <div className={Style.wrapper}>
      <Canvas
        camera={{
          position: [3.099, 4.367, 8.122],
          rotation: [0, 0, 0],
          fov: 50,
        }}
        dpr={[1, 2]}
      >
        <color attach='background' args={['#03032C']} />
        <ContextBridge>
          <ambientLight intensity={0.4} />
          <pointLight intensity={1.5} position={[10, 10, 10]} />
          <pointLight intensity={1.5} position={[-10, 10, -10]} />
          <pointLight intensity={1.5} position={[-10, 30, -10]} />
          <ModelLoader />
          <Sphere position={[0, 3.73, 0]} args={[0.05, 100, 64]}>
            <meshBasicMaterial color={[1, 0.9, 12]} toneMapped={false} />
          </Sphere>
          <Particles />
          <Stars saturation={0} count={400} speed={0.5} />
          <EffectComposer multisampling={8}>
            <Bloom
              kernelSize={3}
              luminanceThreshold={0}
              luminanceSmoothing={0.8}
              intensity={0.2}
            />
          </EffectComposer>
        </ContextBridge>
      </Canvas>
    </div>
  );
}
