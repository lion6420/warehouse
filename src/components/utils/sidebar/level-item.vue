<template>
  <div :class="$style.wrapper" :id="'level-item_' + _uid.toString()">
    <div :class="$style.baseBtn" :style="[itemStyle, {color: active?'yellow':'#fff'}]"
      @mouseover="expandNextLevel" @mouseleave="closeNextLevel">
      <span :class="$style.baseBtn_label">{{label}}</span>
      <span :class="$style.baseBtn_expandIcon" class="fas fa-angle-right"></span>
    </div>
    <div :class="$style.expandArea"
      :id="'expandArea_' + _uid.toString()"
      :style="{'margin-left': width.toString() + 'px'}"
       @mouseover="expandNextLevel" @mouseleave="closeNextLevel">
      <slot>
        <div 
          :class="$style.expandBtn"
          v-for="(expandElement, exp_index) in expandList"
          :key="exp_index">{{expandElement}}
        </div>
      </slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'levelItem',
  props: {
    activePath: {
      type: String,
      require: false,
      default() {
        return ''
      }
    },
    label: {
      type: String,
      require: false,
    },
    expandList: {
      type: Array,
      require: false,
      default() {
        return []
      }
    },
    itemStyle: {
      type: Object,
      require: false,
      default() {
        return {}
      }
    },
    expandWidth: {
      type: Number,
      require: false,
      default() {
        return 160
      }
    },
    showSidebar: {
      type: Boolean,
      require: false,
      default() {
        false
      }
    }
  },
  data() {
    return {
      active: false,
      expandAreaHeight: 1,
      expandDepth: 0,
      width: 160,
      height: 50,
    }
  },
  created() {
    if (this.itemStyle.width && typeof(this.itemStyle.width) === 'number') this.width = this.itemStyle.width
    if (this.itemStyle.height && typeof(this.itemStyle.height) === 'number') this.height = this.itemStyle.height
  },
  mounted() {
    var self = this
    this.checkActive()
    this.$nextTick(function init() {
      self.calExpandAreaHeight(self)
    })
  },
  methods: {
    expandNextLevel() {
      const DOM = document.getElementById('expandArea_' + this._uid.toString())
      DOM.style.maxHeight = (this.expandAreaHeight*this.height).toString() + 'px'
      DOM.style.height = (this.expandAreaHeight*this.height).toString() + 'px'
      DOM.style.maxWidth = this.expandDepth.toString() + 'px'
      DOM.style.width = this.expandDepth.toString() + 'px'
    },
    closeNextLevel() {
      const DOM = document.getElementById('expandArea_' + this._uid.toString())
      DOM.style.maxHeight = '0px'
      DOM.style.maxWidth = '0px'
    },

    // Calculate the max breathe & height by bfs
    calExpandAreaHeight(root) {
      var queue = []
      var children
      var len
      var node
      queue.push({
        position: 0,
        DOM: root,
      })
      while(queue.length > 0) {
        len = queue.length
        if (queue[0].DOM.expandWidth) { //only sum the level-item conponents
          this.expandDepth += queue[0].DOM.expandWidth
        }
        for (let i=0; i<len; i++) {
          node = queue[0] //queue.front()
          queue.shift()
          children = node.DOM.$children
          if (node.position + this.expandList.length > this.expandAreaHeight) {
            this.expandAreaHeight = node.position + this.expandList.length
          }
          for (let j=0; j<children.length; j++) {
            queue.push({
              position: (node.position + j),
              DOM: children[j]
            })
          }
        }
      }
    },
    checkActive() {
      if (this.activePath === '') return
      const path = window.location.pathname
      const urlPattern = new RegExp(this.activePath)
      this.active = urlPattern.test(path)
    }
  },
  watch: {
    '$route'() {
      this.checkActive()
    },
    showSidebar() {
      let DOM = document.getElementById('level-item_' + this._uid.toString())
      if (this.showSidebar) {
        DOM.style.maxWidth = '100%'
      }
      else {
        DOM.style.maxWidth = '0px'
      }
    }
  }
}
</script>

<style lang="scss" module>
@import '../common/general.scss';
.wrapper {
  overflow: hidden;
  @include block(100%);
  display: flex;
  color: #fff;
  .baseBtn {
    @include block(170px, 50px);
    background-color: $sidebar-background-color-expand;
    text-align: center;
    font-size: 20px;
    cursor: pointer;
    overflow: hidden;
    .baseBtn_label {
      position: relative;
      top: 10px;
    }
    .baseBtn_expandIcon {
      position: relative;
      left: 15px;
      top: 8px;
      font-size: 15px;
    }
  }
  .baseBtn:hover {
    background-color: $sidebar-background-color-hover;
  }
  .expandArea {
    display: inline-block;
    position: absolute;
    text-align: center;
    font-size: 20px;
    overflow: hidden;
    max-height: 0px;
    max-width: 0px;
    transition: max-height 0.2s linear, max-width 0.1s linear;
    z-index: 3;
    .expandBtn {
      @include block(170px, 50px);
      text-align: center;
      font-size: 20px;
      cursor: pointer;
    }
  }
}

</style>