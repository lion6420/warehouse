<template>
  <div :class="$style.wrapper">
    <div style="overflow-x: auto">
      <img src="earth.png" width="1485" height="600">
      <area-tag-d-10 name="D10" :infoPositionX="20" :infoPositionY="-286" :data="tableData_D11" style="position: relative;left:650px;top:-160px;"></area-tag-d-10>
      <area-tag-d-11 name="D11" :infoPositionX="83" :infoPositionY="-166" :data="tableData_D11" style="position: relative;left:690px;top:-310px;"></area-tag-d-11>
      <new-table></new-table>
    </div>
  </div>
</template>

<script>
import areaTagD11 from './area-tag-D11'
import areaTagD10 from './area-tag-D10'
import newTable from './newTable'
export default {
  components: {
    areaTagD11,
    areaTagD10,
    newTable,
  },
  data() {
    return {
      tableData_D11: [
        {
          index: 'L5成品倉',
          taskAchievement: 95,
          warehousePerformance: 90,
          warehouseEfficiency: 80,
          staffEfficiency: 82,
        },
      ],
      tableData_D10: [
        {
          index: 'L10電子倉',
          taskAchievement: 95,
          warehousePerformance: 90,
          warehouseEfficiency: 80,
          staffEfficiency: 82,
        },
      ]
    }
  }
}
</script>

<style lang="scss" module>
@import '@/style/general.module.scss';
.wrapper {
  @include block(100%);
}

</style>