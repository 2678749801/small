<template>
  <div class="tab-bar-item" @click="itemClick">
    <div v-if="!isActive">
      <slot name="item-icon"></slot>
    </div>
    <div v-else>
      <slot name="item-icon-active"></slot>
    </div>
    <div :style="activeStyle">
      <slot name="item-text"></slot>
    </div>
  </div>
</template>

<script scoped>
export default {
  name: "TabBarItem",
  props: {
    path: String,
    activeColor: {
      type: String,
      default: "red", //默认红色
    },
  },
  data() {
    return {
      // isActive:true
    };
  },
  computed: {
    isActive() {
      return this.$route.path.indexOf(this.path) !== -1; //判断当前的path和路由里的path想不想等  等于-1的时候 表示没有找到 !== -1 表示找到的了  值为true
    },
    activeStyle() {
      return this.isActive
        ? {
            color: this.activeColor,
          }
        : {};
    },
  },
  methods: {
    itemClick() {
      this.$router.replace(this.path);
    },
  },
};
</script>

<style scoped>
.tab-bar-item {
  flex: 1;
  text-align: center;
  height: 49px;
  font-size: 14px;
}

.tab-bar-item img {
  width: 24px;
  height: 24px;
  margin-top: 3px;
  vertical-align: middle;
  margin-bottom: 2px;
}
</style>
