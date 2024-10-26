import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import BookModel from './BookModel';

function App() {
  return (
    <div id="scene" style={{ width: '100vw', height: '100vh' }}>
        <Canvas camera={{ position: [-30, 10, 20], fov: 50 }} >
      {/* Add lighting */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1.5} />

      {/* Render the book model */}
      <BookModel />

      {/* Controls for orbiting and zooming the camera */}
      <OrbitControls />
    </Canvas>
    </div>
  
  );
}

export default App;
