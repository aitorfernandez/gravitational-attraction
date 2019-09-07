export default (p) => {
  const circles = []

  const margin = 48

  function createCircle() {
    const mass = 2
    const radius = mass * 4

    const pos = p.createVector(p.random(p.width), p.random(p.height))

    const acceleration = p.createVector(0, 0)
    const velocity = p.createVector(0, 0)
    const position = p.createVector(0, 0)

    function applyForce(force) {
      const f = p5.Vector.div(force, mass)
      acceleration.add(f)
    }

    function update() {
      velocity.add(acceleration)
      position.add(velocity)
      acceleration.mult(0)
    }

    function draw() {
      p.fill('white')
      p.circle(pos.x, pos.y, radius)
    }

    return {
      update,
      draw
    }
  }

  function reset() {
    circles.length = 0

    for (let i = 0; i < 100; i +=1) {
      circles.push(createCircle())
    }
  }

  function setup() {
    p.createCanvas(p.windowWidth - margin, p.windowHeight - margin)
    reset()
  }

  function draw() {
    p.background('#111')

    circles.forEach((circle) => {
      circle.update()
      circle.draw()
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
