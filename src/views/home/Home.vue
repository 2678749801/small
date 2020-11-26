<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <home-swiper :banners="banners"></home-swiper>
    <home-recommed-view :recommends="recommends"/>
    <feature-view></feature-view>
    <tab-control :titles="titles" class="tab-control"></tab-control>
    <ul><li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li>33</li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li>33</li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li>55</li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li>88</li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li>99</li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li></ul>
  </div>
</template>

<script>
import NavBar from '../../components/common/navbar/NavBar.vue'
import {getHomeMultidata} from 'network/home'

import HomeSwiper from './childComps/HomeSwiper.vue'
import HomeRecommedView from './childComps/HomeRecommedView.vue'
import FeatureView from './childComps/FeatureView.vue'
import TabControl from '../../components/content/tabcontrol/TabControl.vue'
export default {
  name:'Home',
  components: { 
    NavBar,
    HomeSwiper,
    HomeRecommedView,
    FeatureView,
    TabControl,
    },
    data() {
      return {
        banners:[],
        recommends:[],
        titles:['流行','新款','潮流']
      }
    },
  created() {
    //请求多个数据
    getHomeMultidata().then(res=>{
      this.banners=res.data.banner.list;
      this.recommends=res.data.recommend.list;
    })
  },
}
</script>

<style scoped>
#home{
padding-top: 44px;
}
.home-nav{
  background-color: var(--color-tint);
  color: #fff;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9;
  
}
.tab-control{
  position: sticky;
  top: 44px;
  background-color: #fff;
}
</style>