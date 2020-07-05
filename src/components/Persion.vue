<template>
  <article class="persion" :style="style">
    <div class="img-container">
      <img :src="data.portrait" alt="头像">
    </div>
    <footer>
      <div class="name">{{data.name}}</div>
      <div class="born">
        {{data.bornIn}}
        <span>{{data.diedIn}}</span>
      </div>
    </footer>
  </article>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      default: null
    },
    // 开始时间年份，用户确定人物在时间方向上的位置
    startTime: {
      tyle: Number,
      default: -1600
    },
    // 缩放比例
    scale: {
      type: Number,
      default: 10
    },
  },
  data() {
    return {
      style: {}
    };
  },
  mounted() {
    this.init();
  },
  watch: {
    scale(value) {
      this.init();
    }
  },
  methods: {

    init() {
      const positionTop = (this.data.bornIn - this.startTime) * this.scale + 'px';
      this.style = {
        top: positionTop 
      };
    }
  }
}
</script>

<style lang="less" scoped>
.persion {
  position: absolute;
  .img-container {
    width: 100px;
    height: 130px;
    overflow: hidden;
    img {
      display: block;
      width: 100%;
    }
  }
  .born {
    text-align: left;
    span {
      float: right;
    }
  }
}

</style>
