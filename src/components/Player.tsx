import { useAnimations, useGLTF, useHelper } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import { AnimationAction, Box3, BoxHelper, BufferGeometry, LoopOnce, Material, Mesh, NormalBufferAttributes, Object3DEventMap, Quaternion, Vector3 } from "three";
import { useInput } from "../hooks/useInput";
import { useCamera } from "../hooks/useCamera";
import { calcCameraLookAtNew, calcCameraOffsetNew, setModelBoundingBox, updateModelBoundingBox } from "../utils/utils";
import { GLTFResult } from "../types/GLTFResult";

type ModelAction = "Idle" | "Walking" | "Running" | "Jump" | "Dance" | "Death" | "Wave" | "ThumbsUp"

type Props = {
  position?: [number, number, number],
  helper?: boolean
}

const playerSize = new Vector3()

// load tracks OUTSIDE of component (=> to prevent reloading on re-render)
const musicTheme = new Audio("./tracks/theme.mp3")
const musicJingle = new Audio("./tracks/jingle.mp3")
musicTheme.volume = 0.1
musicJingle.volume = 0.3


export const Player = ({ helper = false, position = [0, 0, 0] }: Props) => {

  const camera = useCamera()
  const { keysPressed } = useInput()
  const [animationCurrent, setAnimationCurrent] = useState("Idle")
  const { animations, nodes, scene: sceneModel } = useGLTF("./models/robot.glb") as GLTFResult
  const scene = useThree(state => state.scene)
  const refPlayer = useRef<Mesh>(null!)
  const [audio, setAudio] = useState(false)

  const model = sceneModel // nodes["RootNode"] // the actual model
  const modelBB = nodes["RobotArmature"] // the core "rumpf" of the model => ideal for usage as bounding box!

  const refHelper = useRef(modelBB)
  const { actions } = useAnimations(animations, model)
  // const { Idle, Walking, Running, Jump, Dance, Death } = actions
  // other animations for later usage: Dance, Death, Wave, Yes, No, Punch, Sitting, Standing, ThumbsUp, WalkJump

  // use robot armature as helper reference, because it has a bounding box limited to the core
  // useHelper(helper && refPlayer, BoxHelper, "grey")
  useHelper(helper && refHelper, BoxHelper, "grey")

  // set initial player & camera position
  useEffect(() => {
    if (!refPlayer.current) return
    const player = refPlayer.current

    player.position.set(...position)

    player.scale.set(0.4, 0.4, 0.4)

    // parts of model should all cast shadow on ground!
    player.traverse((obj) => {
      if (obj instanceof Mesh) {
        obj.castShadow = true;
        obj.receiveShadow = true;
      }
    })

    // compute bounding box
    setModelBoundingBox(player, modelBB, playerSize)

    // position camera to view in player direction (= see world sneeking "behind players shoulder")
    // camera.position.copy(calcCameraOffsetNew(player))
    // camera.lookAt(calcCameraLookAtNew(player))

    // start initial animation
    actions[animationCurrent]?.play()

    // on unmount of player => stop any running tracks!
    return () => {
      musicTheme.pause()
      musicJingle.pause()
    }

  }, [])

  /**
   * ANIMATION handler
   * => always changes animation on new KEY PRESS
   */
  useEffect(() => {

    if (!refPlayer.current) return
    const player = refPlayer.current

    // check if user switches music on
    if(keysPressed.audio) {
      // toggle AUDIO
      if(audio) {
        musicTheme.pause()
        setAudio(false)
      }
      else {
        musicTheme.play()
        setAudio(true)
      }

    }


    // determine new animation (default: idle)
    let actionToPlay: ModelAction = "Idle"

    // MOVEMENT anim?
    if (keysPressed.up || keysPressed.down) {
      actionToPlay = "Walking"
      if (keysPressed.shift) {
        actionToPlay = "Running"
      }
    }

    const torus = scene.getObjectByName("RingOfFire") as 
      Mesh<BufferGeometry<NormalBufferAttributes>, Material | Material[], Object3DEventMap>
    // determine collision of bounding boxes!
    if (torus && player && player.userData.boundingBox && torus.userData.boundingBox) {
      const playerBB = player.userData.boundingBox as Box3
      const torusBB = torus.userData.boundingBox as Box3
      if (playerBB.intersectsBox(torusBB)) {
        console.log("!!! INTERSECT !!!")
        actionToPlay = "Dance"
        // remove collided object with delay
        setTimeout(()=> {
          musicJingle.play()
          torus.geometry.dispose();
          scene.remove(torus)
        }, 2000)
      }

    }


    // JUMPING?
    if (keysPressed.space) {
      actionToPlay = "Jump"
    }

    // check if out of bounds => play DEATH
    if (Math.abs(player.position.z) >= 8 || Math.abs(player.position.x) >= 8) {
      actionToPlay = "Death"
    }

    // setup 2: run animation (if changed)
    if (actionToPlay === animationCurrent) return

    const actionCurrent = actions[animationCurrent] as AnimationAction
    const actionNew = actions[actionToPlay] as AnimationAction

    if (actionToPlay !== "Death" && actionToPlay !== "Dance") {
      // actions[animationCurrent]?.crossFadeTo(actions[actionToPlay] as AnimationAction, 0.5, true)
      actionCurrent.fadeOut(0.5)
      // animation must get resetted because if it was already played it is usually stuck in "end" state
      // reset re-starts the animation track from beginning!
      actionNew.reset().fadeIn(0.5).play()
    }
    // death animation (=> only once pleaaase :)
    else {
      actionCurrent.fadeOut(0.1)
      actionNew.reset().fadeIn(0.1).setLoop(LoopOnce, 1).play();
      actionNew.clampWhenFinished = true; // keep animation at end frame / stuck at death :)
    }

    // update current animation
    setAnimationCurrent(actionToPlay)
  }, [keysPressed])


  /**
   * Every Frame => MOVE player in current active direction (left, right, up, down)
   * + check collisions with world objects!
   */
  useFrame(() => {
    if (!refPlayer.current) return
    const player = refPlayer.current

    // updae BOUNDING box of player
    updateModelBoundingBox(player, modelBB)

    // perform ROTATION (of player + camera)
    if (keysPressed.left || keysPressed.right) {
      const rotationShift = keysPressed.left ? 0.03 : -0.03

      // determine rotation as quaternion
      const q = new Quaternion()
      q.setFromAxisAngle(new Vector3(0, 1, 0).normalize(), rotationShift)

      // rotate player by given angle
      player.applyQuaternion(q)

      // calculate new camera POSITION
      camera.position.copy(calcCameraOffsetNew(player))
      // calculate new LOOK AT position (only needed on player rotation)
      camera.lookAt(calcCameraLookAtNew(player))
    }

    // perform MOVEMENT of player in direction 
    // (and shift camera by same amount to create "following" effect!)
    if (keysPressed.up || keysPressed.down) {
      const playerDirection = new Vector3()

      player.getWorldDirection(playerDirection)
      const acceleration = keysPressed.up ? 0.05 : -0.05
      // move player position in accordance to current orientation (=world direction) 
      // therefore we multiply the current DIRECTION vector by some reasonable value of "acceleration"
      // that value will simply determine, how much space forward / backward the character moves on a keystroke
      // the higher the value => the bigger the move
      const positionShift = playerDirection.multiplyScalar(acceleration)
      player.position.add(positionShift)

      // calculate new camera POSITION
      camera.position.copy(calcCameraOffsetNew(player))
      // calculate new LOOK AT position (only needed on player rotation)
      camera.lookAt(calcCameraLookAtNew(player))
    }

  })

  return (
    <>
      {/* <object3D ref={refPlayer}> */}
      {/* player mesh object is nested one level inside scene */}
      <primitive ref={refPlayer} object={model} />
      {/* <primitive object={model} /> */}
      {/* </object3D> */}
    </>
  );
}

useGLTF.preload("./models/robot.glb")