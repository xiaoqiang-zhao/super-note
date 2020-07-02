<template>
  <div class="home">
    <TimeLine/>
    <Book/>
  </div>
</template>

<script>
// @ is an alias to /src
import TimeLine from '@/components/TimeLine'
import Book from '@/components/Book.vue'

export default {
  name: 'home',
  components: {
    TimeLine,
    Book
  }
}
</script>
