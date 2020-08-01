<script>
/**
 * @file 需要在调整缩放比例后重新渲染的组件的公共部分
 */

export default {
  computed: {
    // 缩放比例, 一年:像素高度, 默认是 1，可在 1 和 10 之间切换
    scale() {
      return this.$store.state.scale
    }
  },
  mounted() {
    this.updatePositionStyle()
  },
  watch: {
    scale() {
      this.updatePositionStyle()
    }
  },
  methods: {

    /**
     * 初始化，占位函数，会被实例化组件的方法替代
     */
    init() {},

    /**
     * 当切换缩放比利时，更新位置样式
     * 当组件外部的 data 中 positionStyle 已经改变后，组件没有自动更新 Dom，
     * 这里需要手动触发，否者不会重新排列
     */
    updatePositionStyle() {
      this.init && this.init()
      if (this.data) {
        this.positionStyle = this.data.positionData.positionStyle
      }
    }
  }
}
</script>
