import Vue from "vue";
import VueRouter from "vue-router";
import Layout from '@/components/Layout.vue'
import reportRouter from './opex'

Vue.use(VueRouter);
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}

export const asyncRoutes = [{
  path: '/equipment',
  code: 'Equipment',
  component: ()=>import('@/components/PageLayout.vue'),
  meta: { title: '设备中心', icon:'icon-shebeiguanli' },
  children:[
    {
      path: '/robot-list',
      code: 'RobotList',
      component: ()=>import('@/views/equipment/robotList/index.vue'),
      meta: { title: '机器人设备'},
    },
    {
      path: '/robot',
      code: 'Robot',
      hidden: true,
      component: ()=>import('@/views/equipment/robotManage/index.vue'),
      meta: { title: '机器人详情'},
    },
    {
      path: '/instrument-list',
      code: 'InstrumentList',
      component: ()=>import('@/views/equipment/instrument/index.vue'),
      meta: { title: '仪器设备'},
    },
    // {
    //   path: '/affiliate',
    //   code: 'Affiliate',
    //   component: ()=>import('@/views/equipment/affiliate/index.vue'),
    //   meta: { title: '附属设备'},
    // },
    {
      path: '/rotating',
      code: 'Rotating',
      component: ()=>import('@/views/equipment/rotating/index.vue'),
      meta: { title: '动环设备'},
    },
    {
      path: '/fence',
      code: 'Fence',
      component: ()=>import('@/views/equipment/fence/index.vue'),
      meta: { title: '电子围栏'},
    },
    {
      path: '/upperAir',
      code: 'UpperAir',
      component: ()=>import('@/views/equipment/upperAir/index.vue'),
      meta: { title: '防人为干扰'},
    },
    {
      path: '/pipe',
      code: 'pipe',
      component: ()=>import('@/views/equipment/pipe/index.vue'),
      meta: { title: '管路自诊断'},
    },
  ]
},
{
  path: '/quality',
  code: 'Quality',
  component: ()=>import('@/components/PageLayout.vue'),
  alwaysShow: false,
  hidden: true,
  meta: { title: '质控中心', icon:'icon-zhikong'},
  children:[
    {
      path: '/quality/plan',
      code: 'QualityPlan',
      component: ()=>import('@/views/quality/plan/index.vue'),
      meta: { title: '质控计划'},
    },
    {
      path: '/quality/task',
      code: 'Task',
      component: ()=>import('@/views/quality/task/index.vue'),
      meta: { title: '质控任务'},
    },
    {
      path: '/quality/record',
      name: 'QualityRecord',
      code: 'Record',
      component: ()=>import('@/views/quality/record/index.vue'),
      meta: { title: '质控记录'},
    },
  ]
},
{
  path: '/opex',
  code: 'Opex',
  component: ()=>import('@/components/PageLayout.vue'),
  alwaysShow: true,
  meta: { title: '运维中心', icon:'icon-yunweiguanli'},
  children:[
    {
      path: '/opex/manage',
      code: 'OpexManage',
      component: ()=>import('@/views/report/routerView/index.vue'),
      meta: { title: '运维管理'},
      children: [
        {
          path: '/opex/design',
          code: 'Design',
          component: ()=>import('@/views/task/plan/planList.vue'),
          meta: { title: '运维计划'},
        },
        {
          path: '/opex/calendar',
          code: 'Calendar',
          component: ()=>import('@/views/task/plan/calendar.vue'),
          hidden: true,
          meta: {title: '日历视图',activeMenu:'/plan'},
        },
        {
          path: '/opex/job',
          code: 'Job',
          component: ()=>import('@/views/pollingManage/taskList/index.vue'),
          meta: { title: '运维任务'},
        },
        {
          path: '/opex/log',
          name: 'OpexLog',
          code: 'Log',
          component: ()=>import('@/views/pollingManage/resultList/index.vue'),
          meta: { title: '运维记录'},
        },
        {
          path: '/datacenter/teaching',
          code: 'Teaching',
          component: ()=>import('@/views/Developing/index.vue'),
          meta: { title: '运维教学'},
        }
      ]
    },
    {
      path: '/opex/quality',
      code: 'OpexQuality',
      component: ()=>import('@/views/report/routerView/index.vue'),
      meta: { title: '质控管理'},
      children: [
        {
          path: '/quality/plan',
          code: 'QualityPlan',
          component: ()=>import('@/views/quality/plan/index.vue'),
          meta: { title: '质控计划'},
        },
        {
          path: '/quality/task',
          code: 'Task',
          component: ()=>import('@/views/quality/task/index.vue'),
          meta: { title: '质控任务'},
        },
        {
          path: '/quality/record',
          name: 'QualityRecord',
          code: 'Record',
          component: ()=>import('@/views/quality/record/index.vue'),
          meta: { title: '质控记录'},
        },
      ]
    },
    {
      path: '/opex/report',
      code: 'OpexReport',
      component: ()=>import('@/views/report/routerView/index.vue'),
      alwaysShow: true,
      meta: { title: '报表管理'},
      children: reportRouter
    },
  ]
},
{
  path: '/datacenter',
  code: 'Datacenter',
  component: ()=>import('@/components/PageLayout.vue'),
  alwaysShow: true,
  meta: { title: '数据中心', icon:'icon-shujuku'},
  children:[
    {
      path: '/datacenter/monitor',
      code: 'Monitor',
      component: ()=>import('@/views/datacenter/dataMonitoring/index.vue'),
      meta: { title: '监测数据'},
    },
    {
      path: '/datacenter/examine',
      code: 'Examine',
      component: ()=>import('@/views/datacenter/dynamic/index.vue'),
      meta: { title: '环境监控'},
    },
    {
      path: '/datacenter/key',
      code: 'Key',
      component: ()=>import('@/views/datacenter/key/index.vue'),
      meta: { title: '关键参数'},
    },
  ]
},
{
  path: '/pollingManage',
  code: 'PollingManage',
  component: ()=>import('@/components/PageLayout.vue'),
  alwaysShow: false,
  hidden: true,
  meta: { title: '巡检管理', icon:'icon-xunjianguanli'},
  children:[
    // {
    //   path: '/taskList',
    //   code: 'TaskList',
    //   component: ()=>import('@/views/pollingManage/taskList/index.vue'),
    //   meta: { title: '任务执行列表'},
    // },
    {
      path: '/resultList',
      code: 'ResultList',
      component: ()=>import('@/views/pollingManage/resultList/index.vue'),
      meta: { title: '巡检结果列表'},
    },
    {
      path: '/report',
      code: 'Report',
      component: ()=>import('@/views/pollingManage/report/index.vue'),
      meta: { title: '监测报告'},
    },
  ]
},
{
  path: '/warning',
  code: 'Warning',
  component: ()=>import('@/components/PageLayout.vue'),
  alwaysShow: true,
  meta: { title: '预警中心', icon:'icon-yujing'},
  children:[
    {
      path: '/warning/device',
      code: 'Device',
      component: ()=>import('@/views/Developing/index.vue'),
      meta: { title: '设备预警'},
    },
    {
      path: '/warning/data',
      code: 'WarningData',
      component: ()=>import('@/views/Developing/index.vue'),
      meta: { title: '数据预警'},
    },
    {
      path: '/warning/invadeList',
      code: 'InvadeList',
      component: ()=>import('@/views/operationManage/invadeList/index.vue'),
      meta: { title: '人为干扰预警'},
    }
  ]
},
{
  path: '/evaluate',
  code: 'Evaluate',
  component: ()=>import('@/components/PageLayout.vue'),
  alwaysShow: true,
  meta: { title: '评价中心', icon:'icon-pingjia'},
  children:[
    {
      path: '/evaluate/health',
      code: 'Health',
      component: ()=>import('@/views/Developing/index.vue'),
      meta: { title: '设备健康评价'},
    },
    {
      path: '/evaluate/power',
      code: 'Power',
      component: ()=>import('@/views/Developing/index.vue'),
      meta: { title: '运维能力评价'},
    }
  ]
},
// {
//   path: '/report',
//   code: 'Report',
//   component: ()=>import('@/components/PageLayout.vue'),
//   alwaysShow: true,
//   meta: { title: '报表中心', icon:'icon-baobiaoguanli'},
//   children: reportRouter
// },
{
  path: '/station',
  code: 'Station',
  component: ()=>import('@/components/PageLayout.vue'),
  alwaysShow: false,
  hidden: true,
  meta: { title: '站点管理', icon:'icon-zhandianguanli'},
  children:[
    {
      path: '/stationList',
      code: 'StationList',
      component: ()=>import('@/views/station/index.vue'),
      meta: { title: '站点列表'},
    },
  ]
},
{
  path: '/userManage',
  code: 'UserManage',
  component: ()=>import('@/components/PageLayout.vue'),
  alwaysShow: false,
  hidden: true,
  meta: { title: '用户管理', icon:'icon-yonghu'},
  children:[
    {
      path: '/user',
      code: 'User',
      component: ()=>import('@/views/userManage/userManage/index.vue'),
      meta: { title: '用户管理'},
    },
    // {
    //   path: '/role',3655126008
    //   code: 'Role',
    //   component: ()=>import('@/views/userManage/roleManage/index.vue'),
    //   meta: { title: '角色管理'},
    // }
  ]
},
{
  path: '/system',
  code: 'System',
  component: ()=>import('@/components/PageLayout.vue'),
  alwaysShow: false,
  hidden: true,
  meta: { title: '系统设置', icon:'icon-xitongguanli'},
  children:[
    {
      path: '/system-setting',
      code: 'SystemSetting',
      component: ()=>import('@/views/system/index.vue'),
      meta: { title: '系统设置' },
    },
    {
      path: '/project-setting',
      code: 'ProjectSetting',
      component: ()=>import('@/views/system/pages/project/index.vue'),
      hidden: true,
      meta: { title: '运维内容设置' },
    },
    {
      path: '/quality-setting',
      code: 'QualitySetting',
      // component: ()=>import('@/views/Developing/index.vue'),
      component: ()=>import('@/views/system/pages/quality/index.vue'),
      hidden: true,
      meta: { title: '质控内容设置' },
    },
    {
      path: '/instrument-setting',
      code: 'InstrumentSetting',
      component: ()=>import('@/views/system/pages/instrument/index.vue'),
      hidden: true,
      meta: { title: '仪器设置' },
    },
    // {
    //   path: '/task-setting',
    //   code: 'TaskSetting',
    //   component: ()=>import('@/views/system/pages/task/index.vue'),
    //   hidden: true,
    //   meta: { title: '自动任务配置' },
    // },
    {
      path: '/point-setting',
      code: 'PointSetting',
      component: ()=>import('@/views/system/pages/point/index.vue'),
      hidden: true,
      meta: { title: '点位设置' },
    },
    {
      path: '/alarm-setting',
      code: 'AlarmSetting',
      component: ()=>import('@/views/system/pages/alarm/index.vue'),
      hidden: true,
      meta: { title: '告警设置' },
    }
  ]
}]
export const constantRoutes = [
  {
    path: "/",
    component: Layout,
    name: 'index',
    redirect: "/login",
    children: asyncRoutes
  },{
    path: "/dashboard",
    component: ()=>import('@/views/dashboard/stationBoard/index.vue'),
    name: 'Dashboard'
  },{
    path: "/compositeboard",
    component: ()=>import('@/views/dashboard/compositeBoard/index.vue'),
    name: 'Compositeboard'
  },
  {
    path: "/login",
    component: () => import("@/views/Login.vue")
  },
];

export default new VueRouter({
  routes:constantRoutes
})
