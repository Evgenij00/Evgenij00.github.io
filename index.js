// comment: динамические параметры
let timerIds = []
let inputValue = ''

// comment: Длина окружности по формуле: 2 * P * R
const circleLength = 2 * Math.PI * circle.r.baseVal.value; 

// comment: задаем начльные значения для circle
circle.style.strokeDasharray = circleLength;
circle.style.strokeDashoffset = circleLength

// ==================== helpers =======================

function setProgressBarValue(value) {
  const partLength = value * circleLength / 100
  circle.style.strokeDashoffset = circleLength - partLength
}

function clearAllIntervals() {
  timerIds.forEach(id => clearInterval(id))
  timerIds.length = 0
}

function hideBlock() {
  svg.style.display = 'none'
}

function showBlock() {
  svg.style.display = 'block'
}

function getAnimationValue() {
  return animate.checked
}

function startAnimation() {
  draw(0, inputValue)
}

function stopAnimation() {
  clearAllIntervals()
}

function restartAnimationWithDelay(delay = 1000) {
  setTimeout(() => {
    startAnimation()
  }, delay)
}

function isAnimationComplete(currentValue) {
  return currentValue === inputValue
}

function draw(minValue = 0) {
  let currentValue = minValue;

  id = setInterval(function() {
    setProgressBarValue(currentValue)

    if (isAnimationComplete(currentValue, inputValue)) {
      stopAnimation()
      restartAnimationWithDelay()
    }

    currentValue++;
  }, 24);

  timerIds.push(id)
}

// ==================== events + handlers =======================

text.addEventListener('input', inputHandler)
hidden.addEventListener('change', displayHandler)
animate.addEventListener('change', animationHandler)

function inputHandler(event) {
  inputValue = Number(event.target.value)
  if (inputValue) {
    setProgressBarValue(inputValue)
  } else {
    setProgressBarValue(0)
  }
}

function animationHandler(event) {
  if (event.target.checked) {
    startAnimation()
  } else {
    stopAnimation()
  }
}

function displayHandler(event) {
  if (event.target.checked) {
    if (getAnimationValue()) {
      stopAnimation()
    }
    hideBlock()
  } else {
    showBlock()
    if (getAnimationValue()) {
      startAnimation()
    }
  }
}