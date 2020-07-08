<script>
/**
 * @file 需要在调整缩放比例后重新渲染的组件的公共部分
 */
import store from '../store'

export default {
  props: {
    // 缩放比例, 一年:像素高度, 默认是 1，可在 1 和 10 之间切换
    scale: {
      type: Number,
      default: store.state.scale
    }
  },
  mounted() {
    this.init();
  },
  watch: {
    scale() {
      this.init();
    }
  },
  methods: {

    /**
     * 初始化，占位函数，会被实例化组件的方法替代
     */
    init() {}
  }
}
</script>
