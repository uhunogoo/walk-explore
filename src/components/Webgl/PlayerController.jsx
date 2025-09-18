import React from 'react';

// 3D libraries
import { useControls } from 'leva';
import { useFrame } from '@react-three/fiber';
import { useRapier } from '@react-three/rapier';
import { useKeyboardControls } from '@react-three/drei';

// stores
import useGame from '@stores/use-game';


function PlayerController({ player, children }) {
  const { impolseValue, torqueValue } = useControls( 'Player', { 
    impolseValue: { value: 0.3, min: 0.001, max: 4, step: 0.01 }, 
    torqueValue: { value: 0.15, min: 0.001, max: 4, step: 0.01 }
  } );

  const [ subscribeKeys, getKeys ] = useKeyboardControls();
  const { rapier, world } = useRapier();

  // stores
  const restart = useGame( (state) => state.restart );

  // jump
  function jump() {
    const origin = player.current.translation();
    origin.y -= 0.31;
    const direction = { x: 0, y: -1, z: 0 };
    const ray = new rapier.Ray(origin, direction);
    const hit = world.castRay(ray, 10, true);

    if (hit.timeOfImpact < 0.15) {
      player.current.applyImpulse({ x: 0, y: 0.5, z: 0 }); 
    }
  }

  function reset( player ) {
    if (!player) return;
    player.resetForces(true);  // Reset the forces to zero
    player.resetTorques(true); // Reset the torques to zero

    player.setTranslation({ x: 0, y: 1, z: 0.5 });
    player.setLinvel({ x: 0, y: 0, z: 0 });
    player.setAngvel({ x: 0, y: 0, z: 0 });
  };

  React.useEffect(() => {
    const selectorFunction = ( state ) => state.jump;
    const listenerFunction = ( value ) => {
      if ( !value ) return;
      
      jump();
    }

    const unsubscribeReset = useGame.subscribe( 
      (state) => state.phase,
      (phase) => {
        if ( phase === 'ready' ) {
          reset( player.current );
        }
      }
    );

    const unsubscribeJump = subscribeKeys(
      selectorFunction,
      listenerFunction
    );
    
    return () => {
      unsubscribeJump();
      unsubscribeReset();
    } 
  }, [ subscribeKeys, player ]);

  useFrame((state, delta) => {
    if ( !player?.current ) return;

    // movement
    const { forward, backward, leftward, rightward } = getKeys();
    
    // forces 
    const impulse = { x: 0, y: 0, z: 0 };
    const torque = { x: 0, y: 0, z: 0 };

    const impulseForce = impolseValue * delta;
    const torqueForce = torqueValue * delta;

    // movement
    switch (true) {
      case forward:
        impulse.z -= impulseForce;
        torque.x -= torqueForce;
        break;

      case rightward: 
        impulse.x += impulseForce;
        torque.z -= torqueForce;
        break;

      case backward:
        impulse.z += impulseForce;
        torque.x += torqueForce;
        break;

      case leftward:
        impulse.x -= impulseForce;
        torque.z += torqueForce;
        break;
    }

    // apply forces
    player.current.applyImpulse( impulse );
    player.current.applyTorqueImpulse(torque);
    
    const playerPosition = player.current.translation();

    
    // restart
    if ( playerPosition.y < -4 ) {
      restart();
    }
  });
  
  return children;
}

export default PlayerController;