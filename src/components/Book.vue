<template>
<article class="book" :style="style">
    <div class="img-container">
      <img :src="data.cover" alt="封面">
    </div>
    <footer>
      <div class="name">{{data.name}}</div>
    </footer>
    <aside class="public-time">
      <footer>{{data.publicTime}}</footer>
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
      style: {}
    };
  },
  methods: {

    /**
     * 初始化
     */
    init() {
      const topPosition = (this.data.publicTime - this.startTime) * this.scale + 'px';
      
      this.$store.commit('pushBookPositionList', this.data);
      // 获取最后一个
      const length = this.$store.state.bookPositionList.length;
      const columnPosition = this.$store.state.bookPositionList[length - 1];
      this.style = {
        top: topPosition,
        left: columnPosition.columnIndex * (100 + 10) + 'px'
      };
    }
  }
}
</script>

<style lang="less" scoped>
.book {
  position: absolute;
  width: 100px;
  font-size: 14px;
  line-height: 1.5em;

  .img-container {
    height: 120px;
    overflow: hidden;
    img {
      display: block;
      width: 100%;
    }
  }

  footer {
    width: 100%;
    .name {
      background: #383A3F;
      color: white;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      &:hover {
        white-space: normal;
      }
    }
  }

  .public-time {
    visibility: hidden;
    position: absolute;
    z-index: 2;
    right: -5px;
    top: 0;
    height: 100%;
    width: 5px;
    background: #8CD790;
    transition: height 200ms;
    footer {
      position: absolute;
      left: 0px;
      bottom: 0;
      background: #8CD790;
      width: 40px;
      text-align: center;
    }
  }
  &:hover .public-time {
    visibility: visible;
  }
}
</style>
