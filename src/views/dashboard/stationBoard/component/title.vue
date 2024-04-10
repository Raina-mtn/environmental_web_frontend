<template>
  <div class="board-title">
    {{ name }}
  </div>
</template>
<script>
export default {
  props:{
    name: {type: String, default: ''}
  }
}
</script>
<style lang="scss" scoped>
.board-title{
    width: 100%;
    height: 3rem;
    background: url('~@/assets/images/board/titlebg2.png') no-repeat;
    background-size:100% 3rem;
    font-size: 2rem;
    color: #fff;
    line-height: 3rem;
    text-indent: 2rem;
  text-shadow: 0px 0px 9px #158EFF;
}
</style>