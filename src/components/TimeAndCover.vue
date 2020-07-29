<template>
<article class="technology" :style="data.positionData.positionStyle">
    <div class="img-container" :style="data.positionData.imgContainerStyle">
      <img :src="data.cover" alt="封面">
    </div>
    <footer>
      <div class="name">{{data.name}}</div>
    </footer>
    <aside class="time">
      <header>时间: {{data.time}}</header>
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
    return {}
  },
  methods: {

    /**
     * 初始化
     */
    init() {}
  }
}
</script>

<style lang="less" scoped>
.technology {
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
      text-align: center;
      &:hover {
        white-space: normal;
      }
    }
  }

  .time {
    visibility: hidden;
    position: absolute;
    z-index: 2;
    left: 0;
    top: 0px;
    width: 100%;
    background: #8CD790;
    transition: height 200ms;
    header {
      background: #8CD790;
      text-align: center;
    }
  }
  &:hover .time {
    visibility: visible;
  }
}
</style>
