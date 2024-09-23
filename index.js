const container = document.querySelector('.container')
const svg = document.querySelector('.svg')
const circleLoader = document.querySelector('.circle_loader')
const inputText = document.querySelector('.input-text')
const hiddenSwitch = document.querySelector('.hidden-switch')
const animateSwitch = document.querySelector('.animate-switch')

let timerId = 0

const animationTime = 1000
const circleLength = 2 * Math.PI * circleLoader.r.baseVal.value;

circleLoader.style.strokeDasharray = circleLength;
circleLoader.style.strokeDashoffset = circleLength;

// =============== helpers ================

const addClassName = (element, className) => element.classList.add(className)
const removeClassName = (element, className) => element.classList.remove(className)

function setDashoffset(percent) {
  const partLength = percent * circleLength / 100; // comment: переводим проценты в длину 
  circleLoader.style.strokeDashoffset = circleLength - partLength;
}

function validateValue(value) {
  let result = Number(value)

  if (value < 0) result = 0
  if (value > 100) result = 100

  if (result !== value) {
    inputText.value = result
  }

  return result
}

function animate() {
  addClassName(container, 'animate')

  setTimeout(() => {
    removeClassName(container, 'animate')
  }, animationTime)
}

function startAnimationLoop() {
  animate()

  timerId = setInterval(() => {
    animate()
  }, animationTime * 2)
}

function stopAnimationLoop() {
  clearInterval(timerId)
  removeClassName(container, 'animate')
}

// =============== handlers ================

function inputHandler(event) {
  setDashoffset(validateValue(event.target.value))
}

function animationHandler(event) {
  event.target.checked ? startAnimationLoop() : stopAnimationLoop()
}

function displayHandler(event) {
  event.target.checked ? addClassName(svg, 'hidden') : removeClassName(svg, 'hidden')
}

// =============== events ================

inputText.addEventListener('change', inputHandler)
hiddenSwitch.addEventListener('change', displayHandler)
animateSwitch.addEventListener('change', animationHandler)