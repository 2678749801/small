<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <tab-control 
    :titles="titles" 
    class="tab-control" 
    @tabClick="tabClick" 
    ref="tabControl1" 
    v-show="isTabFixed"
    ></tab-control>
    <scroll class="content" 
    ref="scroll" 
    :probeType="3"
    @scroll="contentScroll"
    :pull-up-load="true"
    @pullingUp="loadMore">
        <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"></home-swiper>
    <home-recommed-view :recommends="recommends"/>
    <feature-view></feature-view>
    <tab-control :titles="titles"  @tabClick="tabClick" ref="tabControl2" ></tab-control>
    <goods-list :goods="goods[currentType].list" />
    
    </scroll>
  <back-top @click.native="backClick" v-show="isShowBackTop"/>
  </div>
</template>

<script>
import NavBar from '../../components/common/navbar/NavBar.vue'
import {getHomeMultidata,getHomeGoods} from 'network/home'

import HomeSwiper from './childComps/HomeSwiper.vue'
import HomeRecommedView from './childComps/HomeRecommedView.vue'
import FeatureView from './childComps/FeatureView.vue'
import TabControl from '../../components/content/tabcontrol/TabControl.vue'
import GoodsList from '../../components/content/goods/GoodsList.vue'
import Scroll from '../../components/common/scroll/Scroll.vue'
import BackTop from '../../components/common/backtop/BackTop..vue'
export default {
  name:'Home',
  components: { 
    NavBar,
    HomeSwiper,
    HomeRecommedView,
    FeatureView,
    TabControl,
    GoodsList,
    Scroll,
    BackTop,
    },
    data() {
      return {
        banners:[],
        recommends:[],
        titles:['流行','新款','精选'],
        goods:{
          'pop':{page:0,list:[]},
          'new':{page:0,list:[]},
          'sell':{page:0,list:[]},
        },
        currentType:'pop',
        isShowBackTop:false,
        tabOffsetTop:0,
        isTabFixed:false,
      }
    },
  created() {
    //请求多个数据
    this.getHomeMultidata()//created保留主要逻辑 具体逻辑放到methods里
    this.getHomeGoods('pop')//一次请求三个数据
    this.getHomeGoods('new')
    this.getHomeGoods('sell')
    //3 监听图片加载完成 
    //4赋值
    
  },
  methods: {
    getHomeMultidata(){
       getHomeMultidata().then(res=>{
      this.banners=res.data.banner.list;
      this.recommends=res.data.recommend.list;
    })
    },
     getHomeGoods(type){
       const page=this.goods[type].page+1
       getHomeGoods(type,page).then(res=>{
        this.goods[type].list.push(...res.data.list)//将请求到的数据放进list里
        this.goods[type].page+=1
        this.$refs.scroll.finishPullUp()
    })
     },
     debounce(func,delay){//防抖 fnc是要执行的函数 把他传过来 delay到底等多久 
      let timer =null
      return function(...args){
        if(timer) clearTimeout(timer)
        timer=setTimeout(()=>{
          func.apply(this,args)
        },delay)  
      }
     
     },
      swiperImageLoad(){
        //获取tabcontrol 所有的组件都有￥el 用来获取组件的元素
        
        this.tabOffsetTop=this.$refs.tabControl2.$el.offsetTop
      },
     tabClick(index){
      switch (index) {
        case 0:
          this.currentType='pop'
          break
        case 1:
          this.currentType='new'
          break
        case 2:
          this.currentType='sell'

      }
      this.$refs.tabControl1.currentIndex=index
      this.$refs.tabControl2.currentIndex=index
     },
     backClick(){//父访问子 用子组件的功能 
       this.$refs.scroll.scroll.scrollTo(0,0,500)
     },
     contentScroll(position){
       //判断backtop是否显示
      this.isShowBackTop =-(position.y)>1000
      //觉定他把control是否吸顶 （position fixed
      this.isTabFixed=(-position.y)>this.tabOffsetTop
     },
    loadMore(){//加载更多
      this.getHomeGoods(this.currentType)
    }
  },
  mounted() {
    //图片加载完成的事件监听
    const refresh = this.debounce(this.$refs.scroll.refresh,500)
     this.$bus.$on('itemImageLoad',()=>{
      refresh()//加载完所有图片 再刷新更新高度 达到目的
    })
    
  },
}
</script>

<style scoped>
#home{
/* padding-top: 44px; */
height: 100vh;
position: relative;
}
.home-nav{
  background-color: var(--color-tint);
  color: #fff;
  /* position: fixed;
  left: 0;
  right: 0;
  top: 0;原生时 让不跟他一起滚动
  z-index: 9; */
  
}
/* .tab-control{
  position: sticky;
  top: 44px;
  background-color: #fff;
  z-index: 9; 
} */
.content{
  height: calc(100% - 93px);
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 49px;
}
.tab-control{
  position: relative;
  z-index: 9;
  background-color: #fff;
}
</style>