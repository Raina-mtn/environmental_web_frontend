<template>
  <div class="p-10px w-full flex justify-between items-center" style="border-bottom: 1px solid #f4f4f5;">
    <div class="flex items-center">
      <div class="bg-[#148aff] w-40px h-40px flex justify-center items-center rounded-1/2 mr-20px">
        <i :class="`iconfont icon-${fileIcon} !text-25px text-[#fff]`" />
      </div>
      <div class="pointer-events-none">
        {{ fileName }}{{ type }}
      </div>
    </div>
    <a :href="file">
      <i class="el-icon-download text-20px cursor-pointer" />
    </a>
  </div>
</template>

<script>
export default {
  props:{
    file:{
      type:String,
      default:''
    }
  },
  computed:{
    fileType(){
      const type = this.file.split('.').pop()
      return type
    },
    fileName(){
      const name = this.file.split('/').pop()
      return name
    },
    fileIcon(){
      let icon
      switch(this.fileType){
        case 'doc':
          icon =  'word'
          break
        case 'docx':
          icon =  'word'
          break
        case 'pptx':
          icon =  'ppt'
          break
        case 'pdf':
          icon =  'pdf'
          break
        case 'xls':
          icon =  'excel'
          break
        case 'xlsx':
          icon =  'excel'
          break
        default:
          icon =  'word'
      }
      return icon
    }
  },
  methods: {
    download(){

    }
  },
}
</script>

<style lang="scss" scoped>

</style>