<template>
  <section class="home" id="home-page-root">
    <aside class="left" :style="{'flex': `0 0 ${header.left.width}px`}">
      <HomeHeader :data="header.left"/>
      <section class="content">
        <section class="content-item content-time-line">
          <TimeLine/>
        </section>
        <Dynasty
          class="content-item dynasty"
          :dynastyData="chinaDynasty"
          :scale="scale"
          :colors="chinaColors"/>
        <Dynasty
          class="content-item dynasty"
          :dynastyData="europeDynasty"
          :scale="scale"
          :colors="europeColors"/>
      </section>
    </aside>
    <section class="middle" :style="{'flex': `1 0 ${middleMinWidth}px`}">
      <HomeHeader :data="header.middle" :style="middleStyle"/>
      <section class="content" :style="middleStyle" ref="middleContent">
        <section class="content-item persions-container" :style="persionsContainerStyle">
          <Persion v-for="item in persions" :key="item.name" :data="item" :scale="scale"/>
        </section>
        <section class="content-item books-container" :style="booksContainerStyle">
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
      europeColors: [
        '#1ec0ff',
        '#67D5B5',
        '#84B1ED',
        '#4F86C6',
        '#6c83ba',
        '#a87ea2',
        '#EE7785',
        '#C89EC4',
        '#F6B352',
        '#F68657'
      ],
      chinaColors: [
        '#84B1ED',
        '#67D5B5',
        '#1ec0ff',
        '#4F86C6',
        '#6c83ba',
        '#a87ea2',
        '#EE7785',
        '#C89EC4',
        '#F6B352',
        '#F68657'
      ],
      persions,
      books,
      middleMinWidth: 300,
      middleStyle: {},
      persionsContainerStyle: {},
      booksContainerStyle: {}
    }
  },
  computed: {
    // 缩放率
    scale() {
      return this.$store.state.scale
    },
    persionColumnMax() {
      console.log(1)
      return this.$store.state.persionColumnMax;
    },
    bookColumnMax() {
      console.log(2)
      return this.$store.state.bookColumnMax;
    }
  },
  watch: {
    persionColumnMax() {
      this.persionsContainerStyle = {
        flex: `1 0 ${(this.persionColumnMax + 1) * 110 + 10}px`
      }
    },
    bookColumnMax() {
      this.booksContainerStyle = {
        flex: `1 0 ${(this.bookColumnMax + 1) * 110 + 10}px`
      }
    }
  },
  mounted() {
    const leftWidth = this.$store.state.header.left.width;
    const rightWhidth = this.$store.state.header.right.width;
    const rootWidth = document.getElementById('home-page-root').offsetWidth;
    const minWidth = this.middleMinWidth;
    let middleWidth = rootWidth - leftWidth - rightWhidth;
    
    middleWidth = middleWidth > minWidth ? middleWidth : minWidth;
    this.middleStyle = {
      'max-width': `${middleWidth}px`
    };
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
      padding: 20px 0;
      overflow: auto;
      box-sizing: border-box;
      .content-item {
        position: relative;
        padding: 0 5px 200px;
        box-sizing: border-box;
        border-right: dashed 1px #666;
      }
      .content-time-line {
        width: 90px;
        border: none;
      }
      .dynasty {
        border: none;
      }
    }
  }
}
</style>