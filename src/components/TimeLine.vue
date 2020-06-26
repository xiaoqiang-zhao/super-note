<template>
  <div class="time-line">
    <span class="start">
      <TimeLineTooltip :time="startTime" :step="step" class="time-line-tooltip"/>
    </span>
    <span class="line" v-bind:style="{height: startHeight + 'px'}"></span>
    <template v-for="item in lineDotList">
      <span class="dot" v-bind:key="item.dot + '-dot'">
        {{item.dot}}
        <TimeLineTooltip :time="item.dotTime" :step="step" class="time-line-tooltip"/>
      </span>
      <span v-if="item !== lineDotList[lineDotList.length - 1]" class="line" v-bind:key="item.dot + '-line'"></span>
    </template>
    <span class="line" v-bind:style="{height: endHeight + 'px'}"></span>
    <span class="end">
      <TimeLineTooltip :time="endTime" :step="step" class="time-line-tooltip"/>
    </span>
  </div>
</template>

<script>
import TimeLineTooltip from '@/components/TimeLineTooltip';

export default {
  name: 'TimeLine',
  props: {
    startTime: {
      tyle: Number,
      default: -841
    },
    endTime: {
      type: Number,
      default: new Date().getFullYear()
    },
    step: {
      type: Number,
      default: 100
    },
    isShowTooltip: {
      type: Boolean,
      default: true
    }
  },
  components: {
    TimeLineTooltip
  },
  data() {
    const endTime = this.endTime;
    const step = this.step;
    let lineDotList = [];

    // 大圈起始位
    const startTimeRemainder = this.startTime % step;
    let dotTime = this.startTime;
    let length = Math.abs(startTimeRemainder);
    let startHeight = length;
    if (startTimeRemainder < 0) {
      dotTime += length;
    }
    else if (startTimeRemainder > 0) {
      dotTime += (step - length);
    }
    else {
      dotTime += step;
      startHeight = step;
    }

    for (; dotTime < endTime; dotTime += step) {
      lineDotList.push({
        dotTime,
        dot: dotTime / step
      });
    }

    let endHeight;
    const endTimeRemainder = Math.abs(this.endTime % step);
    endHeight = endTimeRemainder ? endTimeRemainder : step;

    return {
      lineDotList,
      startHeight,
      endHeight
    }
  }
}
</script>

<style scoped lang="less">
.time-line {
  @color: #595a5f;
  width: 50px;
  > span {
    display: block;
    margin: 0 auto;
  }

  .start,
  .end {
    position: relative;
    width: 14px;
    height: 14px;
    border: 2px solid @color;
    border-radius: 14px;
  }

  .line {
    display: block;
    height: 87px;
    width: 3px;
    background: @color;
  }

  .dot {
    position: relative;
    z-index: 1;
    box-sizing: border-box;
    width: 26px;
    height: 26px;
    // margin: -13px auto -13px auto;
    border: 1px solid @color;
    border-radius: 13px;
    padding: 2px;
    background-color: #83acae;
    background-clip: content-box;
    font-size: 12px;
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
