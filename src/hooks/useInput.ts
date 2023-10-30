import { useEffect, useState } from "react"

interface IKeyMap {
  ArrowLeft: "left";
  ArrowRight: "right";
  ArrowUp: "up";
  ArrowDown: "down";
  Shift: "shift";
  " ": "space";
}

const KEY_MAP: IKeyMap = {
  ArrowLeft: "left",
  ArrowRight: "right",
  ArrowUp: "up",
  ArrowDown: "down",
  Shift: "shift",
  " ": "space"
}

export const useInput = () => {

  const [keysPressed, setKeysPressed] = useState({
    up: false,
    down: false,
    left: false,
    right: false,
    space: false,
    shift: false
  }) 

  const setUnsetKey = (e: KeyboardEvent, active: boolean) => {
    if (e.key in KEY_MAP) {
            
      const KEY = KEY_MAP[e.key as keyof IKeyMap]

      setKeysPressed({
        ...keysPressed,
        [KEY]: active,
      });
    }
  };

  const setKey = (e: KeyboardEvent) => setUnsetKey(e, true)

  const unsetKey = (e: KeyboardEvent) => setUnsetKey(e,false)

  // register keyboard events once
  useEffect(() => {
    document.addEventListener("keydown", setKey)
    document.addEventListener("keyup", unsetKey)

    return () => {
      document.removeEventListener("keydown", setKey)
      document.removeEventListener("keyup", unsetKey)
    }
  }, [])

  return { keysPressed, setKeysPressed }
}