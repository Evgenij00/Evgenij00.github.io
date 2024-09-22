const circleLength = 2 * Math.PI * circle.r.baseVal.value;

let inputValue = 100

circle.style.strokeDasharray = circleLength;

text.addEventListener('keypress', (event) => {
  if (event.key === 'Enter') {
      cancelAnimationFrame(requestAnimationFrameId)
      inputValue = event.target.value
      draw(0, inputValue)
  }
})

hidden.addEventListener('change', (event) => {
  if (event.target.checked) {
    cancelAnimationFrame(requestAnimationFrameId)
    svg.style.display = 'none'
  } else {
    svg.style.display = 'block'
    draw(0, inputValue)
  }
})

function setProgress(percent = 50) {
  const partLength = percent * circleLength / 100
  circle.style.strokeDashoffset = circleLength - partLength
}


let requestAnimationFrameId = null

function draw(percent, max) {
    if (max > 100) {
      max = 100
    }
  
    if (percent >= max) {
      setProgress(percent)
      cancelAnimationFrame(requestAnimationFrameId)
      return setTimeout(() => {
          draw(0, inputValue)
        }, 1000)
    }
  
    requestAnimationFrameId = requestAnimationFrame(() => draw(percent + 1, inputValue))
    setProgress(percent)
}

draw(0, inputValue)