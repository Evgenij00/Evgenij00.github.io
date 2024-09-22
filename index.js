const circleLength = 2 * Math.PI * circle.r.baseVal.value;

let inputValue = 0

circle.style.strokeDasharray = circleLength;

animate.addEventListener('change', (event) => {
  console.log(event.target.checked)
})

text.addEventListener('keypress', (event) => {
  if (event.key === 'Enter') {
      cancelAnimationFrame(requestAnimationFrameId)
      svg.style.display = 'none'
      inputValue = event.target.value
      svg.style.display = 'block'
      draw(0, inputValue, true)
  }
})

hidden.addEventListener('change', (event) => {
  console.log(event.target.checked)
  if (event.target.checked) {
    cancelAnimationFrame(requestAnimationFrameId)
    svg.style.display = 'none'
  } else {
    svg.style.display = 'block'
    draw(0, 100)
  }
})

function setProgress(percent = 50) {
  const partLength = percent * circleLength / 100
  circle.style.strokeDashoffset = circleLength - partLength
}


let requestAnimationFrameId = null

function draw(percent = 0, max = 50, withAnimate = false) {
    if (max > 100) {
      max = 100
    }
  
    if (percent >= max) {
      
      if (withAnimate) {
        return setTimeout(() => {
          percent = 0
          return draw(0, inputValue, true)
        }, 1000)
      }
      setProgress(percent)
      return
    }
  
    requestAnimationFrameId = requestAnimationFrame(() => draw(percent + 1, max))
    setProgress(percent)
}

draw(0, 100)