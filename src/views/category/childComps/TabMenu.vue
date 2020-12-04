<template>
  <scroll id="tab-menu" :pull-up-load="true" :probe-type="3" ref="scroll">
    <div class="menu-list">
      <div class="menu-list-item"
           :class="{active: index===currentIndex}"
           v-for="(item, index) in categories"
           :key="index"
           @click="itemClick(index)">
        {{item.title}}
      </div>
    </div>
  </scroll>
</template>

<script>
  import Scroll from 'components/common/scroll/Scroll'

	export default {
		name: "TabMenu",
    components: {
		  Scroll
    },
    props: {
		  categories: Array
    },
    data() {
		  return {
		    currentIndex: 0
      }
    },
    methods: {
		  itemClick(index) {
        this.currentIndex = index
        this.$emit('selectItem', index)
      },
    
    },
    watch:{
      categories () {
        this.$nextTick(function(){
          this.$refs.scroll.scroll.refresh()
 })//用来监听v-for中的数据渲染完成 完成后调用refresh1函数
      }
    }
	}
</script>

<style scoped>
  #tab-menu {
    background-color: #f6f6f6;
    height: calc(100% - 44px-49px);
    width: 100px;
    box-sizing: border-box;
    overflow: hidden;
  }

  .menu-list-item {
    height: 45px;
    line-height: 45px;
    text-align: center;
    font-size: 14px;
  }

  .menu-list-item.active {
    font-weight: 700;
    color: var(--color-high-text);
    background-color: #fff;
    border-left: 3px solid var(--color-high-text);
  }
</style>
