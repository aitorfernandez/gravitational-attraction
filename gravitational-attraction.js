export default (p) => {
  const margin = 48
  const triangles = []

  function createTriangle() {
    const initialVertex = p.round(p.random(60, 80))
    const vertex = {
      v1: initialVertex, v2: initialVertex, v3: initialVertex
    }

    const module = p.round(p.random(5, 12))
    let activeVertex = rndVertex()

    const dir = p.random() < 0.5
    let up = p.random() < 0.5

    let angle = p.random(p.TWO_PI)
    let scale = 0.0

    const amplitude = p.round(p.random(20, 80))
    const vel = p.random(0.02, 0.06)

    const distance = p.random(75, 150)
    const padding = 12

    function rndVertex() {
      return `v${p.round(p.random(2)) + 1}`
    }

    function update() {
      angle += vel
      scale = p.cos(angle) * 0.5

      if (p.frameCount % module === 0) {
        activeVertex = rndVertex()
      }

      if (
        vertex[activeVertex] > initialVertex + amplitude
        || vertex[activeVertex] < initialVertex - amplitude
      ) {
        up = !up
      }

      const motion = p.abs(p.cos(angle * 2) * p.sin(angle * 4))
      if (up) {
        vertex[activeVertex] += motion
      } else {
        vertex[activeVertex] -= motion
      }
    }

    function draw() {
      p.push()
      p.rotate(dir ? angle : angle * -1)
      p.translate(distance, 0)

      p.push()
      p.rotate(angle)
      p.scale(scale)

      p.ellipse(-(vertex.v1), vertex.v1, padding, padding)
      p.ellipse(0, -(vertex.v2), padding, padding)
      p.ellipse(vertex.v3, vertex.v3, padding, padding)

      p.triangle(-(vertex.v1) + padding, vertex.v1, 0, -(vertex.v2) + padding, vertex.v3 - padding, vertex.v3)
      p.pop()
      p.pop()
    }

    return {
      update,
      draw
    }
  }

  function reset() {
    triangles.length = 0

    for (let i = 0, len = 12; i < len; i += 1) {
      triangles.push(createTriangle())
    }
  }

  function setup() {
    p.createCanvas(p.windowWidth - margin, p.windowHeight - margin)
    p.frameRate(24)

    p.ellipseMode(p.CENTER)

    reset()
  }

  function draw() {
    p.background('#111')

    p.noStroke()
    p.fill(255, 100)

    p.push()
    p.translate(p.width / 2, p.height / 2)

    p.ellipse(0, 0, 100, 100)

    triangles.forEach((triangle) => {
      triangle.update()
      triangle.draw()
    })
    p.pop()
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
