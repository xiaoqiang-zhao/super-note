import Vuex from 'vuex'

import middleData from './middleData'

export default Vuex.createStore({
  state: {
    // 开始时间
    startTime: -1660,
    // 缩放率
    scale: 1,
    middleData,
    // 历史人物列表
    persionPositionList: [],
    persionColumnMax: 0,
    // 书
    bookPositionList: [],
    bookColumnMax: 0,
    // 科技
    technologyPositionList: [],
    technologyColumnMax: 0,
    header: {
      left: {
        width: 270,
        items: [
          {
            name: '时间轴',
            width: 90,
            backgroundColor: '#67D5B5'
          },
          {
            name: '政权与朝代',
            width: 180,
            backgroundImage: 'linear-gradient(to right, #84B1ED , #1ec0ff)',
            // 二层结构
            children: [
              {
                name: '中国',
                width: 90,
                backgroundColor: '#84B1ED'
              },
              {
                name: '欧洲',
                width: 90,
                backgroundColor: '#1ec0ff'
              }
            ]
          }
        ]
      },
      middle: {
        width: 1020,
        items: [
          {
            name: '包罗万象',
            width: 1020,
            backgroundImage: 'linear-gradient(to right, #4F86C6 , #6c83ba, #a87ea2)',
            // 二层结构
            children: [
              {
                name: '人',
                // 6 列，110 * 6 + 10
                width: 670,
                backgroundColor: '#4F86C6'
              },
              {
                name: '书',
                // 3 列，110 * 3 + 10
                width: 340,
                backgroundColor: '#6c83ba'
              },
              {
                name: '科技',
                // 1 列，110 + 10
                width: 120,
                backgroundColor: '#a87ea2'
              }
            ]
          }
      ]},
      right: {
        width: 280,
        items: [
          {
            name: '主题和启发',
            width: 280,
            backgroundColor: '#EE7785'
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
      state.persionPositionList = []
      state.bookPositionList = []
      state.scale = value
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

      const columnIndexArr = []
      const topPosition = persionData.bornIn * state.scale
      const bottomPosition = persionData.bornIn * state.scale + 141 + 10
      let lastIndex = state.persionPositionList.length
      let columnIndex = 0

      // 第一个元素直接跳过，无需走计算逻辑
      if (lastIndex--) {
        // 获取水平方向上有重叠的元素的 columnIndex 数组
        let item = state.persionPositionList[lastIndex]
        while(item && item.bottomPosition >= topPosition) {
          columnIndexArr.push(item.columnIndex)
          item = state.persionPositionList[--lastIndex]
        }
        columnIndexArr.sort()
        const hasSpace = columnIndexArr.some((item, index) => {
          if (item !== index) {
            columnIndex = index
            return true
          }
        })
        if (!hasSpace) {
          columnIndex = columnIndexArr.length
        }
      }
      if (columnIndex > state.persionColumnMax) {
        state.persionColumnMax = columnIndex
      }
      state.persionPositionList.push({
        bottomPosition,
        columnIndex
      })
    },

    /**
     * 清空人物占位信息
     *
     * @param {Object}} state 
     */
    clearPersionPositionList(state) {
      state.persionPositionList = []
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

      const columnIndexArr = []
      const topPosition = bookData.publicTime * state.scale
      const bottomPosition = bookData.publicTime * state.scale + 141 + 10
      let lastIndex = state.bookPositionList.length
      let columnIndex = 0

      // 第一个元素直接跳过，无需走计算逻辑
      if (lastIndex--) {
        // 获取水平方向上有重叠的元素的 columnIndex 数组
        let item = state.bookPositionList[lastIndex]
        while(item && item.bottomPosition >= topPosition) {
          columnIndexArr.push(item.columnIndex)
          item = state.bookPositionList[--lastIndex]
        }
        columnIndexArr.sort()
        const hasSpace = columnIndexArr.some((item, index) => {
          if (item !== index) {
            columnIndex = index
            return true
          }
        })
        if (!hasSpace) {
          columnIndex = columnIndexArr.length
        }
      }
      if (columnIndex > state.bookColumnMax) {
        state.bookColumnMax = columnIndex
      }
      state.bookPositionList.push({
        bottomPosition,
        columnIndex
      })
    },

    /**
     * 推入科技成果占位信息
     *
     * @param {Object}} state 
     * @param {Object} technologyData 科技数据
     */
    pushTechnologyPositionList(state, technologyData) {
      // TODO 抽象重构
      state.technologyPositionList.push(technologyData)
      state.technologyColumnMax = 1
    },

    /**
     * 初始化中间部分的布局数据
     * 
     * @param {Object}} state
     */
    initMiddleLayoutData(state) {
      state.middleData = middleData.init(state)
      // state.middleData.forEach(item => {
      //   // 清空
      //   item.positionList = []
      //   item.maxColumnIndex = 0

      //   // 计算位置和尺寸
      //   item.dataList.forEach((data, index) => {
      //     const columnIndexArr = []
      //     const topPosition = data[item.topKey] * state.scale
      //     const bottomPosition = topPosition + 141 + 10
      //     let lastIndex = item.positionList.length
      //     let columnIndex = 0

      //     data.index = index;

      //     // 第一个元素直接跳过，无需走计算逻辑
      //     if (lastIndex--) {
      //       // 获取水平方向上有重叠的元素的 columnIndex 数组
      //       let positionItem = item.positionList[lastIndex]
      //       while(positionItem && positionItem.bottomPosition >= topPosition) {
      //         columnIndexArr.push(positionItem.columnIndex)
      //         positionItem = state.bookPositionList[--lastIndex]
      //       }
      //       columnIndexArr.sort()
      //       const hasSpace = columnIndexArr.some((item, index) => {
      //         if (item !== index) {
      //           columnIndex = index
      //           return true
      //         }
      //       })
      //       if (!hasSpace) {
      //         columnIndex = columnIndexArr.length
      //       }
      //     }
      //     if (columnIndex > item.maxColumnIndex) {
      //       item.maxColumnIndex = columnIndex
      //     }

      //     const positionStyle = {
      //       top: (data.bornIn - state.startTime) * state.scale + 'px',
      //       left: columnIndex * (100 + 10) + 10 + 'px'
      //     }
      //     item.positionList.push({
      //       name: data.name,
      //       bottomPosition,
      //       columnIndex,
      //       positionStyle
      //     })
      //   })

      //   // 容器样式
      //   item.containerStyle = {
      //     flex: `1 0 ${(item.maxColumnIndex + 1) * 110 + 10}px`
      //   }
      // })
    }
  },
  actions: {

    /**
     * 
     * @param {Object} context 
     * @param {Number} value 分辨率
     */
    // changeScale(context, value) {
    //   context.commit('clearPersionPositionList')
    //   context.commit('setScale', value)
    // }
  },
  modules: {
  }
})
