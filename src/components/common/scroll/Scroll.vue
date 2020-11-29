<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
  name:"Scroll",
  props:{
    probeType:{
      type:Number,
      default:0
    },
    pullUpLoad:{
      type:Boolean,
      default:false
    },
  },
  data() {
    return {
      scroll:null,
      
    }
  },
  mounted() {//创建betterscroll对象 
    this.scroll=new BScroll(this.$refs.wrapper,{
      click:true,
      probeType:this.probeType,
      pullUpLoad: this.pullUpLoad
    }),
    this.scroll.scrollTo()
    //监听滚动位置
    this.scroll.on('scroll',(position)=>{
      this.$emit('scroll',position)
    })
    
    //上拉加载更多
    this.scroll.on('pullingUp',()=>{
      this.$emit('pullingUp')
    })
  },
  methods: {
    finishPullUp(){
      this.scroll.finishPullUp()
    },
    refresh(){
      this.scroll && this.scroll.refresh()
    },
  },
}
</script>

<style scoped>

</style>