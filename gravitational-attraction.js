export default (p) => {
  function reset() {
  }

  function setup() {
  }

  function draw() {
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
