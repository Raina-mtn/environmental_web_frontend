<template>
  <div class=" flex items-center">
    <img :src="img" class="staiton-img">
    <p class="station-number-item flex items-center justify-between flex-1">
      <label class="white-light-text text-xl ml-4">{{ name }}</label>
      <label class="light-text text-[2.5rem]">{{ value || 0 }}<span class="white-light-text text-base">{{ unit }}</span></label>
    </p>
  </div>
</template>
<script>
export default {
  props:{
    img: {
      type: String,
      default: ''
    },
    name: {
      type:  String,
      default: ''
    },
    value: {
      type: Number,
      default: 0
    },
    unit: {
      type: String,
      default: ''
    }
  }
}
</script>
<style lang="scss" scoped>
$light-color: #6BF2FF;
$white-light-color: #E2EDFF;
.white-light-text{
  color:$white-light-color ;
}
.light-text{
  color:$light-color ;
}
.station-number-item{
  background: linear-gradient(90deg, #05294B 0%, rgba(86,171,255,0.4) 0%, rgba(24,72,118,0.1) 80%, rgba(5,41,75,0) 100%);
  height:100%;
}
.staiton-img{
  display: block;
  width: 4.8rem;
  max-width: 52px;
}
</style>