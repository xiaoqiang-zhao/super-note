
import persions from '@/data/Persions'
import books from '@/data/Books'
import technology from '@/data/Technology'
import building from '@/data/Building'

const middleData = [
  {
    name: 'persion',
    title: '人',
    topKey: 'bornIn',
    componentName: 'Persion',
    backgroundColor: '#4F86C6',
    dataList: persions
  },
  {
    name: 'book',
    title: '书',
    topKey: 'publicTime',
    componentName: 'Book',
    backgroundColor: '#6c83ba',
    dataList: books
  },
  {
    name: 'technology',
    title: '科技',
    topKey: 'time',
    componentName: 'TimeAndCover',
    backgroundColor: '#a87ea2',
    dataList: technology
  },
  {
    name: 'art',
    title: '艺术',
    topKey: 'time',
    componentName: 'TimeAndCover',
    backgroundColor: '#BB3D71',
    dataList: []
  },
  {
    name: 'building',
    title: '建筑',
    topKey: 'time',
    componentName: 'TimeAndCover',
    articleItemHeight: 90,
    backgroundColor: '#E695A8',
    dataList: building
  },
  {
    name: 'incident',
    title: '事件',
    topKey: 'startTime',
    componentName: 'TimeAndCover',
    backgroundColor: '#F4B6D5',
    dataList: []
  },
  {
    name: 'concept',
    title: '概念',
    topKey: 'time',
    componentName: 'TimeAndCover',
    backgroundColor: '#FFCDB2',
    dataList: []
  }
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
      const articleItemHeight = item.articleItemHeight ? item.articleItemHeight : 141
      // 上下最小间距
      const minBottomSpace = 10
      const bottomPosition = topPosition + articleItemHeight + minBottomSpace
      let lastIndex = index
      let columnIndex = 0

      // 第一个元素直接跳过，无需走计算逻辑
      if (lastIndex > 0) {
        // 获取水平方向上有重叠的元素的 columnIndex 数组
        let positionItem = item.dataList[--lastIndex].positionData
        while(positionItem && positionItem.bottomPosition >= topPosition) {
          columnIndexArr.push(positionItem.columnIndex)
          positionItem = lastIndex > 0 ? item.dataList[--lastIndex].positionData : null
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
      let imgContainerStyle = null
      if (item.articleItemHeight) {
        imgContainerStyle = {
          height: item.articleItemHeight - 20 + 'px'
        }
      }
      data.positionData = {
        bottomPosition,
        columnIndex,
        positionStyle,
        imgContainerStyle
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
