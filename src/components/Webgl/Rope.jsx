import React from 'react';
// import * as THREE from 'three/webgpu';

// 3D libraries
import { BallCollider, RigidBody, useRopeJoint } from '@react-three/rapier';

// Utils
import { range } from '@lib/utils';

// Stores
import useGame from '@stores/use-game';

function Rope({ length = 1, nodes = 2, position = [0, 0, 0], ...props }) {
  // Parameters
  const ropeID = React.useId();
  const segmentLength = ( length / ( nodes - 1 ) ) || 1;
  const dampings = { linearDamping: 2, angularDamping: 2 };

  // Segment references
  const refs = React.useRef(
    [ ...range( nodes ).map( () => React.createRef() ) ]
  );

  // Stores
  const interactionGroups = useGame( (state) => state.interactionGroups );

  return (
    <group dispose={ null }>
      { refs.current.map( ( ref, id ) =>
        <RigidBody 
          key={ id } 
          ref={ ref } 
          type={ id === 0 ? "kinematicPosition" : "dynamic" }
          position={[ position[0], position[1] - id * segmentLength, position[2] ]}
          colliders={ false }
          name={ `ropeNode-${ id }` }
          userData={ { id: ropeID } }
          { ...dampings }
          { ...props } 
        >
          {/* Rope node collider */}
          <BallCollider 
            args={[0.02]}
            collisionGroups={ interactionGroups.item } 
          />

          {/* Rope joint */}
          { id > 0 && (
            <RopeJoint 
              a={ refs.current[id - 1] } 
              b={ refs.current[id] } 
              segmentLength={ segmentLength } 
            />
          )}
        </RigidBody>
      ) }
    </group>
  );
}

const RopeJoint = ({ a, b, segmentLength = 1 }) => {
  useRopeJoint(a, b, [ [0, 0, 0], [0, 0, 0], segmentLength ]);
  return null;
};

export default Rope;