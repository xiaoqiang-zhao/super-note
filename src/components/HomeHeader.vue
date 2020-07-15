<template>
<header class="home-header">
    <section
      v-for="item in data.items"
      :key="item.name"
      :style="{'flex': `0 0 ${item.width}px`}"
      class="item">
      <template v-if="item.children">
        <div class="title">{{item.name}}</div>
        <section class="items">
          <div class="item" v-for="child in item.children" :key="child.name">
            {{child.name}}
          </div>
        </section>
      </template>
      <template v-else>
        {{item.name}}
      </template>
    </section>
</header>
</template>

<script>
export default {
  props: ['data'],
  computed: {

  },
  methods: {

  }
}
</script>

<style lang="less" scoped>
// 说明: 外层空间为纵向布局
.home-header {
  @height: 46px;
  display: flex;
  flex: 0 0 @height;
  overflow: auto;
  color: whitesmoke;
  text-align: center;
  background: yellowgreen;
  .item {
    line-height: @height;
    .title,
    .items {
      line-height: @height / 2;
    }
    .items {
      display: flex;
      .item {
        line-height: @height / 2;
        flex: 1;
      }
    }
  }
}
</style>
