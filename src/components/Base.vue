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
    this.update()
  },
  watch: {
    scale() {
      this.update()
    }
  },
  methods: {

    /**
     * 初始化，占位函数，会被实例化组件的方法替代
     */
    init() {},

    update() {
      this.init && this.init()
      if (this.data) {
        this.positionStyle = this.data.positionData.positionStyle
      }
    }
  }
}
</script>
