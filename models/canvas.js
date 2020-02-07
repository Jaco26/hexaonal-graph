export default class Canvas {
  constructor(render = () => null) {
    this.canvas = document.querySelector('canvas')
    this.ctx = this.canvas.getContext('2d')

    this.defaults = {
      fillStyle: '#ddd',
      strokeStyle: '#333',
      font: '16px Arial'
    }

    this._render = () => {
      this._fillSelf()
      this._draw({ fillStyle: 'red' }, () => {
        this.ctx.fillText('Hi', 35, 35)
      })
      render.call(this)
    }
  }

  resize(width, height) {
    this.canvas.width = width;
    this.canvas.height = height
    this._render()
  }

  get width() { return this.canvas.width }
  get height() { return this.canvas.height }

  _fillSelf() {
    this._draw({}, () => {
      this.ctx.fillRect(0, 0, this.width, this.height)
    })
  }

  _draw(options, callback) {
    this.ctx.beginPath()
    this.ctx.fillStyle = options.fillStyle || this.defaults.fillStyle
    this.ctx.strokeStyle = options.strokeStyle || this.defaults.strokeStyle
    this.ctx.font = options.font || this.defaults.font
    callback()
    this.ctx.closePath()
  }

  arc({ x, y, r, fillStyle, strokeStyle }) {
    this._draw({ fillStyle, strokeStyle }, () => {
      this.ctx.arc(x, y, r, 0, Math.PI * 2)
      this.ctx.stroke()
    })
  }

  rect({ x, y, width, height, fillStyle, strokeStyle }) {
    this._draw({ fillStyle, strokeStyle}, () => {
      this.ctx.strokeRect(x, y, width, height)
    })
  }

  text({ x, y, font, fillStyle, text }) {
    this._draw({ font, fillStyle }, () => {
      this.ctx.fillText(text, x, y)
    })
  }
}