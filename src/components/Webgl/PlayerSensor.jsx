import React from 'react';

// 3D libraries
import { BallCollider } from '@react-three/rapier';

// Stores
// import useGame from '@stores/use-game';

function PlayerSensor({ radius = null, ...delegated }) {
  const radiusValue = radius || 0.4;

  function handleIntersectionEnter({ manifold, target, other }) {
    // Enable the rigid body
    other.rigidBody.wakeUp();
    other.collider.setSensor( true );

    console.log( other )
  }
  
  function handleIntersectionExit({ manifold, target, other }) {
    // Disable the rigid body
    other.rigidBody.sleep();
    other.collider.setSensor( false );
    console.log( 2 )
    // other.rigidBodyObject.setSensor( false );
  }
  
  return (
    <BallCollider 
      sensor
      args={[ radiusValue ]} 
      mass={ 0 }
      onIntersectionEnter={ handleIntersectionEnter }
      onIntersectionExit={ handleIntersectionExit }
      { ...delegated }
    />
  )
}

export default React.memo( PlayerSensor );
