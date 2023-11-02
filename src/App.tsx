import { Canvas } from '@react-three/fiber'
import { PlayerBox } from './components/PlayerBox'
import { Stats } from '@react-three/drei'
import { Lighting } from './components/Lighting'
import { Helpers } from './components/Helpers'
import { RingOfFire } from './components/RingOfFire'
import { Camera } from './components/Camera'
import { Ground } from './components/Ground'

function App() {

  const helpersVisible = false

  return (
    <Canvas camera={{ position: [-1, 1, 3] }}>
      <Ground />
      <PlayerBox helper={helpersVisible} />
      <Helpers visible={helpersVisible} />
      <Lighting helper={helpersVisible} />
      <RingOfFire />
      {/* <OrbitControls /> */}
      {/* <Camera /> */}
      {/* <Stats /> */}
    </Canvas>
  )
}

export default App
