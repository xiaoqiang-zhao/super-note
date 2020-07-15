<template>
  <section class="home" ref="root">
    <aside class="left" :style="{'flex': `0 0 ${header.left.width}px`}">
      <HomeHeader :data="header.left"/>
      <section class="content">
        <section class="content-item content-time-line">
          <TimeLine class="content-item"/>
        </section>
        <Dynasty class="content-item dynasty" :dynastyData="chinaDynasty" :scale="scale"/>
        <Dynasty class="content-item dynasty" :dynastyData="europeDynasty" :scale="scale" :colors="colors"/>
      </section>
    </aside>
    <section class="middle" :style="{'flex': `1 0 ${header.middle.width}px`}">
      <HomeHeader :data="header.middle" :style="middleStyle"/>
      <section class="content" :style="middleStyle" ref="middleContent">
        <section class="content-item persions-container" :style="persionsContainerStyle">
          <Persion v-for="item in persions" :key="item.name" :data="item" :scale="scale"/>
        </section>
        <section class="content-item books-container" :style="persionsContainerStyle">
          <Book v-for="item in books" :key="item.name" :data="item" :scale="scale"/>
        </section>
      </section>
    </section>
    <aside class="right" :style="{'flex': `0 0 ${header.right.width}px`}">
      <HomeHeader :data="header.right"/>
      <section class="content">
      </section>
    </aside>
  </section>
</template>

<script>
/**
 * @file 主页
 */
import HomeHeader from '@/components/HomeHeader'
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
    HomeHeader,
    TimeLine,
    Dynasty,
    Persion,
    Book
  },
  // computed: {
  //   middleStyle() {
  //     let max = 2000;
  //     if (this.$refs.root) {
  //       debugger
  //       max = this.$refs.root.offsetWidth - this.header.left.width - this.header.right.width;
  //       // this.$refs.root.offsetWidth
  //     }
  //     return {
  //       'max-width': `${max}px`
  //     };
  //   }
  // },
  data() {
    return {
      header: this.$store.state.header,
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
.home {
  display: flex;

  .left,
  .right,
  .middle {
    @header-height: 30px;
    display: flex;
    flex-direction: column;
    .content {
      display: flex;
      flex-direction: row;
      flex: 1;
      padding: 20px 5px 200px;
      // overflow: hidden;
      box-sizing: border-box;
      background: #4FB0C6;
      .content-item {
        position: relative;
      }
      .content-time-line {
        width: 90px;
      }
    }
  }
}
</style>