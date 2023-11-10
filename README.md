# 3D Scene with Third Person Camera

Demo: https://third-person-camera.vercel.app

This demo shows a 3D scene with character movement and a camera following the player from behind (=third person camera)

## Stack

- React
- React Three Fiber (for 3D scene & 3D object creation)

Robot Model used from three js examples repo:

https://github.com/mrdoob/three.js/tree/dev/examples/models/gltf


## Features implemented

- Basic 3D scene with a ground
- Load 3D character model into the scene (recommended format: gltf / glb)
- Place simple shape item in scene (torus ring)
- Place lighting source and let objects throw / cast shadows on the ground
- Allow keyboard input from user to control character
  - Rotate character on left / right keys
  - Move character forward / backward on arrow up / down keys
  - Play running animation when holding shift key together with up/down key
  - Play jump animation when holding space key
- Animations
  - Implement player animations: idle, walk, running
  - Out of scene bounds check: Play death animation
- Third Person Camera Follow of player movement
- Collision Check
  - determine collision between player model object & torus ring
  - apply Bounding boxes for collision detection
  - on collision: play robot "recharge" animation
  - on collision: remove Torus ring from scene

## Planned features

- Add more models into the scene which player can not walk through (=rigid body objects)
- Add Scene Background with Images Cube (=Skybox / Environment Map)


## Planned Bugfixes

- Expand light area (=camera frustum) so that shadows are casted on the whole scene and are not cut off at bounds of scene
