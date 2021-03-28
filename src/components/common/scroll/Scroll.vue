<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";
export default {
  props: {
    probeType: {
      type: Number,
      default: 0, //0不侦测实时位置 1也不真诚 2在手指滚动的过程中侦测 滚动的惯性并不侦测 3只要是滚动都侦测
    },
    pullUpLoad: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      scroll: null,
    };
  },
  mounted() {
    //创建betterscroll对象
    (this.scroll = new BScroll(this.$refs.wrapper, {
      click: true, //默认不监听按钮的点击 设置为true可以监听点击
      probeType: this.probeType,
      pullUpLoad: this.pullUpLoad,
    })),
      this.scroll.scrollTo();
    //监听滚动位置 用于判断是否显示backtop
    this.scroll.on("scroll", (position) => {
      this.$emit("scroll", position);
    });

    //上拉加载更多
    this.scroll.on("pullingUp", () => {
      this.$emit("pullingUp");
    });
  },
  methods: {
    finishPullUp() {
      this.scroll.finishPullUp();
    },
    refresh() {
      this.scroll && this.scroll.refresh();
    },
    getScrollY() {
      return this.scroll ? this.scroll.y : 0;
    },
  },
};
</script>

<style scoped>
</style>