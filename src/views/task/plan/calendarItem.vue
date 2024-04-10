<template>
  <div :title="record.maintenanceTaskName" :class="['h-24px','mt-5px','overflow-hidden','leading-24px','overflow-ellipsis','w-full',record.periodicType==='DAY'?'day':'week']">
    {{ record.maintenanceTaskName }}
  </div>
</template>

<script>
export default {
  props:{
    record:{
      type: Object,
      default(){}
    },
  }
}
</script>

<style lang="scss" scoped>
.day{
  background-color: #FFFBE6;
  color: #FAAD14;
}
.day:before{
  content: '';
  display: inline-block;
  width: 2px;
  height: 24px;
  background-color: #FAAD14;
  vertical-align: top;
}
.week{
  background-color: #E6F7FF;
  color: #1890FF;
}
.week:before{
  content: '';
  display: inline-block;
  width: 2px;
  height: 24px;
  line-height: 24px;
  background-color: #1890FF;
  vertical-align: top;
}
</style>