import React from 'react';

// 3D libraries
import { BallCollider } from '@react-three/rapier';
import { useFrame } from '@react-three/fiber';

// Stores
import useGame from '@stores/use-game';

function PlayerSensor({ radius = null, ...delegated }) {
  const radiusValue = radius || 0.4;
  const playerSensorRef = React.useRef();
  const player = useGame( (state) => state.player );
  const [ intersectedObjects, setIntersectedObjects ] = React.useState( [] );

  function handleIntersectionEnter({ manifold, target, other }) {
    setIntersectedObjects( ( prev ) => {
      const rigidBodyObject = other.rigidBodyObject;
      const isExist = prev.some( ( obj ) => obj.name === rigidBodyObject.name );
      if ( !isExist ) {
        return [ rigidBodyObject, ...prev ];
      }
      return prev;
    });
  }

  function handleIntersectionExit({ manifold, target, other }) {
    setIntersectedObjects( ( prev ) => {
      const rigidBodyObject = other.rigidBodyObject;
      const newIntersectedObjects = prev.filter( ( obj ) => obj.name !== rigidBodyObject.name );
      return newIntersectedObjects;
    });
  }

  React.useEffect(() => {
    console.log( intersectedObjects );
  }, [ intersectedObjects ]);

  useFrame(() => {
    if ( !playerSensorRef.current ) return;
    
    const playerPosition = player.translation();
    playerSensorRef.current.setNextKinematicTranslation( playerPosition );
  })

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
