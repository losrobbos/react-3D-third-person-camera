import { Canvas } from '@react-three/fiber'
import { Box } from './components/Box'
import { OrbitControls, Stats } from '@react-three/drei'
import { Lighting } from './components/Lighting'


function App() {

  const helpersVisible = false

  return (
    <Canvas>
      <axesHelper args={[5]} visible={helpersVisible} />
      <Lighting />
      <Box />
      <OrbitControls />
      <Stats />
    </Canvas>
  )
}

export default App
