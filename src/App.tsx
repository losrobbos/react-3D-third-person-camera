import { Canvas } from '@react-three/fiber'
import { Box } from './components/Box'
import { OrbitControls, Stats } from '@react-three/drei'
import { Lighting } from './components/Lighting'
import { Helpers } from './components/Helpers'


function App() {

  const helpersVisible = true

  return (
    <Canvas>
      <Helpers visible={helpersVisible} />
      <Lighting helper={helpersVisible} />
      <Box helper={helpersVisible} />
      <OrbitControls />
      <Stats />
    </Canvas>
  )
}

export default App
