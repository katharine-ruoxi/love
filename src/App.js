import React, { Component } from 'react'
import './App.css'
import $ from 'jquery'
import moment from 'moment-timezone'

var Canvas = {
  heartHeight: 60,
  heartWidth: 64,
  hearts: [],
  redHeart: null,
  heartImage: `${process.env.PUBLIC_URL}/heart.png`,
  redHeartImage: `${process.env.PUBLIC_URL}/redheart.png`,
  maxHearts: 8,
  minScale: 0.4,
  alpha: 0,
  alphaIncrease: 3,
  fontSize: 30,
  fpsLimit: 30,
  then: Date.now(),
  bps: 1, // heart beats per second
  beatMinScale: 0.8,
  beatMaxScale: 1.1,
  update: function() {
    var now = Date.now()
    var elapsed = now - this.then
    // limit animation frame rate
    if (elapsed > 1000 / this.fpsLimit) {
      this.then = now - (elapsed % this.fpsLimit)
      this.draw()
    }
    requestAnimationFrame(this.update.bind(this))
  },
  draw: function() {
    this.setCanvasSize()
    this.fontSize = Math.min(Math.floor(this.h / 10), 30)
    this.ctx.clearRect(0, 0, this.w, this.h)
    for (var i = 0; i < this.hearts.length; i++) {
      var heart = this.hearts[i]
      heart.image.style.height = heart.height
      this.ctx.globalAlpha = heart.opacity
      this.ctx.drawImage(
        heart.image,
        heart.x,
        heart.y,
        heart.width,
        heart.height
      )
    }
    this.drawRedHeart()
    this.drawText()
    this.move()
  },
  drawRedHeart: function() {
    var ms = moment().milliseconds()
    var beatTime = Math.floor(500 / this.bps)
    var scale =
      Math.floor(ms / beatTime) % 2
        ? this.beatMinScale +
          ((ms % beatTime) / beatTime) * (this.beatMaxScale - this.beatMinScale)
        : this.beatMinScale +
          (1 - (ms % beatTime) / beatTime) *
            (this.beatMaxScale - this.beatMinScale)
    this.ctx.globalAlpha = 1.0
    this.redHeart.width = this.fontSize
    this.redHeart.height = this.fontSize
    this.ctx.drawImage(
      this.redHeart,
      (this.w - this.redHeart.width * scale) / 2,
      (this.h - this.redHeart.height * scale) / 2 -
        this.redHeart.height * 0.4 -
        this.fontSize * 2,
      this.redHeart.width * scale,
      this.redHeart.height * scale
    )
  },
  drawText: function() {
    this.ctx.globalAlpha = 1.0
    this.alpha += this.alphaIncrease
    var duration = moment.duration(
      moment().diff(moment.tz('2014-06-13 00:00', 'America/New_York'))
    )
    this.ctx.textAlign = 'start'
    this.ctx.font = `bold ${this.fontSize}px sans-serif`
    this.setStyle(1)
    this.fillText('KATHARINE,', 0, -this.fontSize * 4)
    this.setStyle(2)
    this.fillText("I'VE FALLEN IN", 0, -this.fontSize * 3)
    this.setStyle(3)
    this.fillText('WITH YOU FOR', 0, -this.fontSize)
    this.setStyle(4)
    this.fillText(
      'DAYS',
      this.ctx.measureText(`${Math.floor(duration.asDays())} `).width,
      0,
      `${Math.floor(duration.asDays())} DAYS`
    )
    this.setNumberStyle(4)
    this.fillText(
      `${Math.floor(duration.asDays())}`,
      0,
      0,
      `${Math.floor(duration.asDays())} DAYS`
    )
    this.setStyle(5)
    this.fillText(
      'HOURS',
      this.ctx.measureText(`${duration.hours()} `).width,
      this.fontSize,
      `${duration.hours()} HOURS`
    )
    this.setNumberStyle(5)
    this.fillText(
      `${duration.hours()}`,
      0,
      this.fontSize,
      `${duration.hours()} HOURS`
    )
    this.setStyle(6)
    this.fillText(
      'MINUTES',
      this.ctx.measureText(`${duration.minutes()} `).width,
      this.fontSize * 2,
      `${duration.minutes()} MINUTES`
    )
    this.setNumberStyle(6)
    this.fillText(
      `${duration.minutes()}`,
      0,
      this.fontSize * 2,
      `${duration.minutes()} MINUTES`
    )
    this.setStyle(7)
    this.fillText(
      'SECONDS',
      this.ctx.measureText(`${duration.seconds()} `).width,
      this.fontSize * 3,
      `${duration.seconds()} SECONDS`
    )
    this.setNumberStyle(7)
    this.fillText(
      `${duration.seconds()}`,
      0,
      this.fontSize * 3,
      `${duration.seconds()} SECONDS`
    )
    this.setStyle(8)
    this.fillText('......', 0, this.fontSize * 4)
  },
  fillText: function(text, offsetWidth, offsetHeight, fullText) {
    this.ctx.fillText(
      text,
      (this.w -
        this.ctx.measureText(fullText !== undefined ? fullText : text).width) /
        2 +
        offsetWidth,
      this.h / 2 + offsetHeight
    )
  },
  setStyle: function(idx) {
    var alpha = Math.max(Math.min(this.alpha / 100 - idx, 1), 0)
    this.ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`
  },
  setNumberStyle: function(idx) {
    var alpha = Math.max(Math.min(this.alpha / 100 - idx, 1), 0)
    this.ctx.fillStyle = `rgba(0, 0, 0, ${alpha})`
  },
  move: function() {
    for (var b = 0; b < this.hearts.length; b++) {
      var heart = this.hearts[b]
      heart.y += heart.ys
      if (heart.y > this.h) {
        heart.x = Math.random() * this.w
        heart.y = -1 * this.heartHeight
      }
    }
  },
  setCanvasSize: function() {
    this.canvas.width = window.innerWidth
    this.canvas.height = window.innerHeight
    this.w = this.canvas.width
    this.h = this.canvas.height
  },
  initialize: function() {
    this.canvas = $('#canvas')[0]

    if (!this.canvas.getContext) return

    this.setCanvasSize()
    this.ctx = this.canvas.getContext('2d')

    for (var a = 0; a < this.maxHearts; a++) {
      var scale = Math.random() * (1 - this.minScale) + this.minScale
      this.hearts.push({
        x: Math.random() * this.w,
        y: Math.random() * this.h,
        ys: Math.random() + 1,
        height: scale * this.heartHeight,
        width: scale * this.heartWidth,
        opacity: scale,
        image: new Image()
      })
      this.hearts[a].image.src = this.heartImage
    }

    this.redHeart = new Image()
    this.redHeart.src = this.redHeartImage
    this.redHeart.width = this.fontSize
    this.redHeart.height = this.fontSize

    requestAnimationFrame(this.update.bind(this))
  }
}

// inspired by https://codepen.io/bferioli/pen/qEGaPp
class App extends Component {
  componentDidMount() {
    Canvas.initialize()
  }

  render() {
    return (
      <div className="App">
        <canvas className="canvas" id="canvas" />
      </div>
    )
  }
}

export default App
