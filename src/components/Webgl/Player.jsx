import React from 'react';

// 3D libraries
import { BallCollider} from '@react-three/rapier';
import { useKeyboardControls } from '@react-three/drei';

// Stores
import useGame, { colisionGroups } from '@stores/use-game';

// Components
import PlayerSensor from '@components/Webgl/PlayerSensor';
import PlayerController from '@components/Webgl/PlayerController';
import PlayerCamera from '@components/Webgl/PlayerCamera';

function Player() {
  // Defaults
  const playerRef = React.useRef();
  const [ subscribeKeys ] = useKeyboardControls();

  // Stores
  const start = useGame( (state) => state.start );

  // Start game logic
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
      {/* Player controller */}
      <PlayerController ref={ playerRef } position={[ 0, 1, 0 ]}>

        {/* Player collider */}
        <BallCollider 
          args={[ 0.3 ]} 
          collisionGroups={ colisionGroups.player } 
        />

        {/* Player sensor */}
        <PlayerSensor 
          radius={ 2 } 
          collisionGroups={ colisionGroups.sensor }
        />

        {/* Player mesh */}
        <mesh castShadow>
          <icosahedronGeometry args={[ 0.3, 1 ]} />
          <meshStandardMaterial flatShading color="mediumpurple" />
        </mesh>
      </PlayerController>

      {/* Player camera */}
      <PlayerCamera playerRef={ playerRef } />
    </>
  );
}

export default Player;