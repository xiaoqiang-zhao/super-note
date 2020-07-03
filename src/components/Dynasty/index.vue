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
    dynastyData: Object,
    scale: {
      type: Number,
      default: 10
    }
  },
  data() {
    const list = [];
    const clors = [
      '#E53A40',
      '#E97F02',
      '#8CD790',
      '#30A9DE'
    ];
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

    return {
      list,
      // 颜色库，顺序调取
      clors,
    };
  }
}
</script>
<style lang="less" scoped>
.dynasty {
  color: #fff;
}
</style>