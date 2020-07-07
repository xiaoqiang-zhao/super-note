<template>
  <section class="dynasty">
    <div
      class="item"
      v-for="item in dynastyData.list"
      :key="item.name"
      :style="item.style">
      {{item.name}}
    </div>
  </section>
</template>

<script>
/**
 * @file 朝代组件
 */
export default {
  props: {
    // 朝代数据
    dynastyData: Object,
    // 缩放比例
    scale: {
      type: Number,
      default: 1
    },
    // 颜色库，顺序调取
    colors: {
      type: Array,
      default: [
        '#E53A40',
        '#E97F02',
        '#8CD790',
        '#30A9DE'
      ]
    }
  },
  watch: {
    scale(value) {
      this.init();
    }
  },
  data() {
    return {
      list: []
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      const list = [];
      const clors = this.colors;
      let index = 0;
      this.dynastyData.list.forEach(item => {
        item.style = {
          background: clors[index],
          height: (item.to - item.from) * this.scale + 'px'
        };
        list.push(item);
        index++;
        if (index + 1 > clors.length) {
          index = 0;
        }
      });
      this.list = list;
    }
  }
}
</script>
<style lang="less" scoped>
.dynasty {
  color: #fff;
}
</style>