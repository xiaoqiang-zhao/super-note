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
        width: 0,
        items: [
          {
            name: '包罗万象',
            width: 0,
            backgroundImage: 'linear-gradient(to right, #4F86C6 , #6c83ba, #a87ea2)',
            // 二层结构
            children: [
              {
                name: '人',
                width: 120,
                backgroundColor: '#4F86C6'
              },
              {
                name: '书',
                width: 120,
                backgroundColor: '#6c83ba'
              },
              {
                name: '科技',
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
     * 初始化中间部分的布局数据
     * 
     * @param {Object}} state
     */
    initMiddleLayoutData(state) {
      state.middleData = middleData.init(state)

      // 更新头部数据
      const firstItem = state.header.middle.items[0];
      firstItem.children = []
      let middleWidth = 0
      state.middleData.forEach(item => {
        const width = (item.maxColumnIndex + 1) * 110 + 10
        firstItem.children.push({
          name: item.title,
          width,
          backgroundColor: item.backgroundColor
        })
        middleWidth += width
      })
      firstItem.width = middleWidth
      state.header.middle.width = middleWidth
    }
  },
  actions: {
  },
  modules: {
  }
})
