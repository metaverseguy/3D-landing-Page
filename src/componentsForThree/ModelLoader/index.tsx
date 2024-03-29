/* eslint-disable react/no-unknown-property */
import { useLoader } from '@react-three/fiber';
import { Suspense } from 'react';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

export default function Heart() {
  const { scene: model } = useLoader(GLTFLoader, 'model/scene.glb');
  return (
    <Suspense fallback={null}>
      <primitive object={model} scale={[30, 30, 30]} />
    </Suspense>
  );
}
