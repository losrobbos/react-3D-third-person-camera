import { Canvas } from '@react-three/fiber'
import { PlayerBox } from './components/PlayerBox'
import { OrbitControls, Stats } from '@react-three/drei'
import { Lighting } from './components/Lighting'
import { Helpers } from './components/Helpers'
import { RingOfFire } from './components/RingOfFire'


function App() {

  const helpersVisible = true

  // TODO: code ZOOM by keys! (=> change fov of camera)

  return (
    <Canvas camera={{ position: [0,3,5], fov: 30 }}>
      <Helpers visible={helpersVisible} />
      <Lighting helper={helpersVisible} />
      <PlayerBox helper={helpersVisible} />
      <RingOfFire />
      <OrbitControls />
      <Stats />
    </Canvas>
  )
}

export default App
