import Vuex from 'vuex'

export default Vuex.createStore({
  state: {
    // 缩放率
    scale: 1,
    // 历史人物列表
    persionPositionList: [],
    persionColumnMax: 0
  },
  getters: {},
  mutations: {

    /**
     * 推入人物占位信息
     *
     * @param {Object}} state 
     * @param {Object} persionData 人物数据
     */
    pushPersionPositionList(state, persionData) {
      // persionData 示例数据
      // {
      //   name: '孔子',
      //   bornIn: -551,
      //   diedIn: -479,
      //   portrait: '/static/kongzi.jpeg'
      // }

      const columnIndexArr = [];
      const topPosition = persionData.bornIn * state.scale;
      const bottomPosition = persionData.bornIn * state.scale + 141 + 10;
      let lastIndex = state.persionPositionList.length;
      let columnIndex = 0;

      // 第一个元素直接跳过，无需走计算逻辑
      if (lastIndex--) {
        // 获取水平方向上有重叠的元素的 columnIndex 数组
        let item = state.persionPositionList[lastIndex];
        while(item && item.bottomPosition >= topPosition) {
          columnIndexArr.push(item.columnIndex);
          item = state.persionPositionList[--lastIndex];
        }
        columnIndexArr.sort();
        const a = columnIndexArr.some((item, index) => {
          if (item !== index) {
            columnIndex = index;
            return true;
          }
        });
        if (!a) {
          columnIndex = columnIndexArr.length;
        }
      }
      if (columnIndex > state.persionColumnMax) {
        state.persionColumnMax = columnIndex;
      }
      state.persionPositionList.push({
        bottomPosition,
        columnIndex
      });
    },

    /**
     * 清空人物占位信息
     *
     * @param {Object}} state 
     * @param {Object} persionData 人物数据
     */
    clearPersionPositionList(state) {
      state.persionPositionList = [];
    },

    /**
     * 设置缩放率
     *
     * @param {Object}} state 
     * @param {Number} value 缩放率
     */
    setScale(state, value) {
      // 这里有两种写法:
      // 一种采用 actions，
      // 一个 action 方法中调用两个 mutation 方法，每个 mutation 方法只改变一个 state 属性，
      // 在业务组件中用 this.$store.dispatch('changeScale', 10) 调用
      // 
      // 另一种在一个 mutation 方法中改变两个 state 属性
      state.persionPositionList = [];
      state.scale = value;
    }
  },
  actions: {

    /**
     * 
     * @param {Object} context 
     * @param {Number} value 分辨率
     */
    // changeScale(context, value) {
    //   context.commit('clearPersionPositionList');
    //   context.commit('setScale', value);
    // }
  },
  modules: {
  }
});
