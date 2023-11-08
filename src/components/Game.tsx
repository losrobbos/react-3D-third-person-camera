import { PlayerBox } from './PlayerBox'
import { Lighting } from './Lighting'
import { Helpers } from './Helpers'
import { RingOfFire } from './RingOfFire'
import { Ground } from './Ground'
import { Physics, RigidBody } from '@react-three/rapier'

const helpersVisible = true

export const Game = () => {

  return (
    <Physics>
      <RigidBody name="Ground-Colly" >
        <Ground />
      </RigidBody>
      {/* <RigidBody name="Player-Colly" colliders={"hull"}> */}
        <PlayerBox helper={true} />
      {/* </RigidBody> */}
      {/* <RigidBody name="Torus-Colly"  > */}
        <RingOfFire helper={true} />
      {/* </RigidBody> */}
      <Lighting helper={helpersVisible} />
      <Helpers visible={false} />
    </Physics>

  )
}