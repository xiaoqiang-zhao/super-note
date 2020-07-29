<template>
  <article class="persion" :style="data.positionData.positionStyle" @click="lifeTime">
    <div class="img-container">
      <img :src="data.portrait" alt="头像">
    </div>
    <footer>
      <div class="name">{{data.name}}</div>
    </footer>
    <aside class="life-line" :style="lifeTimeStyle">
      <header>{{data.bornIn}}</header>
      <footer>{{data.diedIn}}</footer>
    </aside>
  </article>
</template>

<script>
import Base from './Base'

export default {
  mixins: [Base],
  props: {
    data: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      name: 'persion',
      style: {},
      lifeTimeStyle: null
    }
  },
  methods: {

    /**
     * 初始化
     */
    init() {
    },

    /**
     * lifeTime 展示切换和计算
     */
    lifeTime() {
      if (this.lifeTimeStyle) {
        this.lifeTimeStyle = null
      }
      else {
        this.lifeTimeStyle = {
          height: (this.data.diedIn - this.data.bornIn) * this.$store.state.scale + 'px',
          visibility: 'visible'
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
.persion {
  position: absolute;
  font-size: 14px;
  line-height: 1.5em;

  .img-container {
    width: 100px;
    height: 120px;
    overflow: hidden;
    img {
      display: block;
      width: 100%;
    }
  }

  footer {
    .name {
      background: #383A3F;
      color: white;
      text-align: center;
    }
  }

  .life-line {
    visibility: hidden;
    position: absolute;
    z-index: 2;
    right: -5px;
    top: 0;
    height: 100%;
    width: 5px;
    background: #8CD790;
    transition: height 200ms;
    header,
    footer {
      position: absolute;
      left: 0px;
      background: #8CD790;
      width: 40px;
      text-align: center;
    }
    header {
      top: 0;
    }
    footer {
      bottom: 0;
    }
  }
  &:hover .life-line {
    visibility: visible;
  }
}

</style>
