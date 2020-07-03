<template>
  <div class="home">
    <HeaderBox/>
    <section class="body-section">
      <TimeLine class="time-line"/>
      <Dynasty class="dynasty" :dynastyData="chinaDynasty"/>
      <section class="everything-container">
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
import Book from '@/components/Book.vue'

import chinaDynasty from '@/components/Dynasty/china';

export default {
  name: 'home',
  components: {
    HeaderBox,
    TimeLine,
    Dynasty,
    Book
  },
  data() {
    return {
      chinaDynasty
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
  }
  .dynasty {
    flex: 0 0 50px;
  }
}
</style>