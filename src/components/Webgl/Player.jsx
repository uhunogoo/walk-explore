import React from 'react';

// 3D libraries
import { BallCollider, RigidBody } from '@react-three/rapier';
import { useKeyboardControls } from '@react-three/drei';

// Stores
import useGame from '@stores/use-game';

// Components
import PlayerController from '@components/Webgl/PlayerController';
import CameraController from '@components/Webgl/CameraController';
import PlayerSensor from '@components/Webgl/PlayerSensor';

function Player() {
  const playerRef = React.useRef();
  const [ subscribeKeys ] = useKeyboardControls();

  // stores
  const start = useGame( (state) => state.start );
  const setPlayer = useGame( (state) => state.setPlayer );
  const interactionGroups = useGame( (state) => state.interactionGroups );

  React.useEffect(() => {
    const unsubscribeAny = subscribeKeys(() => {
      start();
    });

    setPlayer( playerRef.current );

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
        <BallCollider 
          args={[ 0.3 ]} 
          collisionGroups={ interactionGroups.player } 
        />
        <PlayerSensor 
          radius={ 0.4 } 
          collisionGroups={ interactionGroups.sensor }
        />

        {/* Player mesh */}
        <mesh castShadow>
          <icosahedronGeometry args={[ 0.3, 1 ]} />
          <meshStandardMaterial flatShading color="mediumpurple" />
        </mesh>
      </RigidBody>

      {/* Controllers */}
      <PlayerController playerRef={ playerRef } />
      <CameraController />
    </>
  )
}

export default Player;