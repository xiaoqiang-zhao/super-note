<template>
  <section class="home" ref="homePageRoot">
    <aside class="left" :class="{'shadow': leftShadow}" :style="{'flex': `0 0 ${header.left.width}px`}">
      <HomeHeader :data="header.left" :class="{'shadow': headerShadow}"/>
      <section class="content" ref="leftContent">
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
      <HomeHeader :data="header.middle" :style="middleStyle" ref="middleHeader" :class="{'shadow': headerShadow}"/>
      <section class="content" :style="middleStyle" ref="middleContent">
        <section v-for="item in middleData" :key="item.name" class="content-item" :style="item.containerStyle">
          <component
            :is="item.componentName"
            v-for="data in item.dataList"
            :key="data.name"
            :data="data"/>
        </section>
      </section>
    </section>
    <aside class="right" :class="{'shadow': rightShadow}" :style="{'flex': `0 0 ${header.right.width}px`}">
      <HomeHeader :data="header.right" :class="{'shadow': headerShadow}"/>
      <section class="content" ref="rightContent">
        <section class="content-item">
          <!-- <div v-for="item in 100" :key="`aaa${item}`">{{item}}</div> -->
        </section>
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
import TimeAndCover from '@/components/TimeAndCover'

import chinaDynasty from '@/components/Dynasty/china'
import europeDynasty from '@/components/Dynasty/europe'
import persions from '@/data/Persions'
import books from '@/data/Books'
import technology from '@/data/Technology'

export default {
  name: 'home',
  components: {
    HomeHeader,
    TimeLine,
    Dynasty,
    Persion,
    Book,
    TimeAndCover
  },
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
      technology,
      middleMinWidth: 300,
      middleStyle: {},
      scrollLeft: 0,
      scrollTop: 0,
      leftShadow: false,
      rightShadow: false,
      headerShadow: false
    }
  },
  computed: {
    middleData() {
      return this.$store.state.middleData
    },
    // 缩放率
    scale() {
      return this.$store.state.scale
    }
  },
  mounted() {
    const leftWidth = this.$store.state.header.left.width
    const rightWhidth = this.$store.state.header.right.width
    const rootWidth = this.$refs.homePageRoot.offsetWidth
    const minWidth = this.middleMinWidth
    let middleWidth = rootWidth - leftWidth - rightWhidth
    
    middleWidth = middleWidth > minWidth ? middleWidth : minWidth
    this.middleStyle = {
      'max-width': `${middleWidth}px`
    };
    this.$nextTick(() => {
      this.bindScrollEvent()
    })

    this.$store.commit('initMiddleLayoutData')
  },

  methods: {

    /**
     * 改变比例尺，时间与页面尺寸的比例在 1:1 和 1:10 之间切换
     */
    changeScale(value) {
      this.scale = value
    },

    /**
     * 绑定滚动条事件
     */
    bindScrollEvent() {
      const bottomSpace = 300
      const leftContent = this.$refs.leftContent
      const rightContent = this.$refs.rightContent
      const middleContent = this.$refs.middleContent
      const middleHeader = this.$refs.middleHeader.$el
      const maxScrollLeft = middleContent.scrollWidth - middleContent.offsetWidth
      const maxScrollTop = middleContent.scrollHeight - middleContent.offsetHeight + bottomSpace

      if (maxScrollLeft > 0) {
        this.rightShadow = true
      }
      // 给每一个 contentItem 指定一个较大的高度，防止 contentItem 高度不同引起的滚动条高度不一致
      const scrollHeight = middleContent.scrollHeight
      document.getElementsByClassName('content-item').forEach(element => {
        element.style.height = `${scrollHeight + bottomSpace}px`
      })
      
      this.$refs.homePageRoot.addEventListener('wheel', event => {
        // 横向滚动，中间部分的头部和内容滚动
        if (event.wheelDeltaX) {
          let scrollLeft = this.scrollLeft - (event.wheelDeltaX / 3)
          this.scrollLeft = scrollLeft > maxScrollLeft ? maxScrollLeft : scrollLeft
          middleHeader.scrollTo(this.scrollLeft, 0)
          middleContent.scrollTo(this.scrollLeft - 1, this.scrollTop)
          
          this.leftShadow = this.scrollLeft > 0
          this.rightShadow = this.scrollLeft < maxScrollLeft
        }
        // 纵向滚动，左中右的内容区
        if (event.wheelDeltaY) {
          let scrollTop = this.scrollTop - (event.wheelDeltaY / 3)
          this.scrollTop = scrollTop > maxScrollTop ? maxScrollTop : scrollTop
          middleContent.scrollTo(this.scrollLeft, this.scrollTop - 1)
          leftContent.scrollTo(this.scrollLeft, this.scrollTop - 1)
          rightContent.scrollTo(this.scrollLeft, this.scrollTop - 1)
          this.headerShadow = this.scrollTop > 0
        }
        event.preventDefault()
      })
    }
  }
}
</script>

<style lang="less" scoped>
.home {
  display: flex;
  height: 100vh;

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
      overflow: hidden;
      box-sizing: border-box;
      .content-item {
        position: relative;
        padding: 0 5px;
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

  .right .content {
    overflow: auto;
    .content-item {
      border: none;
    }
  }

  .middle .content {
    overflow-x: auto;
  }

  .shadow {
    box-shadow: 0 5px 10px 0 rgba(0, 0, 0, .3);
  }
}
</style>