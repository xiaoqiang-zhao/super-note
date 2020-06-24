<template>
  <div class="home">
    <TimeLine/>
  </div>
</template>

<script>
// @ is an alias to /src
import timeLine from '@/components/TimeLine.vue'

export default {
  name: 'home',
  components: {
    TimeLine
  }
}
</script>
