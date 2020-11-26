<template>
  <swiper>
      <swiper-item v-for="(item,index) in banners" :key="index">
        <a :href="item.link">
          <img :src="item.image" alt="">
        </a>
      </swiper-item>
    </swiper>
</template>

<script>
import Swiper from 'components/common/swiper/Swiper.vue'
import SwiperItem from 'components/common/swiper/SwiperItem.vue'
export default {
  name:"HomeSwiper",
  components:{
        Swiper,
    SwiperItem,
  },
  props:{
    banners:{
      type: Array,
      default(){
        return[]
      }
    }
  }
}
</script>

<style scoped>

</style>