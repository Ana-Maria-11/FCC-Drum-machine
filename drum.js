// Define an object to hold the audio clips and their corresponding keys
const audioClips = {
    Q: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3",
    W: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3",
    E: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3",
    A: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3",
    S: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3",
    D: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3",
    Z: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3",
    X: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3",
    C: "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3",
  };
  
  // get references to HTML elements
  const powerSwitch = document.getElementById("power-switch");
  const display = document.getElementById("display");
  const drumPads = document.querySelectorAll(".drum-pad");
  const volumeRange = document.getElementById("volume-range");
  
  // initialize state
  let isPowerOn = true;
  let currentVolume = 0.5;
  
  // define event listeners
  powerSwitch.addEventListener("change", () => {
    isPowerOn = powerSwitch.checked;
    updateDisplay();
  });
  
  volumeRange.addEventListener("input", () => {
    currentVolume = parseFloat(volumeRange.value);
    updateDisplay();
  });
  
// Listen for keyboard events
document.addEventListener("keydown", (event) => {
  const key = event.key.toUpperCase();
  if (audioClips.hasOwnProperty(key) && isPowerOn) {
    const audio = document.getElementById(key);
    audio.currentTime = 0;
    audio.volume = currentVolume;
    audio.play();
    updateDisplay(key);
  }
});
  drumPads.forEach((pad) => {
    pad.addEventListener("click", () => {
      if (isPowerOn) {
        const audio = pad.querySelector("audio");
        audio.currentTime = 0;
        audio.volume = currentVolume;
        audio.play();
        updateDisplay(pad.id);
      }
    });
  });
  
  // define helper function to update display
  function updateDisplay(message = "") {
    if (isPowerOn) {
      if (message !== "") {
        display.innerText = message;
      } else {
        display.innerText = "Ready";
      }
      display.style.color = "#fff";
    } else {
      display.innerText = "Off";
      display.style.color = "#f00";
    }
  }
 