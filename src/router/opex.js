const reportRouter = [
  {
    path: '/opex/report/day',
    code: 'OpexReportDay',
    component: ()=>import('@/views/report/routerView/index.vue'),
    alwaysShow: true,
    meta: { title: '日报'},
    children: [
      {
        path: '/opex/report/environment',
        code: 'Environment',
        component: ()=>import('@/views/report/environment/index.vue'),
        meta: { title: '环境巡检'},
      },{
        path: '/opex/report/SO',
        code: 'SO',
        component: ()=>import('@/views/report/SO/index.vue'),
        meta: { title: 'SO₂校准'},
      },
      {
        path: '/opex/report/NOx',
        code: 'NOx',
        component: ()=>import('@/views/report/NO/index.vue'),
        meta: { title: 'NOx校准'},
      },
      {
        path: '/opex/report/CO',
        code: 'CO',
        component: ()=>import('@/views/report/CO/index.vue'),
        meta: { title: 'CO校准'},
      },
      {
        path: '/opex/report/O3',
        code: 'O₃',
        component: ()=>import('@/views/report/O3/index.vue'),
        meta: { title: 'O₃校准'},
      },
      {
        path: '/opex/report/pm10',
        code: 'βPM10',
        component: ()=>import('@/views/report/PM10/index.vue'),
        meta: { title: 'PM₁₀巡检'},
      },
      {
        path: '/opex/report/pm25',
        code: 'βPM25',
        component: ()=>import('@/views/report/PM25/index.vue'),
        meta: { title: 'PM₂.₅巡检'},
      },
    ]
  },
  {
    path: '/opex/report/month',
    code: 'OpexReportMonth',
    component: ()=>import('@/views/report/routerView/index.vue'),
    alwaysShow: true,
    meta: { title: '月报'},
    children: [
      {
        path: '/opex/report/NC/pm10test',
        code: 'NCTest',
        component: ()=>import('@/views/report/pm25control/index.vue'),
        meta: { title: 'PM₁₀质控' },
      },
      {
        path: '/opex/report/NC/pm25test',
        code: 'NCTest',
        component: ()=>import('@/views/report/pm25control/index.vue'),
        meta: { title: 'PM₂.₅质控' },
      },
    ]
  },
  {
    path: '/opex/report/season',
    code: 'OpexReportSeason',
    component: ()=>import('@/views/report/routerView/index.vue'),
    alwaysShow: true,
    meta: { title: '季报'},
    children: [
      {
        path: '/opex/report/so/check',
        code: 'SoCheck',
        component: ()=>import('@/views/report/soCheck/index.vue'),
        meta: { title: 'SO₂精密度'},
      },
      {
        path: '/opex/report/NOx/check', 
        code: 'NOCheck',
        component: ()=>import('@/views/report/noCheck/index.vue'),
        meta: { title: 'NOx精密度'},
      },
      {
        path: '/opex/report/co/check',
        code: 'CoCheck',
        component: ()=>import('@/views/report/coCheck/index.vue'),
        meta: { title: 'CO精密度'},
      },
      {
        path: '/opex/report/O3/check',
        code: 'O₃Check',
        component: ()=>import('@/views/report/o3Check/index.vue'),
        meta: { title: 'O₃精密度'},
      },
    ]
  },
  {
    path: '/opex/report/half',
    code: 'OpexReportHalf',
    component: ()=>import('@/views/report/routerView/index.vue'),
    alwaysShow: true,
    meta: { title: '半年报'},
    children: [
      {
        path: '/opex/report/so/multipoint',
        code: 'SoMultipoint',
        component: ()=>import('@/views/report/soPoint/index.vue'),
        meta: { title: 'SO₂多点'},
      },
      {
        path: '/opex/report/NO/multipoint',
        code: 'NOMultipoint',
        component: ()=>import('@/views/report/noPoint/index.vue'),
        meta: { title: 'NOx多点'},
      },
      {
        path: '/opex/report/co/multipoint',
        code: 'CoMultipoint',
        component: ()=>import('@/views/report/coPoint/index.vue'),
        meta: { title: 'CO多点'},
      },
      {
        path: '/opex/report/O/multipoint',
        code: 'O₃Multipoint',
        component: ()=>import('@/views/report/o3Point/index.vue'),
        meta: { title: 'O₃多点'},
      },
    ]
  },
  {
    path: '/opex/report/year',
    code: 'OpexReportYear',
    component: ()=>import('@/views/report/routerView/index.vue'),
    alwaysShow: true,
    meta: { title: '年报'},
    children: [
      {
        path: '/opex/report/so/truely',
        code: 'SoMultipoint',
        component: ()=>import('@/views/report/soTruely/index.vue'),
        meta: { title: 'SO₂准确度'},
      },
      {
        path: '/opex/report/NO/truely',
        code: 'NOMultipoint',
        component: ()=>import('@/views/report/noTruely/index.vue'),
        meta: { title: 'NOx准确度'},
      },
      {
        path: '/opex/report/co/truely',
        code: 'CoMultipoint',
        component: ()=>import('@/views/report/coTruely/index.vue'),
        meta: { title: 'CO准确度'},
      },
      {
        path: '/opex/report/O3/truely',
        code: 'O₃Multipoint',
        component: ()=>import('@/views/report/o3Truely/index.vue'),
        meta: { title: 'O₃准确度'},
      },
      {
        path: '/opex/report/NO/transfer',
        code: 'NOxTransfer',
        component: ()=>import('@/views/report/transfer/index.vue'),
        meta: { title: 'NOx转换率' },
      },
      {
        path: '/opex/report/power',
        code: 'βPower',
        component: ()=>import('@/views/report/o3Power/index.vue'),
        meta: { title: 'O₃量值传递'},
      },
    ]
  },
]
export default reportRouter
