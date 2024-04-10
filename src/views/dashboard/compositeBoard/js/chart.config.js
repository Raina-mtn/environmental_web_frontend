import dayjs from 'dayjs';

// 水波纹
const waterQulity = ['优', '良', '差']
export const waterOption = (data)=> ({
  title: {
    show: true,
    text: '总体情况',
    x: '50%',
    y: '60%',
    z: 10,
    textAlign: 'center',
    textStyle: {
      color: '#ffffff',
      fontSize: 20,
      fontWeight: 500
    },
  },
  series: [{
    type: 'liquidFill',
    radius: '80%',
    center: ['50%', '50%'],
    data: [30 / 100],
    label:{
      normal:{
        formatter: function() {
          return waterQulity[data-1];
        },
        textStyle:{
          color: '#3DFFFF',
          fontSize: 32,
        }
      }
    },
    color: ['rgba(31,159,251)'],
    backgroundStyle: {
      color: 'rgba(31,159,251,0.5)'
    },
    outline: {
      borderDistance:10,
      itemStyle: {
        borderWidth:3,
        borderColor: 'rgba(31,159,251,0.5)',
      }
    },
  }]
})
// 圆形饼图
export const pieOption = (value=0, text) =>  ({
  title: [{
    text: '{a|'+ value +'}{c|%}',
    x: 'center',
    y: '30%',
    textStyle: {
      rich:{
        a: {
          fontSize: 36,
          color: '#3DFFFF',
          fontWeight:'bold' //百分比数字
        },
                  
        c: {
          fontSize: 16,
          color: '#E2EDFF', //百分符号颜色
        }
      }
    }
  },{
    text,
    x: 'center',
    y: '60%',
    textStyle: {
      fontSize: 16,
      color: '#E2EDFF',
      fontWeight:'normal'
    }
  }],
      
  series: [ {
    type: 'pie',
    radius: ['88%', '82%'],
    silent: true,
    clockwise: false,
    startAngle: 90,
    z: 0,
    zlevel: 0,
    label: {
      normal: {
        position: "center",
  
      }
    },
    data: [{
      value: value,
      name: "",
      itemStyle: {
        normal: {
          shadowColor: '#4FADFD',
          shadowBlur: 10,
          color: { // 完成的圆环的颜色
            colorStops: [{
              offset: 0,
              color: '#4CF8FE' // 0% 处的颜色
            }, {
              offset: 1,
              color: '#098DF9' // 100% 处的颜色
            }]
          },
        }
      }
    },
    {
      value: 100-value,
      name: "",
      label: {
        normal: {
          show: false
        }
      },
      itemStyle: {
        normal: {
          color: "#4FADFD33"
        }
      }
    }
    ]
  },
           
          
  ]
})

// 多类目饼图
export const pieOptionMulti = (seriesData)=>{
  return ({
    color:  ['#D4DEEC', '#4EA7F9', '#63E7B7'],
    legend:{
      show:false
    },
    grid: {
      top: '3%',
      left: 0,
      right: '1%',
      bottom: 5,
      containLabel: true,
    },
    series: [
      {
        type: 'pie',
        radius: ['66%', '68%'],
        center: ['50%', '50%'],
        hoverAnimation: false,
        itemStyle: {
          normal: {
            color: 'rgba(129,129,129,1)',
          },
        },
        label: {
          show: false,
        },
        data: [0],
        z: 666,
      },
      {
        type: 'pie',
        radius: ['56%', '64%'],
        center: ['50%', '50%'],
        hoverAnimation: false,
        startAngle: 90,
        selectedMode: 'single',
        itemStyle: {
          normal: {
            // shadowColor:'#3C3C3C',
          },
        },
        label: {
          show: true,
          formatter: '{b}' + '\n' + '{d}%',
          color: '#ddd',
        },
        data: seriesData,
        z: 666,
      },
      {
        type: 'pie',
        radius: ['53%', '54%'],
        center: ['50%', '50%'],
        hoverAnimation: false,
        itemStyle: {
          normal: {
            color: 'rgba(153,161,183,1)',
          },
        },
        label: {
          show: false,
        },
        data: [0],
        z: 666,
      },
    ],
  })
}
export const gasColorList =  ['#63E7B7', '#FFE691', '#FAAB68', '#F36847', '#5348CA', '#E83737']
// 多类目饼图-气站
export const pieOptionMultiGas = (seriesData)=>{
  return ({
    color:  gasColorList,
    legend:{
      show: false,
      data:['优','良','轻度污染','中度污染','重度污染','严重污染'],
      textStyle:{
        color: '#fff'
      },
      orient:'vertical',
      align:'right',
      icon:'rect',
      itemWidth:8,
      itemHeight:8,
      right:'20%',
    },
    xAxis:{
      show:false
    },
    grid: {
      top: '3%',
      left: 0,
      right: '1%',
      bottom: 5,
      containLabel: true,
    },
    series: [
      {
        type: 'pie',
        radius: ['76%', '78%'],
        center: ['18%', '50%'],
        hoverAnimation: false,
        itemStyle: {
          normal: {
            color: 'rgba(129,129,129,1)',
          },
        },
        label: {
          show: false,
        },
        data: [0],
        z: 666,
      },
      {
        type: 'pie',
        radius: ['64%', '72%'],
        center: ['18%', '50%'],
        hoverAnimation: false,
        startAngle: 90,
        // tooltip: {
        //   trigger: 'item',
        // },
        // selectedMode: 'single',
        
        itemStyle: {
          normal: {
            // shadowColor:'#3C3C3C',
          },
        },
        label: {
          show: false,
          formatter: '{b}' + '\n' + '{d}%',
          color: '#ddd',
        },
        data: seriesData,
        z: 666,
      },
      {
        type: 'pie',
        radius: ['60%', '58%'],
        center: ['18%', '50%'],
        hoverAnimation: false,
        itemStyle: {
          normal: {
            color: 'rgba(153,161,183,1)',
          },
        },
        label: {
          show: false,
        },
        data: [0],
        z: 666,
      },
    ],
  })
}

export const waterLevelLineOption = ({xData, sData})=> ({
  color: ['#0783FA', '#45EAF6', '#D4DEEC'],
  tooltip: {
    trigger: 'axis',
  },
  legend: {
    show: true,
    textStyle:{
      color: '#fff'
    },
    top: '5%',
    icon: 'roundRect',
    itemHeight: 2,
    itemWidth: 8
  },
  grid: {
    left: '5%',
    right: '4%',
    bottom: 0,
    top:'25%',
    containLabel: true
  },
  xAxis: [
    {
      type: 'category',
      data: xData,
      axisPointer: {
        type: 'shadow'
      },
      boundaryGap: false,
      // 坐标轴线
      axisLine: {
        lineStyle: {
          color: "#6C8097" //X轴字体颜色
        }
      },
      axisLabel: {
        color: '#E2EDFF'
      }
                
    }
  ],
  yAxis: [
    {
              
      type: 'value',
      axisLabel: {
        show: true,
        color: '#E2EDFF'
      },
      axisLine: {
        show:false,
      },
      splitLine: {
        // show:false,
        lineStyle: {
          type: 'dashed',
          color: 'rgba(108,128,151,0.3)' //里面横着的虚线
        }
      }
    },
  ],
  series: sData.map((v,index)=>({
    name:`${v.name}水质占比`,
    type:'line',
    showSymbol: false,
    smooth: true,
    lineStyle: {
      normal: {
        width: 1,
      }
    },
    areaStyle: {
      normal: {
        color: {
          x:1,
          y: 0,
          x2: 1,
          y2: 1,
          colorStops: [
            {offset: 0, color: 'rgba(69,234,246,0.5)'}, 
            {offset: 1, color: 'rgba(69,234,246,0.1)'} 
          ]
        },
      }
    },   
    data: v.ydata
  }))
})
export const gasLevelLineOption = ({xData, sData})=> ({
  color: ['#63E7B7', '#FFE691', '#FAAB68', '#F36847', '#5348CA', '#E83737'],
  tooltip: {
    trigger: 'axis',
  },
  legend: {
    show: true,
    textStyle:{
      color: '#fff'
    },
    top: '5%',
    icon: 'roundRect',
    itemHeight: 2,
    itemWidth: 8
  },
  grid: {
    left: '5%',
    right: '4%',
    bottom: 0,
    top:'20%',
    containLabel: true
  },
  xAxis: [
    {
      type: 'category',
      data: xData,
      axisPointer: {
        type: 'shadow'
      },
      boundaryGap: false,
      // 坐标轴线
      axisLine: {
        lineStyle: {
          color: "#6C8097" //X轴字体颜色
        }
      },
      axisLabel: {
        color: '#E2EDFF'
      }
                
    }
  ],
  yAxis: [
    {
              
      type: 'value',
      axisLabel: {
        show: true,
        color: '#E2EDFF'
      },
      axisLine: {
        show:false,
      },
      splitLine: {
        // show:false,
        lineStyle: {
          type: 'dashed',
          color: 'rgba(108,128,151,0.3)' //里面横着的虚线
        }
      }
    },
  ],
  series: sData.map((v,index)=>({
    name:`${v.name}`,
    type:'line',
    showSymbol: false,
    smooth: true,
    lineStyle: {
      normal: {
        width: 1,
      }
    },
    data: v.ydata
  }))
})
// 日历图
export const heatMapOption  = (data)=> ({
  title:{
    top: 10,
    text: '近6月工程异常日历图',
    left: 30,
    textStyle: {
      color: '#E2EDFF',
      fontSize: 14,
      fontWeight:300
    }
  },
  legend: {
    top: 0,
    right:0
  },
  tooltip: {
  },
  visualMap: {
    type: 'piecewise',
    orient: 'horizontal',
    right: 30,
    top: 10,
    textStyle: {
      color: '#E2EDFF',
    },
    pieces: [
      {
        value: 0,
        label: '0',
        color: 'rgba(20, 159, 245, 0.25)',
      },
      {
        gte: 1,
        lte: 10,
        label: '1-10',
        color: 'rgb(20, 159, 190)',
      },
      {
        gte: 11,
        lte: 20,
        label: '11-20',
        color: '#149FF5',
      },
      {
        gt: 20,
        label: '>20',
        color: '#0059ff',
      },
    ],
  },
  calendar: {
    top: 40,
    left: 30,
    right: 30,
    cellSize: ['auto', 16],
    range: [dayjs().subtract(6,'month').format('YYYY-MM-DD'), dayjs().format('YYYY-MM-DD')],
    itemStyle: {
      borderWidth: 1,
      borderColor: 'rgb(3,15,33)',
      color: 'rgba(20, 159, 245, 0.25)',
    },
    splitLine: {
      show: false,
    },
    dayLabel: {
      show: true,
      firstDay: 1,
      nameMap: 'cn',
      textStyle: {
        color: '#E2EDFF'
      }
    },
    monthLabel: {
      show: true,
      position: 'bottom',
      textStyle: {
        color: '#E2EDFF'
      }
    },
    yearLabel: { 
      show: false,
    },
  },
  series: {
    type: 'heatmap',
    coordinateSystem: 'calendar',
    data
  },
})
export const legend = [
  {name: '水质监测站', icon: `image://${require('@/assets/images/compositeBoard/icon_water_sm.png')}`},
  {name: '大气监测站', icon: `image://${require('@/assets/images/compositeBoard/icon_clound_sm.png')}` },
  // {name: '噪音监测站', icon: `image://${require('@/assets/images/compositeBoard/icon_noise_sm.png')}` },
  // {name: '土壤监测站', icon: `image://${require('@/assets/images/compositeBoard/icon_ph_sm.png')}` },
  // {name: '综合监测站', icon: `image://${require('@/assets/images/compositeBoard/icon_compsite_sm.png')}` }
]
// 地图
export const mapOption = (data)=> {
  console.log('data',data);
  return  {
    legend:{
      width: 156,
      padding: [5, 15],
      itemWidth: 18,
      itemHeight:18,
      data: legend,
      left: 10,
      bottom: 10,
      textStyle:{
        color: '#fff'
      },
      backgroundColor:'rgba(60, 110, 175, 0.46)'
    },
    tooltip: {
      show: true
    },
    grid: {
      left: '1%',
      right: '1%',
      top: '20%',
      bottom: '25%',
    },
    // 地图的阴影底图
    geo: {
      map: 'area',
      left: 0,
      right: 0,
      bottom: 0,
      top: 0,
      aspectScale: 0.9,
      layoutCenter: ['50%',
        '52.5%'],
      //地图位置
      layoutSize: '90%',
      itemStyle: {
        normal: {
          shadowColor: 'rgba(0,228,242,0)',
          shadowBlur: 0,
          color: 'rgba(0,228,242,0)',
        },
        emphasis: {
          areaColor: '#082A52',
        },
      },
      z: 2,
    },
    series: [{
      name: '综合监测站',
      type: 'scatter',
      coordinateSystem: 'geo',
      geoIndex: 0,
      data:[]
    },{
      name: '噪音监测站',
      type: 'scatter',
      coordinateSystem: 'geo',
      geoIndex: 0,
      data:[]
    },{
      name: '土壤监测站',
      type: 'scatter',
      coordinateSystem: 'geo',
      geoIndex: 0,
      data:[]
    },{
      name: '大气监测站',
      type: 'scatter',
      coordinateSystem: 'geo',
      geoIndex: 0,
      symbol: `image://${require('@/assets/images/compositeBoard/icon_gas_point.png')}`,
      symbolSize: [42,80],
      itemStyle: {
        color: '#b02a02'
      },
      zlevel: 10,
      data:data.filter(i=>i.type==="GAS"),
      tooltip:{
        show: false
      }
    },{
      name: '水质监测站',
      type: 'scatter',
      coordinateSystem: 'geo',
      geoIndex: 0,
      symbol: `image://${require('@/assets/images/compositeBoard/icon_water.png')}`,
      symbolSize: [42,80],
      itemStyle: {
        color: '#b02a02'
      },
      data:data.filter(i=>i.type==="WATER"),
      zlevel: 10,
      tooltip:{
        show: false
      }
    },{
      type: 'map',
      map: 'area',
      geoIndex: 1,
      aspectScale: 0.9,
      layoutCenter: ['50%',
        '50%'],
      //地图位置
      layoutSize: '90%',
      label: {
        normal: {
          show: true,
          fontFamily: 'SourceHanSansCN',
          fontSize: '14',
          color: '#FEFEFE',
        },
        emphasis: {
          show: true,
          fontFamily: 'SourceHanSansCN',
          fontSize: '14',
          color: '#FEFEFE',
        },
      },
      // tooltip:{} tooltip可结合formatter、div、css实现样式
      itemStyle: {
        normal: {
          borderColor: '#88E5FF',
          borderWidth: 2,
          areaColor: {
            type: 'linear-gradient',
            x: 0,
            y: 600,
            x2: 0,
            y2: 0,
            colorStops: [
              {
                offset: 0,
                color: 'rgba(17, 84, 171, 0.8)', // 0% 处的颜色
              },
              {
                offset: 1,
                color: 'rgba(12, 110, 171, 0.7)' //'rgba(12, 110, 171, 0.7)',
              },
            ],
            global: true, // 缺省为 false
          },
        // shadowBlur: 15,
        // shadowColor: 'rgb(58,115,192)',
        // shadowOffsetX: 7,
        // shadowOffsetY: 6,
        },
        emphasis: {
          shadowColor: 'rgba(0, 0, 0, 1)',
          shadowBlur: 10,
          shadowOffsetX: 5,
          shadowOffsetY: 5,
          areaColor: 'rgba(12, 110, 171, 1)',
        },
      },
      zlevel: 1,
      tooltip: {
        show: false
      }
    },
    ],
  }
}