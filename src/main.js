import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import toast from 'components/common/toast'
import FastClick from 'fastclick'
import VueLazyLoad from 'vue-lazyload'
Vue.config.productionTip = false
Vue.prototype.$bus = new Vue()
    //安装toast插件
Vue.use(toast)
    //解决移动端300毫秒延迟
FastClick.attach(document.body)
Vue.use(VueLazyLoad, {
    loading: ''//可以设置未加载图片时 预先给别人看的图片 进行占位
})
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')