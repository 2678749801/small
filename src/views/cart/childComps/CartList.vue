<template>
    <div class="cart-list">
    <scroll class="content" ref="scroll" :pull-up-load=true>
    <cart-list-item v-for="item in cartList" :key="item.iid" :item-info="item"></cart-list-item>
  
  </scroll>
  </div>
</template>

<script>
  import Scroll from 'components/common/scroll/Scroll'
  import CartListItem from './CartListItem'
  import { mapGetters } from 'vuex'
	export default {
		name: "CartList",
    components: {
		  Scroll, CartListItem
    },
    computed:{
      ...mapGetters(['cartList'])
    }
	}
</script>

<style scoped>
.cart-list{
  height: calc(100% - 44px - 49px);
}
.content{
  height: 100%; 
  overflow: hidden;
}
</style>
