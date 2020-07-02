<template>
  <article class="time-line">
    <template v-for="item in lineDotList">
      <div
        v-if="item.topDot"
        :key="item.topDot.dotNumber + '-dot'"
        class="dot">
        {{item.topDot.dotNumber}}
        <TimeLineTooltip :time="item.topDot.dotTime" :step="step" class="time-line-tooltip"/>
      </div>
      <div
        class="line"
        v-bind:key="item.dot + '-line'"
        :style="{height: item.lineLength + 'px'}">
        <span
          class="space"
          v-for="space in item.spaceList"
          :key="space.timePointStr"
          :style="{'margin-top': space.height + 'px'}">
          <span class="text">{{space.timePointStr}}</span>
        </span>
      </div>
      <div
        v-if="item.bottomDot"
        v-bind:key="item.bottomDot.dotNumber + '-dot'"
        class="dot">
        {{item.bottomDot.dotNumber}}
        <TimeLineTooltip :time="item.bottomDot.dotTime" :step="step" class="time-line-tooltip"/>
      </div>
    </template>
  </article>
</template>

<script>
/**
 * @file TimeLine 组件
 *
 * - 起始时间和结束时间的点单独设置
 * - 
 */
import TimeLineTooltip from './TimeLineTooltip';

export default {
  name: 'TimeLine',
  props: {
    // 开始时间年份
    startTime: {
      tyle: Number,
      default: -1600
    },
    // 结束时间年份
    endTime: {
      type: Number,
      default: new Date().getFullYear()
    },
    // 大节点，默认 100 年
    step: {
      type: Number,
      default: 100
    },
    // 小节点，默认 10 年，注意小节点需要能整除大节点
    space: {
      type: Number,
      default: 10
    },
    // 比例，一年/像素高度
    scale: {
      type: Number,
      default: 10
    },
    // 大节点 hover 时是否展示 Tooltip
    isShowTooltip: {
      type: Boolean,
      default: true
    }
  },
  components: {
    TimeLineTooltip
  },
  data() {
    // 首位圈
    const startTime = this.startTime;
    const endTime = this.endTime;
    const step = this.step;
    const space = this.space;
    const lineDotList = [];
    let dotTime = startTime;

    while (dotTime < endTime) {
      const dotTimeForStepRemainder = dotTime % step;

      let topDot = null;
      let bottomDot = null;
      let lineLength;
      let time;
      let bottomTime;

      // 大圈起始位
      if (dotTime === startTime && startTime % step === 0) {
        topDot = {
          dotTime: startTime,
          dotNumber: startTime / step
        };
      }
      
      if (dotTime + step < endTime) {
        time = dotTimeForStepRemainder === 0 ? step : Math.abs(dotTimeForStepRemainder);
      }
      else {
        time = endTime - dotTime;
      }
      lineLength = time * space;

      if (dotTimeForStepRemainder === 0) {
        bottomTime = dotTime + step;
      }
      else if (dotTimeForStepRemainder < 0) {
        bottomTime = dotTime - dotTimeForStepRemainder;
      }
      else {
        bottomTime = dotTime + (step - dotTimeForStepRemainder);
      }

      if (bottomTime <= endTime) {
        bottomDot = {
          dotTime: bottomTime,
          dotNumber: bottomTime / step
        }
      }

      lineDotList.push({
        topDot,
        lineLength,
        spaceList: this.createSpaceList(dotTime, dotTime + step < endTime ? bottomTime : endTime),
        bottomDot
      });

      dotTime = bottomTime;
    }
    console.log(lineDotList);

    return {
      lineDotList,
      // startHeight,
      // startSpaceList: this.createSpaceList(this.startTime, step, true),
      // endHeight: endHeight * 10,
      // endSpaceList: this.createSpaceList(this.endTime - this.endTime % step, step),
    }
  },
  methods: {

    /**
     * 创建间隔标记
     *
     * @param {Number} fromTime 起始
     * @param {Number} toTime 结束
     */
    createSpaceList(fromTime, toTime) {
      const arr = [];
      const space = this.space;
      const scale = this.scale;

      while (fromTime + space < toTime) {
        const fromTimeForSpaceRemainder = fromTime % space;
        let time;
        let timePoint;
        if (fromTime + space < toTime) {
          if (fromTimeForSpaceRemainder === 0) {
            time = space;
          }
          else if (fromTimeForSpaceRemainder < 0) {
            time = Math.abs(fromTimeForSpaceRemainder);
          }
          else {
            time = fromTimeForSpaceRemainder;
          }
        }
        else {
          time = toTime - fromTime;
        }
        // 减一是刻度 Dom 占的高度
        const height = time * scale - 1;

        if (fromTimeForSpaceRemainder === 0) {
          timePoint = fromTime + space;
        }
        else if (fromTimeForSpaceRemainder < 0) {
          timePoint = fromTime - fromTimeForSpaceRemainder;
        }
        else {
          timePoint = fromTime + ( space - fromTimeForSpaceRemainder);
        }

        arr.push({
          timePoint,
          timePointStr: timePoint < 0 ? `${-timePoint}BC` : timePoint,
          height
        });

        fromTime = timePoint;
      }
      return arr;
    }
  }
}
</script>

<style scoped lang="less">
// dot 直径 26px，
.time-line {
  @color: #595a5f;
  display: flex;
  flex-direction: column;
  width: 28px;
  margin: 20px 40px;
  font-size: 12px;

  .start,
  .end {
    position: relative;
    width: 14px;
    height: 14px;
    border: 2px solid @color;
    border-radius: 14px;
  }

  .line {
    align-self: flex-end;
    height: 1000px;
    width: 3px;
    margin-top: -12.5px;
    text-align: right;
    background: @color;
    .space {
      position: relative;
      align-self: flex-end;
      padding-right: 3px;
      display: block;
      margin-top: 99px;
      height: 1px;
      border-right: 5px solid #2c3e50;
      text-align: right;
      .text {
        position: absolute;
        top: -7px;
        right: 5px;
      }
    }
  }

  .dot {
    position: relative;
    z-index: 1;
    box-sizing: border-box;
    width: 25px;
    height: 25px;
    margin-top: -12.5px;
    border: 1px solid @color;
    border-radius: 13px;
    padding: 2px;
    background-color: #83acae;
    background-clip: content-box;
    color: #fff;
    text-align: center;
    line-height: 20px;
  }
  .start,
  .end,
  .dot {
    &:hover .time-line-tooltip {
      display: block;
    }
  }
}
</style>
