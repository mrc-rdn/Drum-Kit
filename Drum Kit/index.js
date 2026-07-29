// =========================
// WEB AUDIO API DRUM KIT
// =========================

const audioContext = new (window.AudioContext || window.webkitAudioContext)();

const soundFiles = {
  w: "sounds/tom-1.mp3",
  a: "sounds/tom-2.mp3",
  s: "sounds/tom-3.mp3",
  d: "sounds/tom-4.mp3",
  j: "sounds/snare.mp3",
  k: "sounds/crash.mp3",
  l: "sounds/kick-bass.mp3",
};

const soundBuffers = {};

// Load all sounds into memory
async function loadSounds() {

  for (const key in soundFiles) {

    const response = await fetch(soundFiles[key]);

    const arrayBuffer = await response.arrayBuffer();

    soundBuffers[key] = await audioContext.decodeAudioData(arrayBuffer);

  }

}

loadSounds();

// Unlock AudioContext on first touch
document.addEventListener("touchstart", () => {
  if (audioContext.state === "suspended") {
    audioContext.resume();
  }
}, { once: true });

document.addEventListener("click", () => {
  if (audioContext.state === "suspended") {
    audioContext.resume();
  }
}, { once: true });

// Play Sound
function makeSound(key) {

  const buffer = soundBuffers[key];

  if (!buffer) return;

  const source = audioContext.createBufferSource();

  source.buffer = buffer;

  source.connect(audioContext.destination);

  source.start(0);

}

// Animation
function buttonAnimation(currentKey) {

  const activeButton = document.querySelector("." + currentKey);

  if (!activeButton) return;

  activeButton.classList.add("pressed");

  setTimeout(() => {

    activeButton.classList.remove("pressed");

  }, 100);

}

// Mouse
document.querySelectorAll(".drum").forEach(button => {

  button.addEventListener("click", function () {

    const key = this.innerHTML.trim().toLowerCase();

    makeSound(key);

    buttonAnimation(key);

  });

});

// Keyboard
document.addEventListener("keydown", function (event) {

  const key = event.key.toLowerCase();

  makeSound(key);

  buttonAnimation(key);

});