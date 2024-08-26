import gameState, { handleUserAction } from "./gameState.js";
import { TICK_RATE } from "./constants.js";
import initButtons from "./buttons.js";

function init() {
  console.log("start game");
  initButtons(handleUserAction);

  let nextTimeToTick = Date.now();

  function nextAnimationFrame() {
    const now = Date.now();

    if (nextTimeToTick <= now) {
      gameState.tick();
      nextTimeToTick = now + TICK_RATE;
      console.log(
        new Date(nextTimeToTick).toLocaleTimeString("en-us", {
          minute: "2-digit",
          hour: "2-digit",
          day: "2-digit",
          month: "short",
        })
      );
    }

    requestAnimationFrame(nextAnimationFrame);
  }

  nextAnimationFrame();
}

init();
