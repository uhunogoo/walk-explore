import React from 'react';

// Components
import Bounds from '@components/Webgl/Bounds';
import { colisionGroups } from '@stores/use-game';
// import Rope from '@components/Webgl/Rope';

function Level() {
  // const ropePositions = React.useMemo(() => {
  //   const ropes = 5;
  //   const positions = [];
  //   for (let i = 0; i < ropes; i++) {
  //     const x = Math.cos( i * Math.PI / ropes ) * 3;
  //     const z = Math.sin( i * Math.PI / ropes ) * 3;
  //     positions.push([ x, 2, z ]);
  //   }
  //   return positions;
  // }, []);
  return (
    <>
      {/* <Rope position={[ 0, 2, 2 ]} length={ 2 } nodes={ 10 } /> */}
      
      <InteractiveObject />

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

function InteractiveObject({ id = null }) {
  const platformID = id ||React.useId();
  return (
    <>
      <Bounds 
        name="platformActivate"
        sensor
        args={[ 0.25, 0.1, 0.25 ]} 
        position={[ 1, 0.1, 0 ]}
        userData={ { id: platformID } }
        onIntersectionEnter={() => console.log('platformActivate')}
        collisionGroups={ colisionGroups.item } 
      />

      <mesh position={[ 0, 0.1, 0 ]} castShadow receiveShadow>
        <boxGeometry args={[ 1, 0.2, 1 ]} />
        <meshStandardMaterial color="green" />
      </mesh>

      <Bounds 
        name="platform" 
        args={[ 0.5, 0.1, 0.5 ]} 
        position={[ 0, 0.1, 0 ]} 
      />
    </>
  )
}

export default Level;