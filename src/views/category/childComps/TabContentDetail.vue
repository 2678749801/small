<template>
  <grid-view>
    <tab-list-item v-for="(item, index) in categoryDetail" :key="index" :goods="item"/>
  </grid-view>
</template>

<script>
  import GridView from 'components/common/gridView/GridView'
  
import TabListItem from './TabListItem.vue'

  export default {
    name: "TabContentDetail",
    components: {
      GridView,
      
        TabListItem
    },
    props: {
      categoryDetail: {
        type: Array,
        default() {
          return []
        }
      }
    }
  }
</script>

<style scoped>

</style>
