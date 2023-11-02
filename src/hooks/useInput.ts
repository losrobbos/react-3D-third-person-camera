import { useEffect, useState } from "react";

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
  " ": "space",
};

export const useInput = () => {
  const [keysPressed, setKeysPressed] = useState({
    up: false,
    down: false,
    left: false,
    right: false,
    space: false,
    shift: false,
  });

  const toggleKey = (e: KeyboardEvent, active: boolean) => {
    if (e.key in KEY_MAP) {
      const KEY = KEY_MAP[e.key as keyof IKeyMap];

      setKeysPressed({
        ...keysPressed,
        [KEY]: active,
      });
    }
  };

  const setKey = (e: KeyboardEvent) => toggleKey(e, true);

  const unsetKey = (e: KeyboardEvent) => toggleKey(e, false);

  /**
   * ! WARNING: Event listeners must alwas be RE-created on state change
   * This way we prevent stale state snapshot data in listeners
   */
  useEffect(() => {

    // register keyboard events once
    document.addEventListener("keydown", setKey);
    document.addEventListener("keyup", unsetKey);

    // clear listeners on scene unmount
    return () => {
      document.removeEventListener("keydown", setKey);
      document.removeEventListener("keyup", unsetKey);
    };
  }, [keysPressed]);

  return { keysPressed, setKeysPressed };
};
