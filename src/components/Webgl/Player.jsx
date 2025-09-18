import React from 'react';

// 3D libraries
import { BallCollider, RigidBody } from '@react-three/rapier';
import { useKeyboardControls } from '@react-three/drei';

// Stores
import useGame from '@stores/use-game';

// Components
import PlayerSensor from '@components/Webgl/PlayerSensor';
import PlayerController from '@components/Webgl/PlayerController';
import CameraController from '@components/Webgl/CameraController';

function Player() {
  const playerRef = React.useRef();
  const [ subscribeKeys ] = useKeyboardControls();

  // stores
  const start = useGame( (state) => state.start );

  React.useEffect(() => {
    const unsubscribeAny = subscribeKeys(() => {
      start();
    });

    return () => {
      unsubscribeAny();
    } 
  }, [ subscribeKeys ]);
  
  return (
    <>
      <RigidBody 
        ref={ playerRef} 
        name="player"
        canSleep={ false } 
        colliders={ false } 
        restitution={0.2} 
        friction={1} 
        linearDamping={0.5}
        angularDamping={0.5}
        position={[ 0, 1, 0 ]}
      >
        <BallCollider args={[ 0.3 ]} />
        {/* Sensor for detect collisions */}
        <PlayerSensor radius={ 1.2 } />

        {/* Player mesh */}
        <mesh castShadow>
          <icosahedronGeometry args={[ 0.3, 1 ]} />
          <meshStandardMaterial flatShading color="mediumpurple" />
        </mesh>
      </RigidBody>

      {/* Controllers */}
      <CameraController player={ playerRef } />
      <PlayerController player={ playerRef } />
    </>
  )
}

export default Player;