import { Canvas } from '@react-three/fiber'
import { PlayerBox } from './components/PlayerBox'
import { OrbitControls, Stats } from '@react-three/drei'
import { Lighting } from './components/Lighting'
import { Helpers } from './components/Helpers'
import { RingOfFire } from './components/RingOfFire'
import { Camera } from './components/Camera'
import { useInput } from './hooks/useInput'


function App() {

  const helpersVisible = true

  return (
    <Canvas camera={{ position: [0,3,5] }}>
      <Camera />
      <Helpers visible={helpersVisible} />
      <Lighting helper={helpersVisible} />
      <PlayerBox helper={helpersVisible} />
      <RingOfFire />
      {/* <OrbitControls /> */}
      <Stats />
    </Canvas>
  )
}

export default App
