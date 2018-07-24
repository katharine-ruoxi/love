import React, { Component } from 'react'
import moment from 'moment-timezone'

var Canvas = {
  name: '',
  year: 2000,
  month: 1,
  date: 1,
  heartHeight: 60,
  heartWidth: 64,
  hearts: [],
  redHeart: null,
  heartImage: `${process.env.PUBLIC_URL}/heart.png`,
  redHeartImage: `${process.env.PUBLIC_URL}/redheart.png`,
  numHearts: 8, // number of hearts shown on canvas
  minScale: 0.25,
  minHearts: 6, // min number of hearts
  maxHearts: 25, // max number of hearts
  pixelsPerHeart: 35000, // control the density of hearts
  alpha: 0,
  alphaIncrease: 3, // control text fade in speed
  fontSize: 30,
  fpsLimit: 30, // frame rate limit
  then: Date.now(),
  beatsPerSecond: 1, // red heartbeats per second
  beatMinScale: 0.8,
  beatMaxScale: 1.1,
  ellipsisOffset: 0, // to make sure one dot of the ellipsis is shown at first
  textsShown: false, // if all texts on the canvas are visible
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
    this.numHearts = Math.min(
      Math.max(
        Math.round((this.w * this.h) / this.pixelsPerHeart),
        this.minHearts
      ),
      this.maxHearts
    )
    this.fontSize = Math.min(Math.floor(this.h / 10), 30)
    this.ctx.clearRect(0, 0, this.w, this.h)
    for (var i = 0; i < this.numHearts; i++) {
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
    var beatTime = Math.floor(500 / this.beatsPerSecond)
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
      moment().diff(
        moment.tz(
          `${this.year}-${this.month
            .toString()
            .padStart(2, '0')}-${this.date.toString().padStart(2, '0')} 00:00`,
          'America/New_York'
        )
      )
    )
    this.ctx.textAlign = 'start'
    this.ctx.font = `800 ${this.fontSize}px "Exo 2", sans-serif`
    this.setStyle(1)
    this.fillText(`${this.name.toUpperCase()},`, 0, -this.fontSize * 4)
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
      this.counts(duration.hours(), 'HOUR', false),
      this.ctx.measureText(`${duration.hours()} `).width,
      this.fontSize,
      this.counts(duration.hours(), 'HOUR')
    )
    this.setNumberStyle(5)
    this.fillText(
      `${duration.hours()}`,
      0,
      this.fontSize,
      this.counts(duration.hours(), 'HOUR')
    )
    this.setStyle(6)
    this.fillText(
      this.counts(duration.minutes(), 'MINUTE', false),
      this.ctx.measureText(`${duration.minutes()} `).width,
      this.fontSize * 2,
      this.counts(duration.minutes(), 'MINUTE')
    )
    this.setNumberStyle(6)
    this.fillText(
      `${duration.minutes()}`,
      0,
      this.fontSize * 2,
      this.counts(duration.minutes(), 'MINUTE')
    )
    this.setStyle(7)
    this.fillText(
      this.counts(duration.seconds(), 'SECOND', false),
      this.ctx.measureText(`${duration.seconds()} `).width,
      this.fontSize * 3,
      this.counts(duration.seconds(), 'SECOND')
    )
    this.setNumberStyle(7)
    this.fillText(
      `${duration.seconds()}`,
      0,
      this.fontSize * 3,
      this.counts(duration.seconds(), 'SECOND')
    )
    this.ctx.fillStyle = 'white'
    // ellipsis animation
    if (this.textsShown) {
      this.fillText(
        Array(((duration.seconds() - this.ellipsisOffset) % 6) + 1)
          .fill('·')
          .join(''),
        0,
        this.fontSize * 4,
        '······'
      )
    } else {
      // check if all texts are shown on the canvas
      var alpha = this.getAlpha(7)
      if (alpha === 1 && duration.milliseconds() < 100) {
        this.textsShown = true
        // make sure only one dot is shown at first
        this.ellipsisOffset = (duration.seconds() % 6) - 6
      }
    }
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
    var alpha = this.getAlpha(idx)
    this.ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`
  },
  setNumberStyle: function(idx) {
    var alpha = this.getAlpha(idx)
    this.ctx.fillStyle = `rgba(0, 0, 0, ${alpha})`
  },
  getAlpha: function(idx) {
    return Math.max(Math.min(this.alpha / 100 - idx, 1), 0)
  },
  counts: function(value, unit, returnValue = true) {
    if (returnValue)
      return value === 1 ? `${value} ${unit}` : `${value} ${unit}S`
    else return value === 1 ? unit : `${unit}S`
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
  initialize: function(name, year, month, date) {
    this.canvas = document.getElementById('canvas')

    if (!this.canvas.getContext) return

    this.name = name
    this.year = parseInt(year, 10)
    this.month = parseInt(month, 10)
    this.date = parseInt(date, 10)

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
        opacity: Math.random() * (1 - this.minScale) + this.minScale,
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
class LoveCanvas extends Component {
  componentDidMount() {
    const {
      match: {
        params: { name, year, month, date }
      }
    } = this.props
    Canvas.initialize(name, year, month, date)
  }

  render() {
    return (
      <div className="App">
        <canvas className="canvas" id="canvas" />
      </div>
    )
  }
}

export default LoveCanvas
