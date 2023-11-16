import { useEffect, useState } from "react";

interface IKeyMap {
  ArrowLeft: "left";
  ArrowRight: "right";
  ArrowUp: "up";
  ArrowDown: "down";
  Shift: "shift";
  Enter: "enter"
  " ": "space";
  "a": "audio",
}

const KEY_MAP: IKeyMap = {
  ArrowLeft: "left",
  ArrowRight: "right",
  ArrowUp: "up",
  ArrowDown: "down",
  Shift: "shift",
  Enter: "enter",
  " ": "space",
  "a": "audio"
};

export const useInput = () => {
  const [keysPressed, setKeysPressed] = useState({
    up: false,
    down: false,
    left: false,
    right: false,
    space: false,
    shift: false,
    enter: false,
    audio: false
  });

  const toggleKey = (e: KeyboardEvent, active: boolean) => {

    if (e.key in KEY_MAP) {
      const KEY = KEY_MAP[e.key as keyof IKeyMap];

      // prevent stale closure state data by using callback (!) syntax of state of setter function 
      setKeysPressed((previous) => ({
        ...previous,
        [KEY]: active,
      }));
    }
  };

  const setKey = (e: KeyboardEvent) => toggleKey(e, true);

  const unsetKey = (e: KeyboardEvent) => toggleKey(e, false);

  useEffect(() => {

    // register keyboard events once
    document.addEventListener("keydown", setKey);
    document.addEventListener("keyup", unsetKey);

    // clear listeners on scene unmount
    return () => {
      document.removeEventListener("keydown", setKey);
      document.removeEventListener("keyup", unsetKey);
    };
  }, []);

  return { keysPressed, setKeysPressed };
};
