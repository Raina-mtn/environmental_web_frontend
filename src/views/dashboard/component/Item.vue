<template>
  <section class="item flex items-center ">
    <img :src="img" class="mr-4">
    <div>
      <p>
        {{ name }}
      </p>
      <p class="text">
        <CountTo :end-val="value || 0" /> {{ unit }}
      </p>
    </div>
  </section>
</template>
<script>
import CountTo from '@/components/CounTo/CountTo.vue';
export default {
  components: { CountTo},
  props: {
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
.item{
  img{
    display: block;
    width: 4.8rem;
    max-width: 52px;
  }
    p{
        color: $white-light-color;
        font-size: 1.5rem;
    }
    span{
      color:$light-color ;
      font-size: 2rem;
        font-weight: bold;
    }
}
</style>