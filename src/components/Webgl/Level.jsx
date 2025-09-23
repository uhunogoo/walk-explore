// import React from 'react';

// Components
import Bounds from '@components/Webgl/Bounds';
import Rope from '@components/Webgl/Rope';

function Level() {
  return (
    <>
      <Rope position={[ 0, 2, 2 ]} length={ 2 } nodes={ 10 } />

      <mesh position={[ 0, -0.2, 0 ]} receiveShadow>
        <boxGeometry args={[ 20, 0.4, 20 ]} />
        <meshStandardMaterial color="white" />
      </mesh>

      <Bounds 
        name="floor" 
        args={[ 10, 0.2, 10 ]} 
        position={[ 0, -0.2, 0 ]} 
      />
    </>
  )
}

export default Level;