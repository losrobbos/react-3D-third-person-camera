import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import { Game } from './components/Game'

function App() {

  return (
    <Suspense fallback={<h2>Loading...</h2>}>
      <Canvas camera={{ position: [-1, 3, 5] }} shadows>
        <Game />
      </Canvas>
    </Suspense>
  )
}

export default App
