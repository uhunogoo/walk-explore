// import React from 'react';

// Components
import Bounds from '@components/Webgl/Bounds';
import Rope from '@components/Webgl/Rope';
import { interactionGroups } from '@react-three/rapier';
import useGame from '@stores/use-game';

function Level() {
  const groups = useGame( (state) => state.groups );

  return (
    <>
      <Rope position={[ 0, 2, 2 ]} length={ 2 } nodes={ 10 } />

      <mesh position={[ 0, -0.2, 0 ]} receiveShadow>
        <boxGeometry args={[ 20, 0.4, 20 ]} />
        <meshStandardMaterial color="white" />
      </mesh>

      <Bounds name="floor" args={[ 10, 0.2, 10 ]} position={[ 0, -0.2, 0 ]} collisionGroups={ interactionGroups( groups.WORLD ) } />
    </>
  )
}

export default Level;