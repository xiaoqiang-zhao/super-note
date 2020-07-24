
import persions from '@/data/Persions'
import books from '@/data/Books'
import technology from '@/data/Technology'
const middleData = [
  {
    name: 'persion',
    title: '人',
    topKey: 'bornIn',
    dataList: persions
  },
  {
    name: 'book',
    title: '书',
    topKey: 'publicTime',
    dataList: books
  },
  // {
  //   name: 'technology',
  //   title: '科技',
  //   topKey: 'time',
  //   dataList: technology
  // },
  // {
  //   name: 'art',
  //   title: '艺术',
  //   topKey: 'time',
  //   dataList: []
  // },
  // {
  //   name: 'building',
  //   title: '建筑',
  //   topKey: 'time',
  //   dataList: []
  // },
  // {
  //   name: 'incident',
  //   title: '事件',
  //   topKey: 'startTime',
  //   dataList: []
  // }
]

// 添加通用字段
middleData.forEach(item => {
  // 防碰撞算法数据容器
  // item.positionList = []
  // 最大列数编号，从 0 开始
  item.maxColumnIndex = 0
  item.containerStyle = {}
})

function init(state) {
  middleData.forEach(item => {
    // 清空
    // item.positionList = []
    item.maxColumnIndex = 0

    // 计算位置和尺寸
    item.dataList.forEach((data, index) => {
      const columnIndexArr = []
      const topPosition = data[item.topKey] * state.scale
      const bottomPosition = topPosition + 141 + 10
      let lastIndex = index
      let columnIndex = 0

      // 第一个元素直接跳过，无需走计算逻辑
      if (lastIndex > 0) {
        // 获取水平方向上有重叠的元素的 columnIndex 数组
        let positionItem = item.dataList[--lastIndex].positionData
        // debugger
        while(positionItem && positionItem.bottomPosition >= topPosition) {
          columnIndexArr.push(positionItem.columnIndex)
          positionItem = lastIndex > 1 ? item.dataList[--lastIndex].positionData : null
        }
        columnIndexArr.sort()
        // 是否有空列位置
        const hasSpace = columnIndexArr.some((item, index) => {
          if (item !== index) {
            // 如果有空列就放在空列处
            columnIndex = index
            return true
          }
        })
        // 如果没有就再加一列
        if (!hasSpace) {
          columnIndex = columnIndexArr.length
        }
      }
      if (columnIndex > item.maxColumnIndex) {
        item.maxColumnIndex = columnIndex
      }

      const positionStyle = {
        top: (data[item.topKey] - state.startTime) * state.scale + 'px',
        left: columnIndex * (100 + 10) + 10 + 'px'
      }
      data.positionData = {
        bottomPosition,
        columnIndex,
        positionStyle
      }
    })

    // 容器样式
    item.containerStyle = {
      flex: `1 0 ${(item.maxColumnIndex + 1) * 110 + 10}px`
    }
  })

  return middleData
}

export default {
  init
}
