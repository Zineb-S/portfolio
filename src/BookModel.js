import React, { useEffect } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import * as THREE from 'three';

function BookModel(props) {
  const { scene, nodes, animations } =  useGLTF(`${process.env.PUBLIC_URL}/animations.glb`);
  const { actions } = useAnimations(animations, scene);
  const { camera } = useThree();
  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();

  const handleClick = (event) => {
    event.stopPropagation();

    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(scene.children, true);

    if (intersects.length > 0) {
      const clickedObject = intersects[0].object;
      const clickedName = clickedObject.name;

      console.log(`Clicked object name: ${clickedName}`); // Debug: Log the name of the clicked object

      const animationMap = {
        'Book_20': "Animation_20",
        'Book_21': "Animation_21"
        // Add other object names and their corresponding animations here
      };

      const animationName = animationMap[clickedName];

      if (actions && actions[animationName]) {
        // Play the animation
        actions[animationName].reset().fadeIn(0.5).play();

        // Add an event listener to stop the animation after it completes
        actions[animationName].clampWhenFinished = true; // Prevents the animation from looping
        actions[animationName].setLoop(THREE.LoopOnce); // Set the animation to play only once
        actions[animationName].timeScale = 1; // Ensure the animation plays at normal speed

        // Stop the animation when it's done playing
        actions[animationName].getMixer().addEventListener('finished', (e) => {
          actions[animationName].stop();
          console.log(`Animation ${animationName} finished and stopped.`);
        });
      } else {
        console.warn(`No animation found for object: ${clickedName}`);
      }
    }
  };

  useEffect(() => {
    console.log(nodes);
    console.log(scene);
  }, [nodes, scene]);

  return (
    <primitive
      object={scene}
      onPointerDown={handleClick}
      scale={[12, 12, 12]} // Adjust scale to make it bigger
      position={[0, -3, 0]} // Adjust Y-position to center it vertically
      {...props}
    />
  );
}

export default BookModel;
