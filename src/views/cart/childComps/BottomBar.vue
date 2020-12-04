<template>
  <div class="bottom-menu">
    <CheckButton class="select-all" :isChecked="isSelectAll" @click.native="checkClick"></CheckButton>
    <span>全选</span>
    <span class="total-price">合计: ¥{{totalPrice}}</span>
    <span class="buy-product">去计算({{$store.getters.cartCount}})</span>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
  import CheckButton from './CheckButton'

	export default {
		name: "BottomBar",
    components: {
		  CheckButton
    },
    computed: {
      ...mapGetters(['cartList']),
		  totalPrice() {
        const cartList = this.$store.getters.cartList;
        return cartList.filter(item => {
          return item.checked
        }).reduce((preValue, item) => {
          return preValue + item.count * item.price
        }, 0).toFixed(2)
      },
      checkLength(){
        return this.cartList.filter(item=>item.checked).length
      },
      isSelectAll: function () {
        if(this.cartList.length === 0) return false
        // return !this.cartList.find(item => item.checked )
        for(let item of this.cartList){
          if (!item.checked) {
            return false
          }
        }
        return true
      }
    },
    methods: {
     checkClick(){
       if (this.isSelectAll) {
         this.cartList.forEach(item=>item.checked=false)
       }else{
         this.cartList.forEach(item=>item.checked=true)
       }
     }
    }
	}
</script>

<style scoped>
  .bottom-menu {
    width: 100%;
    height: 44px;
    background-color: #eee;
    position: fixed;
    bottom: 50px;
    left: 0;
    box-shadow: 0 -2px 3px rgba(0, 0, 0, .2);
    font-size: 14px;
    color: #888;
    line-height: 44px;
    padding-left: 35px;
    box-sizing: border-box;
  }

  .bottom-menu .select-all {
    position: absolute;
    line-height: 0;
    left: 12px;
    top: 13px;
  }

  .bottom-menu .total-price {
    margin-left: 15px;
    font-size: 16px;
    color: #666;
  }

  .bottom-menu .buy-product {
    background-color: orangered;
    color: #fff;
    width: 100px;
    height: 44px;
    text-align: center;
    line-height: 44px;
    float: right;
  }
</style>
