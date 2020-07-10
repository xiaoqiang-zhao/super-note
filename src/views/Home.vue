<template>
  <div class="home">
    <HeaderBox :scale="scale" @changeScale="changeScale"/>
    <section class="body-section">
      <TimeLine class="time-line" :scale="scale" :space="20"/>
      <Dynasty class="dynasty" :dynastyData="chinaDynasty" :scale="scale"/>
      <Dynasty class="dynasty" :dynastyData="europeDynasty" :scale="scale" :colors="colors"/>
      <section class="everything-container">
        <section class="container-item persions-container" :style="persionsContainerStyle">
          <Persion v-for="item in persions" :key="item.name" :data="item" :scale="scale"/>
        </section>
        <section class="container-item books-container" :style="persionsContainerStyle">
          <Book v-for="item in books" :key="item.name" :data="item" :scale="scale"/>
        </section>
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
import books from '@/data/Books';

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
      persions,
      books,
      persionsContainerStyle: {}
    }
  },
  computed: {
    // 缩放率
    scale() {
      return this.$store.state.scale
    },
    persionColumnMax() {
      return this.$store.state.persionColumnMax;
    }
  },
  watch: {
    persionColumnMax() {
      this.persionsContainerStyle = {
        flex: `0 0 ${(this.persionColumnMax + 1) * 110}px`
      }
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
    display: flex;
    margin-left: 5px;
    .container-item {
      position: relative;
      height: 100%;
      border-right: dashed 1px #6C49B8;
    }
    .persions-container {
      border-color: #6C49B8;
    }
    .books-container {
      border-color: #4F86C6;
    }
  }
}
</style>