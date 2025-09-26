// 3D libraries
import { CuboidCollider, RigidBody } from '@react-three/rapier';

// Stores
import { colisionGroups } from '@stores/use-game';

function Bounds({ userData = {}, ...delegated }) {
  return (
    <RigidBody type="fixed" restitution={0.2} friction={0} userData={ userData }>
      <CuboidCollider 
        args={[ 0.5, 0.1, 0.5 ]}
        restitution={ 0.2 } 
        friction={ 1 }
        collisionGroups={ colisionGroups.world }
        {...delegated} 
      />
    </RigidBody>
  )
}

export default Bounds;