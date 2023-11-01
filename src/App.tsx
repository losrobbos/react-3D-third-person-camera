import { Canvas } from '@react-three/fiber'
import { PlayerBox } from './components/PlayerBox'
import { Stats } from '@react-three/drei'
import { Lighting } from './components/Lighting'
import { Helpers } from './components/Helpers'
import { RingOfFire } from './components/RingOfFire'
import { Camera } from './components/Camera'

function App() {

  const helpersVisible = true

  return (
    <Canvas camera={{ position: [0,1,3] }}>
      <PlayerBox helper={false} />
      <Helpers visible={helpersVisible} />
      <Lighting helper={helpersVisible} />
      <RingOfFire />
      {/* <OrbitControls /> */}
      <Camera />
      <Stats />
    </Canvas>
  )
}

export default App
