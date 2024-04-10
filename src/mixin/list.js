export const listMixin = {
  data(){
    return{
      formData: {
        pageNum: 1,
        pageSize: 10
      }
    }
  },
  methods:{
    refresh(){
      this.formData.pageNum = 1
      this.formData.pageIndex = 1
      this.formData.pageSize = 10
      this.getList()
    },
    reset(){
      const dateKey = this.dateKey
      this.formData = {
        pageNum: 1,
        pageIndex: 1,
        pageSize: 10,
        [dateKey]:[],
        stationId:this.stationId
      }
      this.getList()
    },
    handleDelete(deleteList,paramsName){
      if(Array.isArray(deleteList) && !deleteList.length){
        this.$message.error('请至少选择一条记录！')
      }else{
        this.$alert('确认删除?', '提示', {
          confirmButtonText: '确定',
          type: 'warning',
        }).then(() => {
          this.deleteAPi({
            [paramsName]: deleteList
          }).then(() => {
            this.$message.success('删除成功')
          }).finally(() => {
            this.refresh()
          })
        })
      }
    },
  }
}