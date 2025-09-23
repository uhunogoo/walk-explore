// 3D libraries
import { CuboidCollider, RigidBody } from '@react-three/rapier';

// Stores
import useGame from '@stores/use-game';

function Bounds({ ...delegated }) {
  const interactionGroups = useGame( (state) => state.interactionGroups );
  return (
    <RigidBody type="fixed" restitution={0.2} friction={0}>
      <CuboidCollider 
        args={[ 0.5, 0.1, 0.5 ]}
        restitution={ 0.2 } 
        friction={ 1 }
        collisionGroups={ interactionGroups.world } 
        {...delegated} 
      />
    </RigidBody>
  )
}

export default Bounds;