import React from 'react';

// 3D libraries
import { BallCollider } from '@react-three/rapier';

// Stores
// import useGame from '@stores/use-game';

function PlayerSensor({ radius = null, ...delegated }) {
  const radiusValue = radius || 0.4;
  
  // const playerSensorRef = React.useRef();
  // const player = useGame( (state) => state.player );
  const [ intersectedObjects, setIntersectedObjects ] = React.useState( [] );

  function handleIntersectionEnter({ manifold, target, other }) {
    const rigidBodyObject = other.rigidBodyObject;
    console.log( rigidBodyObject );
  }

  function handleIntersectionExit({ manifold, target, other }) {
    console.log( exit )
  }

  React.useEffect(() => {
    console.log( intersectedObjects );
  }, [ intersectedObjects ]);

  return (
    <BallCollider 
      sensor
      args={[ radiusValue ]} 
      mass={ 0 }
      onIntersectionEnter={ handleIntersectionEnter }
      // onIntersectionExit={ handleIntersectionExit }
      { ...delegated }
    />
  )
}

export default React.memo( PlayerSensor );
