<template>
  <div class="home">
    <HeaderBox :scale="scale" @changeScale="changeScale"/>
    <section class="body-section">
      <!-- todo: 提取公共部分，用 mixin -->
      <TimeLine class="time-line" :scale="scale" :space="20"/>
      <Dynasty class="dynasty" :dynastyData="chinaDynasty" :scale="scale"/>
      <Dynasty class="dynasty" :dynastyData="europeDynasty" :scale="scale" :colors="colors"/>
      <section class="everything-container">
        <Persion v-for="item in persions" :key="item.name" :data="item" :scale="scale"/>
        <Book/>
      </section>
    </section>
  </div>
</template>

<script>
/**
 * @file 主页
 */
import HeaderBox from '@/components/HeaderBox'
import TimeLine from '@/components/TimeLine'
import Dynasty from '@/components/Dynasty'
import Persion from '@/components/Persion'
import Book from '@/components/Book'

import chinaDynasty from '@/components/Dynasty/china';
import europeDynasty from '@/components/Dynasty/europe';
import persions from '@/data/Persions';

export default {
  name: 'home',
  components: {
    HeaderBox,
    TimeLine,
    Dynasty,
    Persion,
    Book
  },
  data() {
    return {
      chinaDynasty,
      europeDynasty,
      colors: [
        '#27309A',
        '#E97F02',
        '#8CD790',
        '#30A9DE'
      ],
      persions
    }
  },
  computed: {
    // 缩放率
    scale() {
      return this.$store.state.scale
    }
  },
  methods: {

    /**
     * 改变比例尺，时间与页面尺寸的比例在 1:1 和 1:10 之间切换
     */
    changeScale(value) {
      this.scale = value;
    }
  }
}
</script>

<style lang="less" scoped>
.home .body-section {
  display: flex;
  margin: 0 10px 100px;
  .time-line {
    flex: 0 0 50px;
    margin-right: 41px;
  }
  .dynasty {
    flex: 0 0 81px;
    margin: 0 5px;
  }
  .everything-container {
    position: relative;
    margin-left: 5px;
  }
}
</style>