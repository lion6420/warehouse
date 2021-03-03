<template>
  <div :class="$style.wrapper">
    <canvas width="200" height="200" :class="$style.draw" :id="'indicationLine_' + _uid.toString()"></canvas>
  </div>
</template>

<script>
export default {
  props: {
    startPointX: {
      type: Number,
      require: true,
    },
    startPointY: {
      type: Number,
      require: true,
    },
    endPointX: {
      type: Number,
      require: true,
    },
    endPointY: {
      type: Number,
      require: true,
    },
    signal: {
      type: Boolean,
      require: false,
      default() {
        return false
      }
    }
  },
  data() {
    return {
      frames: 60,
      ctx: null,
    }
  },

  methods: {
    draw() {
      var self = this
      //init
      var c = document.getElementById('indicationLine_' + this._uid.toString())
      this.ctx = c.getContext('2d')
      this.ctx.beginPath()
      this.ctx.moveTo(this.startPointX, this.startPointY)
      var count = 0
      const position_set = this.createPositionSet()
      window.requestAnimationFrame(animation)

      //animation
      function animation() {
        count++
        if (count < self.frames) {
          self.ctx.lineTo(position_set.x[count], position_set.y[count])
          self.ctx.strokeStyle = '#fff'
          self.ctx.stroke()
          window.requestAnimationFrame(animation)
        }
      }
    },
    createPositionSet() {
      var x_interval = parseFloat(((this.endPointX - this.startPointX) / this.frames).toFixed(2))
      var y_interval = parseFloat(((this.endPointY - this.startPointY) / this.frames).toFixed(2))
      var x_set = new Array(this.frames)
      var y_set = new Array(this.frames)

      x_set[0] = this.startPointX
      x_set[this.frames-1] = this.endPointX
      y_set[0] = this.startPointY
      y_set[this.frames-1] = this.endPointY

      for (let i=1; i<this.frames-1; i++) {
        x_set[i] = x_set[i-1] + x_interval
        y_set[i] = y_set[i-1] + y_interval
      }
      return {x:x_set, y:y_set}
    }
  },
  watch: {
    signal() {
      if (this.signal) this.draw()
      else {
        this.ctx.clearRect(0, 0, 200, 200)
      }
    }
  }
}
</script>

<style lang="scss" module>
@import '@/style/general.module.scss';
.wrapper {
  @include block(100%);
  .draw {
    margin-left: 200px;
    position: absolute;
  }
}
</style>