<template>
  <div class="calendar">
    <div class="hd flex justify-between mb-2">
      <p>{{ `${monthFormat}智能预警日历图` }}</p>
      <div>
        <i class="el-icon-arrow-left cursor-pointer" @click="preMonth" />
        <span class="mx-4">{{ monthFormat }}</span>
        <i class="el-icon-arrow-right cursor-pointer" @click="nextMonth" />
      </div>
    </div>
    <div class="week-bar">
      <span v-for="(item,index) in weekOption" :key="index" class="inline-block w-1/7 text-center">{{ item }}</span>
    </div>
    <div class="date-container flex flex-wrap">
      <div v-for="(item,index) in dateArr" :key="index" class="w-1/7 text-center white my-2">
        <span :class="item.class">{{ formatDay(item.day) }}</span>
        <span v-show="warnData[item.day]" class="number absolute">{{ warnData[item.day] }}次</span>
      </div>
    </div>
  </div>
</template>
<script>
import dayjs from 'dayjs'
import {apiGetCompreWarningCalendar} from '@/api/interface/dashboard.js'
export default {
  data() {
    return {
      curMonth: dayjs().format('YYYY-MM'), // 当前月
      weekOption: [
        '日', '一','二','三','四','五','六'
      ],
      dateArr:[],
      warnData:{}
    }
  },
  computed:{
    monthFormat(){
      const date = this.curMonth.split('-')
      return `${date[0]}年${date[1]}月`
    },
  },
  watch: {
    curMonth(val){
      this.getDate(val)
    }
  },
  created(){
    this.getDate()
  },
  methods:{
    getDate(date){
      const dateArr = []
      const startDay = dayjs(date).startOf('month')
      const endDay = dayjs(date).endOf('month')
      const startWeek = startDay.day() // 0星期天 6，星期六
      const endWeek = endDay.day() // 0星期天 6，星期六
      if(startWeek!==0){ // 计算向前几位
        for(let i =0; i<startWeek; i++){
          dateArr.push({
            class: 'pre-month',
            day: startDay.subtract(startWeek-i, 'day').format('YYYY-MM-DD')
          })
        }
      }
      const dayNumber = dayjs(date).daysInMonth() // 获取月天数
      for(let i =0; i<dayNumber; i++){
        dateArr.push({
          class: 'cur-month',
          day: startDay.add(i, 'day').format('YYYY-MM-DD')
        })
      }
      if(endWeek!==6){
        for(let i =1; i<7-endWeek;i++){
          dateArr.push({
            class: 'next-month',
            day: endDay.add(i, 'day').format('YYYY-MM-DD')
          })
        }
      }
      this.dateArr = dateArr
      let minStatDate=dayjs(dateArr[0].day).startOf('day').format('YYYY-MM-DD HH:mm:ss'), maxStatDate=dayjs(dateArr[dateArr.length-1].day).endOf('day').format('YYYY-MM-DD HH:mm:ss')
      this.getWarnData({minStatDate,maxStatDate})
    },
    formatDay(day){
      return dayjs(day).format('DD')
    },
    preMonth(){
      this.curMonth = dayjs(this.curMonth).subtract(1,'month').format('YYYY-MM')
    },
    nextMonth(){
      this.curMonth = dayjs(this.curMonth).add(1,'month').format('YYYY-MM')
    },
    getWarnData({minStatDate,maxStatDate}){
      this.warnData = {}
      apiGetCompreWarningCalendar({minStatDate,maxStatDate}).then(res=>{
        const {statDateList, countList}  = res.data
        statDateList.forEach((date, index) => {
          this.warnData[date] = countList[index]
        });
        this.$forceUpdate()
      })
    }
  }
}
</script>
<style lang="scss" scoped>
$white-light-color: #E2EDFF;
.calendar{
    color: #fff;
    .hd{
        color:$white-light-color;
    }
    .week-bar{
        background: rgba(86,171,255,0.2);
        color: $white-light-color;
        height: 2rem;
    }
    .pre-month,.next-month{
        color:$white-light-color ;
        opacity: 0.5;
    }
    .number{
        display: inline-block;
        width: 35px;
        height: 20px;
        background: linear-gradient(134deg, rgba(115,190,232,0.29) 0%, rgba(18,82,141,0.39) 100%);
        border-radius: 10px 10px 10px 0px;
        border: 1px solid;
        border-image: linear-gradient(135deg, rgba(76, 248, 254, 1), rgba(200, 240, 250, 0.27)) 1 1;
        padding: 2px;
        clip-path: inset(0 round 10px 10px 10px 0px) ;
        margin-left:2px;
    } 
}
</style>