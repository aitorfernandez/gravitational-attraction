export default (p) => {
  const margin = 48

  const bodies = []

  function createBody() {
    const radius = p.random(5, 15)
    const distance = p.random(75, 200)
    const speed = p.random(0.1, 0.15)

    let angle = p.random(p.TWO_PI)

    function update() {
      angle += speed
    }

    function draw() {
      p.rotate(angle)
      p.translate(distance, 0)
      p.ellipse(0, 0, radius * 2, radius * 2)
    }

    return {
      update,
      draw
    }
  }

  function reset() {
    bodies.length = 0

    for (let i = 0; i < 2; i += 1) {
      bodies.push(createBody())
    }
  }

  function setup() {
    p.createCanvas(p.windowWidth - margin, p.windowHeight - margin)
    p.frameRate(24)
    reset()
  }

  function draw() {
    p.background('#111')

    p.fill(255, 100)

    p.translate(p.width / 2, p.height / 2)

    p.ellipse(0, 0, 100, 100)

    bodies.forEach((body) => {
      p.push()
      body.update()
      body.draw()
      p.pop()
    })
  }

  p.play = function() {
    p.loop()
  }
  p.stop = function() {
    p.noLoop()
  }

  p.reset = reset

  p.setup = setup
  p.draw = draw
}
