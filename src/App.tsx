import { Canvas } from '@react-three/fiber'
import { PlayerBox } from './components/PlayerBox'
import { Lighting } from './components/Lighting'
import { Helpers } from './components/Helpers'
import { RingOfFire } from './components/RingOfFire'
import { Ground } from './components/Ground'

function App() {

  const helpersVisible = false

  return (
    <Canvas camera={{ position: [-1, 1, 3] }} shadows>
      {/* <color args={[0.2,0,1]} attach="background" /> */}
      <Ground />
      <PlayerBox helper={helpersVisible} />
      <Helpers visible={helpersVisible} />
      <Lighting helper={helpersVisible} />
      <RingOfFire />
    </Canvas>
  )
}

export default App
