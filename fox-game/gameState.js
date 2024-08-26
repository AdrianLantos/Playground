import { modFox, modScene, togglePoopBag } from "./ui.js";
import {
  RAIN_CHANCE,
  SCENES,
  DAY_LENGTH,
  NIGHT_LENGTH,
  getNextDieTime,
  getNextHungerTime,
  getNextPoopTime,
} from "./constants.js";
import { writeModdal } from "./ui.js";

const gameState = {
  current: "INIT",
  clock: 1,
  wakeTime: -1,
  sleepTime: -1,
  hungryTime: -1,
  dieTime: -1,
  poopTime: -1,
  timeToStartCelebrating: -1,
  timeToEndCelebration: -1,

  tick() {
    this.clock++;
    console.log("clock", this.clock, this.poopTime);

    if (this.clock === this.wakeTime) {
      this.wake();
    } else if (this.clock === this.sleepTime) {
      this.sleep();
    } else if (this.clock === this.hungryTime) {
      this.getHungry();
    } else if (this.clock === this.dieTime) {
      this.die();
    } else if (this.clock === this.timeToStartCelebrating) {
      this.startCelebrating();
    } else if (this.clock === this.timeToEndCelebration) {
      this.endCelebrating();
    } else if (this.clock === this.poopTime) {
      this.poop();
    }
    return this.clock;
  },

  handleUserAction(icon) {
    if (
      ["SLEEP", "FEEDING", "CELEBRATING", "HATCHING"].includes(this.current)
    ) {
      return;
    }

    if (this.current === "INIT" || this.current === "DEAD") {
      this.startGame();
      return;
    }

    switch (icon) {
      case "weather":
        this.changeWeather();
        break;
      case "poop":
        this.cleanUpPoop();
        break;
      case "fish":
        this.feed();
        break;
    }
  },

  startGame() {
    this.current = "HATCHING";
    this.wakeTime = this.clock + 3;
    modFox("egg");
    modScene("day");
    writeModdal("");
  },

  wake() {
    this.current = "IDLING";
    this.wakeTime = -1;
    this.sleepTime = this.clock + DAY_LENGTH;
    this.hungryTime = getNextHungerTime(this.clock);

    this.scene = Math.random() > RAIN_CHANCE ? 0 : 1;
    modScene(SCENES[this.scene]);
    this.determineFoxState();
  },

  changeWeather() {
    this.scene = (this.scene + SCENES.length - 1) % SCENES.length;
    modScene(SCENES[this.scene]);
    this.determineFoxState();
  },

  cleanUpPoop() {
    console.log("Poop Cleaner");
    if (!this.current === "POOPING") return;

    this.dieTime = -1;
    togglePoopBag(true);
    this.startCelebrating();
    this.hungryTime = getNextHungerTime(this.clock);
  },

  feed() {
    if (this.current !== "HUNGRY") return;

    this.current = "FEEDING";
    this.dieTime = -1;
    this.timeToStartCelebrating = this.clock + 2;
    this.poopTime = getNextPoopTime(this.clock);

    modFox("eating");
  },

  sleep() {
    this.current = "SLEEP";
    modFox("sleep");
    modScene("night");
    togglePoopBag(false);
    this.clearTimes();
    this.wakeTime = this.clock + NIGHT_LENGTH;
  },

  clearTimes() {
    this.wakeTime = -1;
    this.dieTime = -1;
    this.hungryTime = -1;
    this.poopTime = -1;
    this.sleepTime = -1;
    this.timeToEndCelebration = -1;
    this.timeToStartCelebrating = -1;
  },

  poop() {
    this.current = "POOPING";
    this.poopTime = -1;
    this.dieTime = getNextDieTime(this.clock);
    modFox("pooping");
  },

  getHungry() {
    this.current = "HUNGRY";
    this.dieTime = getNextDieTime(this.clock);
    this.hungryTime = -1;
    modFox("hungry");
  },

  die() {
    this.current = "DEAD";
    modScene("dead");
    modFox("dead");
    this.clearTimes();
    writeModdal("The Fox is Dead! <br/> Press middle button to restart");
  },

  startCelebrating() {
    this.current = "CELEBRATING";
    modFox("celebrate");
    this.timeToEndCelebration = this.clock + 2;
    this.timeToStratCelebration = -1;
  },

  endCelebrating() {
    this.timeToEndCelebration = -1;
    this.current = "IDLING";
    this.determineFoxState();
    togglePoopBag(false);
  },

  determineFoxState() {
    if (this.current === "IDLING") {
      if (SCENES[this.scene] === "rain") {
        modFox("rain");
      } else {
        modFox("idling");
      }
    }
  },
};

export const handleUserAction = gameState.handleUserAction.bind(gameState);
export default gameState;
