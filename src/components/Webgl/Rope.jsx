import React from 'react';

import { BallCollider, RigidBody, useRopeJoint } from '@react-three/rapier';
import { range } from '@lib/utils';

const RopeJoint = ({ a, b, segmentLength = 1 }) => {
  useRopeJoint(a, b, [ [0, 0, 0], [0, 0, 0], segmentLength ]);
  // useRopeJoint(a, b, [[0, -segmentLength/2, 0], [0, segmentLength/2, 0], segmentLength]);
  return null;
};

function Rope({ length = 1, nodes = 2, position = [0, 0, 0], ...props }) {
  const refs = React.useRef(
    [ ...range( nodes ).map( () => React.createRef() ) ]
  );

  // Parameters
  const segmentLength = length / ( nodes - 1 ); // Segment count is one less than nodes count
  const dampings = { linearDamping: 2, angularDamping: 2 };

  function handleCollisionEnter({ manifold, target, other }) {
    const rigidBodyObject = other.rigidBodyObject;
    const name = rigidBodyObject.name;

    if (name === 'player') {
      console.log('Collision with player');
    }
  }

  React.useEffect(() => {
    
  }, []);
  
  return (
    <group dispose={ null }>
      { refs.current.map( ( ref, id ) =>
        <RigidBody 
          key={ id } 
          ref={ ref } 
          type={ id === 0 ? "kinematicPosition" : "dynamic" }
          position={[ position[0], position[1] - id * segmentLength, position[2] ]}
          colliders={ false }
          name="ropeNode"
          // onCollisionEnter={ handleCollisionEnter}
          { ...dampings }
          { ...props } 
        >
          <BallCollider args={[0.02]} />
          { id > 0 && <RopeJoint a={ refs.current[id - 1] } b={ refs.current[id] } segmentLength={ segmentLength } /> }
        </RigidBody>
      ) }
    </group>
  );
}

export default Rope;