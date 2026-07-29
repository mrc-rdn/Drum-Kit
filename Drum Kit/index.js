// =========================
// PRELOAD SOUNDS
// =========================
const sounds = {
  w: new Audio("sounds/tom-1.mp3"),
  a: new Audio("sounds/tom-2.mp3"),
  s: new Audio("sounds/tom-3.mp3"),
  d: new Audio("sounds/tom-4.mp3"),
  j: new Audio("sounds/snare.mp3"),
  k: new Audio("sounds/crash.mp3"),
  l: new Audio("sounds/kick-bass.mp3"),
};

// Preload all sounds
Object.values(sounds).forEach(sound => {
  sound.preload = "auto";
});

// =========================
// UNLOCK AUDIO ON MOBILE
// =========================
let initialized = false;

function unlockAudio() {
  if (initialized) return;

  initialized = true;

  Object.values(sounds).forEach(sound => {
    sound.volume = 0;
    sound.play().then(() => {
      sound.pause();
      sound.currentTime = 0;
      sound.volume = 1;
    }).catch(() => {});
  });
}

document.addEventListener("touchstart", unlockAudio, { once: true });
document.addEventListener("click", unlockAudio, { once: true });

// =========================
// BUTTON EVENTS
// =========================
const drums = document.querySelectorAll(".drum");

drums.forEach(button => {

  // Desktop
  button.addEventListener("click", function () {

    const key = this.innerHTML.trim();

    makeSound(key);
    buttonAnimation(key);

  });

  // Mobile (faster than click)
  button.addEventListener("touchstart", function (e) {

    e.preventDefault();

    const key = this.innerHTML.trim();

    makeSound(key);
    buttonAnimation(key);

  }, { passive: false });

});

// =========================
// KEYBOARD EVENTS
// =========================
document.addEventListener("keydown", function (event) {

  makeSound(event.key.toLowerCase());
  buttonAnimation(event.key.toLowerCase());

});

// =========================
// PLAY SOUND
// =========================
function makeSound(key) {

  const sound = sounds[key];

  if (!sound) return;

  sound.currentTime = 0;

  sound.play().catch(err => {
    console.log(err);
  });

}

// =========================
// BUTTON ANIMATION
// =========================
function buttonAnimation(currentKey) {

  const activeButton = document.querySelector("." + currentKey);

  if (!activeButton) return;

  activeButton.classList.add("pressed");

  setTimeout(() => {
    activeButton.classList.remove("pressed");
  }, 100);

}