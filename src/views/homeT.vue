<template>
  <div class="home">
    <timeLine/>
  </div>
</template>

<script>
// @ is an alias to /src
import timeLine from '@/components/timeLine.vue'

export default {
  name: 'home',
  components: {
    timeLine
  }
}
</script>
