var DataName = ['运维作业', '运维预警'];

export const patrolLineOption = ({ xData, sData1, sData2 }) => ({
  // backgroundColor: '#ffffff',
  tooltip: {
    trigger: 'axis',
  },
  legend: {
    data: DataName,
    textStyle: {

      color: '#fff'
    }
  },
  grid: {
    left: '2%',
    right: '4%',
    bottom: '2%',
    containLabel: true
  },
  xAxis: [
    {
      type: 'category',
      data: xData,
      name: '日',
      nameTextStyle: {
        color: '#fff'
      },
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
      name: '次',
      minInterval: 1,
      nameTextStyle: {
        color: '#fff'
      },
      axisLabel: {
        show: true
      },
      axisLine: {
        show: false,
      },
      splitLine: {
        // show:false,
        lineStyle: {
          type: 'dashed',
          color: 'rgba(108,128,151,0.3)' //里面横着的虚线
        },
      }
    },
    {
      show: false,
      type: 'value',
      axisLine: {
        show: false,
        lineStyle: {
          color: "rgba(200,200,200,.51)"
        },
      },
      splitLine: {
        show: false,
        lineStyle: {
          type: 'dashed',
          color: 'rgba(200,200,200,1)'
        }
      }
    }
  ],
  series: [
    {
      name: DataName[0],
      type: 'bar',
      data: sData1,
      barWidth: '25%',
      seriesLayoutBy: 'row',
      itemStyle: {
        barBorderRadius: [30, 30, 0, 0],
        color: {
          x: 0,
          y: 0,
          x2: 1,
          y2: 1,
          colorStops: [
            { offset: 0, color: 'rgba(9,141,249,1)' },  //第一顶部颜色
            { offset: 1, color: 'rgba(9,141,249,0.1)' }  //第一底部颜色
          ]
        }
      }
    },
    {
      name: DataName[1],
      type: 'line',
      color: "rgba(69,234,246,1)", //圆颜色
      smooth: true,
      symbol: 'circle',
      symbolSize: 6,  //圆大小
      lineStyle: {
        normal: {
          width: 1,
          color: 'rgba(69,234,246,1)'  //线条样式
        }
      },

      areaStyle: {
        normal: {
          color: {
            x: 1,
            y: 0,
            x2: 1,
            y2: 1,
            colorStops: [
              { offset: 0, color: 'rgba(69,234,246,0.5)' },
              { offset: 1, color: 'rgba(69,234,246,0.1)' }
            ]
          },
        }
      },
      yAxisIndex: 1,
      data: sData2
    }
  ]
})
export const barOption = ( xData, yData ) => ({
  // backgroundColor: '#ffffff',
  tooltip: {
    trigger: 'axis',
  },
  grid: {
    top: 20,
    left: 20,
    right: 24,
    bottom: 10,
    containLabel: true
  },
  xAxis: {
    type: 'category',
    boundaryGap: 5,
    data: xData,
    // name: '日',
    nameTextStyle: {
      color: '#fff'
    },
    axisPointer: {
      type: 'shadow'
    },
    // boundaryGap: false,
    // 坐标轴线
    axisLine: {
      lineStyle: {
        color: "#6C8097" //X轴字体颜色
      }
    },
    axisLabel: {
      color: '#E2EDFF',
      // rotate: 30
    }
    
  },
  yAxis: {
    type: 'value',
    // name: '单位：个',
    nameTextStyle: {
      padding: [0, 0, 10, -60] // 四个数字分别为上右下左与原位置距离
    },
    splitLine: {
      show: true,
      lineStyle: {
        color: 'rgba(219,225,255,.3)',
        type: 'dashed'
      }
    },
    axisLine: {
      show: false
    },
    axisLabel: {
      textStyle: {
        color: '#fff', // 更改坐标轴文字颜色
        // fontSize: 12 // 更改坐标轴文字大小
      }
    },
    axisTick: {
      show: false
    }
  },
  series: [
    {
      name: '健康评分',
      type: 'bar',
      data: yData,
      barWidth: '30%',
      seriesLayoutBy: 'row',
      itemStyle: {
        barBorderRadius: [30, 30, 0, 0],
        color: {
          x: 0,
          y: 0,
          x2: 1,
          y2: 1,
          colorStops: [
            { offset: 0, color: 'rgba(9,141,249,1)' },  //第一顶部颜色
            { offset: 1, color: 'rgba(9,141,249,0.1)' }  //第一底部颜色
          ]
        }
      }
    }
  ]
})
// export const factorConfig = { 'so2': 'SO₂', 'co2': 'NOx', 'pm10': 'PM₁₀', 'pm25': 'PM₂.₅', 'co': 'CO', 'o3': 'O₃' } // 公司接口配置
export const factorConfig = { '101': 'SO₂', '141': 'NOx', '107': 'PM₁₀', '121': 'PM₂.₅', '106': 'CO', '108': 'O₃' } // 现场接口配置
const colorArr = ['#4EA7F9', '#45EAF6', '#D4DEEC', '#E2FFBC', '#63E7B7', '#FF904A']
export const factorLineOption = ({ xData, sData }) => ({
  color: ['#4EA7F9', '#45EAF6', '#D4DEEC', '#E2FFBC', '#63E7B7', '#FF904A'],
  tooltip: {
    trigger: 'axis',
    formatter: (params) => {
      let htmlStr = '';
      const valMap = {};
      for (let i = 0; i < params.length; i++) {
        const param = params[i];
        const xName = param.name; //x轴的名称q
        const seriesName = param.seriesName === 'NHN' ? (param.seriesName.slice(0, 2) + '₃-N') : param.seriesName; //图例名称
        const value = param.value; //y轴值
        const color = param.color; //图例颜色
        //过滤无效值
        if ((!value&&value!==0) || value === '-') {
          continue;
        }

        //过滤重叠值
        if (valMap[seriesName] == value) {
          continue;
        }

        if (i === 0) {
          htmlStr += xName + '<br/>'; //x轴的名称
        }
        htmlStr += '<div>';
        //为了保证和原来的效果一样，这里自己实现了一个点的效果
        htmlStr +=
              '<span style="margin-right:5px;display:inline-block;width:10px;height:10px;border-radius:5px;background-color:' +
              color +
              ';"></span>';

        //圆点后面显示的文本
        htmlStr += seriesName + '：' + value + (seriesName.includes('CO') ? 'mg/m³' : 'ug/m³');

        htmlStr += '</div>';
        // 存储重复数据
        valMap[seriesName] = value;
      }
      return htmlStr;
    }
  },
  legend: {
    data: Object.values(factorConfig),
    formatter: (name) => {
      if (name === 'CODMn')
        return `{a|COD}{b|Mn}`
      if (name === 'NHN')
        return `{a|NH}{b|3}-{a|N}`
      else
        return `{a|${name}}`
    },
    textStyle: {
      color: '#fff',
      rich: {
        a: {
          fontSize: '10px'
        },
        b: {
          fontSize: '10px'
        }
      }
    }
  },
  grid: {
    left: '5%',
    right: '10%',
    bottom: '2%',
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
        show: true
      },
      axisLine: {
        show: false,
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
  series: sData.map((v, index) => ({
    name: v.name,
    type: 'line',
    symbol: false,
    showSymbol: false,
    smooth: false,
    lineStyle: {
      normal: {
        width: 1,
        type: v.dotted ? 'dotted' : 'lined',
        color: index < colorArr.length ? colorArr[index] : (colorArr[index - colorArr.length] ||  'rgba(69,234,246,1)')  //线条样式
      }
    },
    data: v.ydata
  }))
})
export const waterConfig = ['优', '良', '轻度污染', '中度污染', '重度污染', '严重污染', 'Ⅶ类', 'Ⅷ类']
// 水波纹
export const waterOption = (data) => ({
  // backgroundColor: "#0e2147",
  title: {
    show: true,
    text: '空气质量',
    x: '48%',
    y: '54%',
    z: 10,
    textAlign: 'center',
    textStyle: {
      color: '#ffffff',
      fontSize: 18,
      fontWeight: 500
    },
  },
  series: [{
    type: 'liquidFill',
    radius: '90%',
    center: ['50%', '50%'],
    data: [30 / 100],
    label: {
      normal: {
        position: ['50%', '40%'],
        formatter: function () {
          return `${waterConfig[data]}`;
        },
        textStyle: {
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
      borderDistance: 10,
      itemStyle: {
        borderWidth: 3,
        borderColor: 'rgba(31,159,251,0.5)',
      }
    },
    // amplitude: 0,
  }]
})
