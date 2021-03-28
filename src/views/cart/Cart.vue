<template>
  <div id="cart">
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{ cartLength }})</div>
    </nav-bar>
    <cart-list />
    <bottom-bar />
  </div>
</template>

<script>
import NavBar from "../../components/common/navbar/NavBar.vue";
import { mapGetters } from "vuex";
import CartList from "./childComps/CartList.vue";
import BottomBar from "./childComps/BottomBar.vue";
export default {
  components: { NavBar, CartList, BottomBar },
  name: "Cart",
  computed: {
    //将getters里的东西转换成计算属性
    ...mapGetters(["cartLength"]),
  },
};
</script>

<style scoped>
#cart {
  height: 100vh;
}
.nav-bar {
  background-color: var(--color-tint);
  color: #fff;
}
</style>