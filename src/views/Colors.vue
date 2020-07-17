<template>
  <section class="colors">
    <!-- 阶梯型配色 -->
    <h3>阶梯型配色</h3>
    <div v-for="line in stairMatrix" :key="`line-${line}`" class="line">
      <!-- 一个格子 -->
      <div v-for="item in line" :key="`item-${item}`" class="item">
        <!-- 格子中的两种颜色 -->
        <div v-for="color in item" :key="color" class="color" :style="{'background': color}"></div>
      </div>
    </div>
    <!-- 格子型配色 -->
    <h3>格子型配色</h3>
    <div v-for="line in gridMatrix" :key="`line-${line}`" class="line">
      <!-- 一个格子 -->
      <div v-for="item in line" :key="`item-${item}`" class="item">
        <!-- 格子中的两种颜色 -->
        <div v-for="color in item" :key="color" class="color" :style="{'background': color}"></div>
      </div>
    </div>
    <h3>格子型配色 - 跳色</h3>
    <div v-for="line in gridMatrix2" :key="`line-${line}`" class="line">
      <!-- 一个格子 -->
      <div v-for="item in line" :key="`item-${item}`" class="item">
        <!-- 格子中的两种颜色 -->
        <div v-for="color in item" :key="color" class="color" :style="{'background': color}"></div>
      </div>
    </div>
  </section>
</template>

<script>
/**
 * @file 背景色集合
 */
export default {
  data() {
    const colors = [
      'rgb(65,109,69)',
      'rgb(57,123,18)',
      'rgb(21,125,114)',
      'rgb(22,126,167)',
      'rgb(102,129,198)',
      'rgb(131,163,5)',
      'rgb(115,159,161)',
      'rgb(85,158,231)',
      'rgb(54,183,167)',
      'rgb(65,178,231)',
      'rgb(134,187,184)',
      'rgb(143,206,215)',
      'rgb(157,215,202)',
      'rgb(153,230,176)',
      'rgb(176,224,165)',
      'rgb(202,239,230)'
    ]
    const stairMatrix = [];
    colors.forEach((item, index) => {
      const line = [];
      for(let i = 0; i < index + 1; i++) {
        line.push([
          colors[i],
          item
        ]);
      }
      stairMatrix.push(line)
    });

    const gridMatrix = [];
    this.createGridMatrix(colors, gridMatrix);

    const gridMatrix2 = [];
    const jumpColors = [
      '#67D5B5',
      '#84B1ED',
      '#1ec0ff',
      '#4F86C6',
      '#6c83ba',
      '#a87ea2',
      '#EE7785',
      '#C89EC4',
      '#F6B352',
      '#F68657'
    ];
    this.createGridMatrix(jumpColors, gridMatrix2);
    
    return {
      colors: [
        1,
        2,
        3,
        4
      ],
      stairMatrix,
      gridMatrix,
      gridMatrix2
    }
  },
  methods: {
    createGridMatrix(colors, matrix) {
      colors.forEach((lineItem, index) => {
        const line = []
        colors.forEach(rowItem => {
          line.push([
            lineItem,
            rowItem
          ]);
        })
        // 调到前面
        const item = line.splice(index, 1)
        line.unshift(item[0])
        matrix.push(line)
      });

      return matrix;
    }
  }
}
</script>

<style lang="less" scoped>
.colors {
  padding: 20px;
  .line {
    display: flex;
    flex-direction: row;
  }
  .item {
    @size: 50px;
    display: flex;
    flex-direction: row;
    flex: 0 0 @size;
    margin: 3px;
    .color {
      width: @size;
      height: @size;
    }
  }
}
</style>