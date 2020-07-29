<template>
<header class="home-header">
    <section
      v-for="item in data.items"
      :key="item.name"
      :style="{flex: `1 0 ${item.width}px`, background: item.backgroundColor}"
      class="item">
      <template v-if="item.children">
        <div class="title" :style="{'background': item.backgroundImage}">{{item.name}}</div>
        <section class="items">
          <div
            class="item"
            v-for="child in item.children" :key="child.name"
            :style="{'flex': `1 0 ${child.width}px`, 'background': child.backgroundColor}">
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
  overflow: hidden;
  color: whitesmoke;
  text-align: center;
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
