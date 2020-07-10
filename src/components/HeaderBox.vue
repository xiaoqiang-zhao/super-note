<template>
  <section class="header-box">
    <div class="item-container">
      <div class="time-line" @click="changeScale">
        时间轴
      </div>
      <div class="dynasty">
        <div class="title">政权与朝代</div>
        <div class="items">
          <div class="china">
            中国
          </div>
          <div class="europe">
            欧洲
          </div>
        </div>
      </div>
      <div class="everything">
        <div class="title">包罗万象</div>
        <div class="items">
          <div class="persion">人</div>
          <div class="book">书</div>
          <div class="science-technology">科技</div>
          <div class="building">建筑</div>
        </div>
      </div>
    </div>
    <div class="placeholder"></div>
  </section>
</template>

<script>
export default {
  props: {
    // 比例，一年/像素高度
    scale: {
      type: Number,
      default: 10
    },
  },
  data() {
    return {};
  },
  methods: {
    
    /**
     * 改变比例尺，时间与页面尺寸的比例在 1:1 和 1:10 之间切换
     */
    changeScale() {
      // this.$store.dispatch('changeScale', this.scale === 1 ? 10 : 1);
      this.$store.commit('setScale', this.scale === 1 ? 10 : 1);
    }
  }
}
</script>

<style lang="less" scoped>
.header-box {
  position: relative;
  margin: 10px 10px 20px 10px;
  color: #fff;

  .item-container {
    position: fixed;
    z-index: 3;
    top: 10px;
    width: 100%;
    display: flex;
    border: 1px solid #285943;
    background: #285943;
    .time-line {
      flex: 0 0 70px;
      padding: 10px;
      background: #30A9DE;
    }
    .dynasty {
      flex: 0 0 180px;
      margin-right: 1px;
      .title {
        background-image: linear-gradient(to right, #E53A40 , #27309A);
      }
      .items {
        display: flex;
        div {
          flex: 1;
        }
        .china {
          background: #E53A40;
        }
        .europe {
          background: #27309A;
        }
      }
    }
    .everything {
      flex: 1;
      .title {
        background-image: linear-gradient(to right, #6C49B8, #4F86C6, #4FB0C6, #379392);
      }
      .items {
        display: flex;
        div {
          flex: 1;
        }
        .persion {
          background: #6C49B8;
        }
        .book {
          background: #4F86C6;
        }
        .science-technology {
          background: #4FB0C6;
        }
        .building {
          background: #379392;
        }
      }
    }
  }

  .placeholder {
    height: 43px;
  }
}
</style>