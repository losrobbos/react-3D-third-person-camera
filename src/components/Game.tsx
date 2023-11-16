import { Player } from './Player'
import { Lighting } from './Lighting'
import { Helpers } from './Helpers'
import { RingOfFire } from './RingOfFire'
import { Ground } from './Ground'
import { Physics, RigidBody } from '@react-three/rapier'
import { Trees } from './Trees'
import { Environment } from '@react-three/drei'

const helpersVisible = false

export const Game = () => {

  return (
    <Physics>
      <Environment preset="park" background />
      <RigidBody name="Ground-Colly" >
        <Ground />
      </RigidBody>
      <Trees />
      <Player helper={helpersVisible} />
      <RingOfFire helper={helpersVisible} />
      <Lighting helper={helpersVisible} />
      <Helpers visible={helpersVisible} />
    </Physics>

  )
}