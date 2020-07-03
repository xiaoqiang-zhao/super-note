<template>
  <div class="home">
    <HeaderBox/>
    <TimeLine/>
    <Book/>
  </div>
</template>

<script>
// @ is an alias to /src
import HeaderBox from '@/components/HeaderBox'
import TimeLine from '@/components/TimeLine'
import Book from '@/components/Book.vue'

export default {
  name: 'home',
  components: {
    HeaderBox,
    TimeLine,
    Book
  }
}
</script>
