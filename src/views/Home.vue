<template>
  <section class="home">
    <!-- <TimeLine class="time-line"/> -->
    <aside class="left" :style="{'flex': `0 0 ${header.left.width}px`}">
      <HomeHeader :data="header.left"/>
    </aside>
    <section class="middle" :style="{'flex': `0 0 ${header.middle.width}px`}">
      <HomeHeader :data="header.middle"/>
    </section>
    <aside class="right" :style="{'flex': `0 0 ${header.right.width}px`}">
      <HomeHeader :data="header.right"/>
    </aside>
  </section>
</template>

<script>
/**
 * @file 主页
 */
import HomeHeader from '@/components/HomeHeader'
// import TimeLine from '@/components/TimeLine'

export default {
  name: 'home',
  components: {
    HomeHeader
    // TimeLine,
  },
  data() {
    return {
      header: this.$store.state.header
    }
  },
  methods: {}
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
    // > header {
    //   flex: 0 0 @header-height;
    //   line-height: @header-height;
    //   margin: 5px;
    //   overflow: hidden;
    //   background: #4F86C6;
    //   text-align: center;
    // }
    > section {
      flex: 1;
      margin: 5px;
      padding-bottom: 5px;
      overflow: hidden;
      background: #4FB0C6;
    }
  }

  .left,
  .right {
    flex: 0 0 100px;
  }
  .middle {
    flex: 1;
    background: whitesmoke;
    > section {
      max-width: 590px;
      > div {
        display: flex;
        .content-item {
          margin-bottom: 0;
        }
      }
    }
  }
}
</style>