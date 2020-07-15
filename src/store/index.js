import Vuex from 'vuex'

export default Vuex.createStore({
  state: {
    // 缩放率
    scale: 1,
    // 历史人物列表
    persionPositionList: [],
    persionColumnMax: 0,
    bookPositionList: [],
    bookColumnMax: 0,
    header: {
      left: {
        width: 270,
        items: [
          {
            name: '时间轴',
            width: 90
          },
          {
            name: '政权与朝代',
            width: 180,
            // 二层结构
            children: [
              {
                name: '中国',
                width: 90
              },
              {
                name: '欧洲',
                width: 90
              }
            ]
          }
        ]
      },
      middle: {
        width: 900,
        items: [
          {
            name: '包罗万象',
            width: 900,
            // 二层结构
            children: [
              {
                name: '人',
                // 5 列，110 * 5 + 10
                width: 560
              },
              {
                name: '书',
                // 3 列，110 * 3 + 10
                width: 340
              }
            ]
          }
      ]},
      right: {
        width: 180,
        items: [
          {
            name: '主题和认知',
            width: 90
          },
          {
            name: '问题和方案',
            width: 90
          }
        ]
      }
    }
  },
  getters: {},
  mutations: {

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
      // action 一般用于异步数据同步
      // 
      // 另一种在一个 mutation 方法中改变两个 state 属性
      state.persionPositionList = [];
      state.bookPositionList = [];
      state.scale = value;
    },

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
      //   portrait: '/static/persions-portrait/kongzi.jpeg'
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
        const hasSpace = columnIndexArr.some((item, index) => {
          if (item !== index) {
            columnIndex = index;
            return true;
          }
        });
        if (!hasSpace) {
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
     */
    clearPersionPositionList(state) {
      state.persionPositionList = [];
    },

    /**
     * 推入书占位信息
     *
     * @param {Object}} state 
     * @param {Object} bookData 书数据
     */
    pushBookPositionList(state, bookData) {
      // bookData 示例数据
      // {
      //   name: '蒙台梭利早期教育法',
      //   publicTime: 1909,
      //   cover: '/static/book-cover/蒙台梭利早期教育法.png'
      // }

      const columnIndexArr = [];
      const topPosition = bookData.publicTime * state.scale;
      const bottomPosition = bookData.publicTime * state.scale + 141 + 10;
      let lastIndex = state.bookPositionList.length;
      let columnIndex = 0;

      // 第一个元素直接跳过，无需走计算逻辑
      if (lastIndex--) {
        // 获取水平方向上有重叠的元素的 columnIndex 数组
        let item = state.bookPositionList[lastIndex];
        while(item && item.bottomPosition >= topPosition) {
          columnIndexArr.push(item.columnIndex);
          item = state.bookPositionList[--lastIndex];
        }
        columnIndexArr.sort();
        const hasSpace = columnIndexArr.some((item, index) => {
          if (item !== index) {
            columnIndex = index;
            return true;
          }
        });
        if (!hasSpace) {
          columnIndex = columnIndexArr.length;
        }
      }
      if (columnIndex > state.persionColumnMax) {
        state.bookColumnMax = columnIndex;
      }
      state.bookPositionList.push({
        bottomPosition,
        columnIndex
      });
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
