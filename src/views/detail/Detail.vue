<template>
  <div id="detail">
    <detail-nav-bar @titleClick="titleClick" ref="nav"/>
    <scroll class="content" :pull-up-load="true" :probe-type="3" ref="scroll" @scroll="contentScroll">
    <detail-swiper :top-images="topImages"/>
    <detail-base-info :goods="goods"/>
    <detail-shop-info :shop="shop"/>
    <detail-images-info :images-info="imagesInfo" />
    <detail-param-info ref="params" :param-info="paramInfo"/>
    <detail-comment-info ref="comment" :comment-info="commentInfo" />
    </scroll>
    <detail-bottom-bar @addToCart="addToCart"/>
    <back-top @click.native="backClick" v-show="isShowBackTop"/>
    
  </div>
</template>

<script>
import DetailNavBar from './detailComps/DetailNavBar.vue'
import {getDetail,Goods,Shop,GoodsParams,getRecommend} from 'network/detail.js'
import DetailSwiper from './detailComps/DetailSwiper.vue'
import DetailBaseInfo from './detailComps/DetailBaseInfo.vue'
import DetailShopInfo from './detailComps/DetailShopInfo.vue'
import Scroll from '../../components/common/scroll/Scroll.vue'
import DetailImagesInfo from './detailComps/DetailImagesInfo.vue'
import DetailParamInfo from './detailComps/DetailParamInfo.vue'
import DetailCommentInfo from './detailComps/DetailCommentInfo.vue'
import DetailBottomBar from './detailComps/DetailBottomBar.vue'
import {backTopMixin} from 'common/mixin'



export default {
  components: {DetailNavBar, DetailSwiper, DetailBaseInfo, DetailShopInfo, Scroll, DetailImagesInfo, DetailParamInfo, DetailCommentInfo, DetailBottomBar,     },
  name:'Detail',
  data() {
    return {
      iid:null,
      topImages:[],
      goods:{},
      shop:{},
      imagesInfo:{},
      paramInfo:{},
      commentInfo:{},
      themeTopYs:[],
      currentIndex:0,
      
    }
  },
  mixins:[backTopMixin],
  created() {
    //保存输入的iid
    this.iid=this.$route.params.iid
    //根据iid请求详细数据
    getDetail(this.iid).then(res=>{
      const data=res.result
      //获取轮播图图片
      this.topImages=data.itemInfo.topImages
      //获取商品信息
      this.goods=new Goods(data.itemInfo,data.columns,data.shopInfo.services)
      //获取店铺信息
      this.shop=new Shop(data.shopInfo)
      //获取商品详细信息
      this.imagesInfo=data.detailInfo
      //获取参数
      this.paramInfo=new GoodsParams(data.itemParams.info,data.itemParams.rule)
      //获取评论
     if (data.rate.cRate !==0) {
       this.commentInfo=data.rate.list[0]
     }
    })
    //图片没加载完 得不到正确的数据
    // this.$nextTick(()=>{
    //   this.themeTopYs=[]
    //   this.themeTopYs.push(0);
    //   this.themeTopYs.push(this.$refs.params.$el.offsetTop);
    //   this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
    //   console.log(this.themeTopYs)
    // })
   
  },
  methods: {
     debounce(func,delay){//防抖 fnc是要执行的函数 把他传过来 delay到底等多久 
      let timer =null
      return function(...args){
        if(timer) clearTimeout(timer)
        timer=setTimeout(()=>{
          func.apply(this,args)
        },delay)  
      }
     },
    // detailImageLoad(){
    //   this.$refs.scroll.refresh()
    // }
    titleClick(index){
      this.$refs.scroll.scroll.scrollTo(0,-this.themeTopYs[index],100)//点击按钮跳转到对应的位置
    },
     
    contentScroll(position){
      //获取y值
      const positionY=-position.y
      //进行对比
      let length=this.themeTopYs.length
      for (let i = 0; i < length; i++) {
        if (this.currentIndex !== i &&(i<length-1 && positionY>=this.themeTopYs[i] && positionY<this.themeTopYs[i+1])||(
          i===length-1 && positionY>=this.themeTopYs[i]
        )) {
          this.currentIndex=i
          this.$refs.nav.currentIndex=this.currentIndex
        }
      }
      this.demo(position)
    } ,
    addToCart(){
      //获取商品信息添加到购物车
      const product={}
      product.image=this.topImages[0];
      product.title=this.goods.title;
      product.desc=this.goods.desc;
      product.price=this.goods.realPrice;
      product.iid=this.iid;
      //添加到购物车
      this.$store.dispatch('addCart',product).then(res=>{
        // this.show=true;
        // this.message=res;
        // setTimeout(()=>{
        //   this.show=false;
        //   this.message=''
        // },1500)
        this.$toast.show(res,2000)
      })
    },
  },
  mounted() {
    const refresh = this.debounce(this.$refs.scroll.refresh,500)
     this.$bus.$on('detailImageLoad',()=>{
      refresh()//加载完所有图片 再刷新更新高度 达到目的
          this.themeTopYs=[]
      this.themeTopYs.push(0);
      this.themeTopYs.push(this.$refs.params.$el.offsetTop);
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
      
    })
     
  },
 
}
</script>

<style scoped>
#detail{
  position: relative;
  z-index: 9;
  background-color: #fff;
  height: 100vh;
}
.content{
  height: calc(100% - 44px);
 overflow: hidden; 
}
</style>