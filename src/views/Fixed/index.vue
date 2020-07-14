<template>
<section class="fixed">
  <h3>头锁定和侧列锁定</h3>
  <!-- Step one -->
  <div>
    <p>
      锁定只有两个思路，position fixed 和 分块滚动。position fixed 侧列锁定时，如果高度大于一屏，超出部分看不到； 另外 position fixed 只能用于页面级，不够灵活。如果同时存在头锁定和列锁定，那么只能采取分块滚动的方式来实现了，还要通过 js 来同步滚动条的位置。
    </p>
    <p>
      第一步、要做的就是用 flex 做一个三栏布局:
    </p>
  </div>
  
  <section class="fixed-layout-container1">
    <div class="left">左侧栏</div>
    <div class="middle">中间</div>
    <div class="right">右侧栏</div>
  </section>

  <div>
    Less:
    <pre>
  .fixed-layout-container1 {
    display: flex;
    width: 800px;
    height: 300px;
    margin: 0 auto;
    border: solid 1px #333;
    background: #666;
    text-align: center;
    .left,
    .right {
      flex: 0 0 100px;
      background: yellowgreen;
    }
    .middle {
      flex: 1;
      background: whitesmoke;
    }
  }      
    </pre>
  </div>
  <!-- Step two -->
  <div>
    <p>第二步、侧栏头部区域固定内容上下滚动，中间头部区域上下固定左右可滚动内容区可上下左右滚动</p>
  </div>
  <section class="fixed-layout-container2">
    <div class="left">
      <header>Header</header>
      <section>
        <div class="content-item" v-for="item in rows" :key="`left-${item}`">C{{item}}</div>
      </section>
    </div>
    <div class="middle">
      <header>
        <div class="content-item" v-for="item in columns" :key="`middle-header-${item}`">
          H{{item}}
        </div>
      </header>
      <section>
        <div v-for="row in rows" :key="`middle-${row}`">
          <div class="content-item" v-for="column in columns" :key="`middle-header-${column}`">
            C{{row}}H{{column}}
          </div>
        </div>
      </section>
    </div>
    <div class="right">
      <header>Header</header>
      <section>
        <div class="content-item" v-for="item in rows" :key="`right-${item}`">C{{item}}</div>
      </section>
    </div>
  </section>
  <div>
    <p>在 flex 分割出的三列中，需要将中间一列设置最大宽度，这样才能限制水平方向的内容出现在预定的范围内。</p>
  </div>
  <!-- Step three -->
  <div>
    <p>第三步、同步滚动条位置</p>
  </div>
  <section class="fixed-layout-container3" ref="fixedLayoutContainer">
    <div class="left">
      <header>Header</header>
      <section ref="fixedLayoutLeftContent">
        <div class="content-item" v-for="item in rows" :key="`left-${item}`">C{{item}}</div>
      </section>
    </div>
    <div class="middle">
      <header ref="fixedLayoutMiddleHeader">
        <div class="content-item" v-for="item in columns" :key="`middle-header-${item}`">
          H{{item}}
        </div>
      </header>
      <section ref="fixedLayoutMiddleContent">
        <div v-for="row in rows" :key="`middle-${row}`">
          <div class="content-item" v-for="column in columns" :key="`middle-header-${column}`">
            C{{row}}H{{column}}
          </div>
        </div>
      </section>
    </div>
    <div class="right">
      <header>Header</header>
      <section ref="fixedLayoutRightContent">
        <div class="content-item" v-for="item in rows" :key="`right-${item}`">C{{item}}</div>
      </section>
    </div>
  </section>
  <div>
    <p>
      技术点分析:
    </p>
    <p>
      1、只做 chrome 的兼容，通过 wheel 事件，鼠标横向和纵向通过 event.wheelDeltaX 和 event.wheelDeltaY 来判断，再通过 event.preventDefault() 来屏蔽默认事件。
    </p>
    <pre>
this.$refs.fixedLayoutContainer.addEventListener('wheel', event => {
  console.log({
    wheelDeltaX: event.wheelDeltaX,
    wheelDeltaY: event.wheelDeltaY
  });
  event.preventDefault();
});
    </pre>
    <p>
      2、控制位置有两种方式，一、margin-top 与 margin-left 属性控制；二、scrollTo 方法。
      scrollTo 从稳定性和副作用方面都是比较好的。
      为了保证滚动位置的统一性，考虑一处监听，向不同区域传递位置。
    </p>
    <pre>
mounted() {
  const thisObj = this;
  const middleHeader = thisObj.$refs.fixedLayoutMiddleHeader;
  const middleContent = thisObj.$refs.fixedLayoutMiddleContent;
  const maxScrollLeft = middleContent.scrollWidth - middleContent.offsetWidth;
  const maxScrollTop = middleContent.scrollHeight - middleContent.offsetHeight;
  this.$refs.fixedLayoutContainer.addEventListener('wheel', event => {

  // 横向滚动，中间部分的头部和内容滚动
  if (event.wheelDeltaX) {
    let scrollLeft = this.scrollLeft - (event.wheelDeltaX / 3)
    this.scrollLeft = scrollLeft > maxScrollLeft ? maxScrollLeft : scrollLeft;
    middleHeader.scrollTo(this.scrollLeft, 0);
    middleContent.scrollTo(this.scrollLeft - 1, this.scrollTop);
  }
  // 纵向滚动，左中右的内容区
  if (event.wheelDeltaX) {
    let scrollTop = this.scrollTop - (event.wheelDeltaY / 3);
    this.scrollTop = scrollTop > maxScrollTop ? maxScrollTop : scrollTop;
    middleContent.scrollTo(this.scrollLeft, this.scrollTop - 1);
    thisObj.$refs.fixedLayoutLeftContent.scrollTo(this.scrollLeft, this.scrollTop - 1);
    thisObj.$refs.fixedLayoutRightContent.scrollTo(this.scrollLeft, this.scrollTop - 1);
  }

  event.preventDefault();
});
    </pre>
    <p>
      3、剩下的就是把滚动条隐藏掉，然后在垂直滚动的时候出现右侧内容区滚动条，水平滚动的时候出现中间内容区滚动条。有
    </p>
  </div>
</section>
</template>

<script>

export default {
  data() {
    const columns = [];
    const rows = [];
    for (let i = 1; i < 11; i++) {
      columns.push(i);
    }
    for (let i = 1; i < 16; i++) {
      rows.push(i);
    }
    return {
      columns,
      rows,
      scrollLeft: 0,
      scrollTop: 0
    }
  },
  mounted() {
    const thisObj = this;
    const middleHeader = thisObj.$refs.fixedLayoutMiddleHeader;
    const middleContent = thisObj.$refs.fixedLayoutMiddleContent;
    const maxScrollLeft = middleContent.scrollWidth - middleContent.offsetWidth;
    const maxScrollTop = middleContent.scrollHeight - middleContent.offsetHeight;
    this.$refs.fixedLayoutContainer.addEventListener('wheel', event => {

      // 横向滚动，中间部分的头部和内容滚动
      if (event.wheelDeltaX) {
        let scrollLeft = this.scrollLeft - (event.wheelDeltaX / 3)
        this.scrollLeft = scrollLeft > maxScrollLeft ? maxScrollLeft : scrollLeft;
        middleHeader.scrollTo(this.scrollLeft, 0);
        middleContent.scrollTo(this.scrollLeft - 1, this.scrollTop);
      }
      // 纵向滚动，左中右的内容区
      if (event.wheelDeltaX) {
        let scrollTop = this.scrollTop - (event.wheelDeltaY / 3);
        this.scrollTop = scrollTop > maxScrollTop ? maxScrollTop : scrollTop;
        middleContent.scrollTo(this.scrollLeft, this.scrollTop - 1);
        thisObj.$refs.fixedLayoutLeftContent.scrollTo(this.scrollLeft, this.scrollTop - 1);
        thisObj.$refs.fixedLayoutRightContent.scrollTo(this.scrollLeft, this.scrollTop - 1);
      }

      event.preventDefault();
    });
  }
}
</script>

<style lang="less">
.fixed {
  margin: 10px;
  h3 {
    text-align: center;
  }
  .fixed-layout-container1 {
    display: flex;
    width: 800px;
    height: 300px;
    margin: 0 auto;
    border: solid 1px #333;
    background: #666;
    text-align: center;
    .left,
    .right {
      flex: 0 0 100px;
      background: yellowgreen;
    }
    .middle {
      flex: 1;
      background: whitesmoke;
    }
  }
  .fixed-layout-container2 {
    display: flex;
    width: 800px;
    height: 300px;
    margin: 0 auto;
    border: solid 1px #333;
    background: #666;
    text-align: center;
    .left,
    .right {
      flex: 0 0 100px;
      background: yellowgreen;
    }
    .middle {
      flex: 1;
      background: whitesmoke;
      > header {
        display: flex;
        flex-direction: row;
        max-width: 590px;
        overflow: auto;
      }
      > section {
        max-width: 590px;
        > div {
          display: flex;
        }
      }
    }
    .left,
    .right,
    .middle {
      @header-height: 30px;
      display: flex;
      flex-direction: column;
      > header {
        flex: 0 0 @header-height;
        line-height: @header-height;
        margin: 5px;
        background: #4F86C6;
        text-align: center;
      }
      > section {
        flex: 1;
        margin: 5px;
        overflow: auto;
        background: #4FB0C6;
      }
    }

    .content-item {
      margin: 5px;
      min-width: 80px;
      line-height: 20px;
      color: #fff;
      background: #379392;
    }
  }
  .fixed-layout-container3 {
    display: flex;
    width: 800px;
    height: 300px;
    margin: 0 auto;
    border: solid 1px #333;
    background: #666;
    text-align: center;
    .left,
    .right {
      flex: 0 0 100px;
      background: yellowgreen;
    }
    .middle {
      flex: 1;
      background: whitesmoke;
      > header {
        display: flex;
        flex-direction: row;
        max-width: 590px;
        overflow: auto;
      }
      > section {
        max-width: 590px;
        > div {
          display: flex;
          .content-item {
            margin-bottom: 0;
          }
        }
      }
    }
    .left,
    .right,
    .middle {
      @header-height: 30px;
      display: flex;
      flex-direction: column;
      > header {
        flex: 0 0 @header-height;
        line-height: @header-height;
        margin: 5px;
        overflow: hidden;
        background: #4F86C6;
        text-align: center;
      }
      > section {
        flex: 1;
        margin: 5px;
        padding-bottom: 5px;
        overflow: hidden;
        background: #4FB0C6;
      }
    }

    .content-item {
      margin: 5px;
      min-width: 80px;
      line-height: 20px;
      color: #fff;
      background: #379392;
    }
  }
}
</style>
