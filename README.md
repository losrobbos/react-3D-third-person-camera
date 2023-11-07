# 3D Scene with Third Person Camera

## Features Plan - Step by Step


### DONE 

- Setup basic scene with a ground
- Load a character model into the scene
- Place simple shape item in scene (torus ring)
- Allow keyboard input from user to control character
  - Rotate character on left / right keys
  - Move character forward / backward on arrow up / down keys
  - Increase player speed when holding shift
- Implement player animations: idle, walk, running
- Out of scene bounds check: play death animation
- Third Person Camera Follow of player movement

### OPEN 

- Environment Map! Use Environment Drei Component + Preset
- Collision detection between player and torus ring using bounding boxes
- Collision detection between player and enemy
  - Player Health reduction on hit
  - Player Death animation on zero health
- On Death: Offer "replay" button
  - On replay: Dispose & Relod scene objects
- Implement attack
  - Play punch animation on space key 
  - Enemy Health reduction on hitting player in attack / punch state
- Explosions
  - Implement enemy model destruction on death
  