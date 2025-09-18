import React from 'react';

// 3D libraries
import { BallCollider } from '@react-three/rapier';

function PlayerSensor({ radius = null }) {
  const radiusValue = radius || 0.4;

  function handleIntersectionEnter({ manifold, target, other }) {
    console.log('Intersection with rope node');
    const rigidBodyObject = other.rigidBodyObject;
    const name = rigidBodyObject.name;
    if (name === 'ropeNode') {
      console.log('Intersection with rope node');
    }
  }
  
  return (
    <BallCollider sensor args={[ radiusValue ]} mass={0} onIntersectionEnter={handleIntersectionEnter} />
  )
}


export default React.memo( PlayerSensor );
