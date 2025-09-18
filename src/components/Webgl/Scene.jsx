import React from 'react';
import * as THREE from 'three/webgpu';

// 3D libraries
import { useControls } from 'leva';
import { Canvas, extend } from '@react-three/fiber';
import { KeyboardControls, OrbitControls } from '@react-three/drei';
import { Physics } from '@react-three/rapier';

// components
import Environment from '@components/Webgl/Environment';
import Level from '@components/Webgl/Level';
import Player from '@components/Webgl/Player';


extend( THREE );

function Scene() {
  const { debug } = useControls( "Rapier", { debug: true } );
  const [ frameloop, setFrameloop ] = React.useState( "never" );

  const map = React.useMemo(() => [
    { name: 'forward', keys: [ 'ArrowUp', 'KeyW' ] },
    { name: 'backward', keys: [ 'ArrowDown', 'KeyS' ] },
    { name: 'leftward', keys: [ 'ArrowLeft', 'KeyA' ] },
    { name: 'rightward', keys: [ 'ArrowRight', 'KeyD' ] },
    { name: 'jump', keys: [ 'Space' ] },
    { name: 'interact', keys: [ 'KeyF' ] },
  ], []);

  return (
    <KeyboardControls map={ map }>
      <Canvas
        style={{ position: 'fixed', top: 0, left: 0, height: "100vh", width: "100vw" }}
        camera={{ position: [0, 4, 4], fov: 45 }}
        frameloop={ frameloop }
        shadows
        gl={(props) => {
          const renderer = new THREE.WebGPURenderer({
            powerPreference: "high-performance",
            antialias: true,
            alpha: false,
            stencil: false,
            shadowMap: true,
            ...props,
          });
          renderer.init().then(() => {
            setFrameloop("always");
          });
          return renderer;
        }}
      >
        <Environment />

        <React.Suspense fallback={null}>
          <Physics debug={ debug } gravity={[0, -9.81, 0]}>
            
            <Player />

            <Level />

          </Physics>
        </React.Suspense>
        <OrbitControls makeDefault />
      </Canvas>
    </KeyboardControls>
  )
}

export default Scene;