import {isOrNotNormalObj} from '@/utils/config'

export const formColumns =(deviceList) => [{
  label: '任务执行编号',
  prop: 'idLike',
  el: 'input',
  placeholder: '请输入运维编号',
  clearable: true,
  span: 6
},{
  label: '任务名称',
  prop: 'taskName',
  el: 'input',
  placeholder: '请输入任务名称',
  clearable: true,
  span: 6
},{
  label: '运维结果',
  prop: 'status',
  el: 'select',
  options:[
    {
      label:'正常',
      value:0
    },
    {
      label:'未识别',
      value:1
    },
    {
      label:'异常',
      value:2
    },
  ],
  placeholder: '请选择',
  clearable: true,
  span: 6
},{
  label: '运维类型',
  prop: 'status',
  el: 'select',
  options:[
    {
      label:'正常',
      value:0
    },
    {
      label:'未识别',
      value:1
    },
    {
      label:'异常',
      value:2
    },
  ],
  placeholder: '请选择',
  clearable: true,
  span: 6
},{
  label: '运维内容',
  prop: 'deviceId',
  el: 'select',
  getList: ()=>(deviceList),
  options:deviceList,
  // async () => ({
  //   data: (await apiGetDeviceList({pageNum: 1,pageSize: 1000,stationId:stationId})).data,
  // }),
  'value-key': {
    label: 'deviceName',
    value: 'deviceId'
  },
  placeholder: '请选择巡检点',
  clearable: true,
  span: 6
},{
  label: '运维时间',
  prop: 'minStartTime,maxStartTime',
  el: 'date-picker',
  type:"daterange",
  placeholder: '请选择运维时间',
  valueFormat: 'yyyy-MM-dd HH:mm:ss',
  clearable: true,
  span: 6
},{
  prop:'btns',
  span:4
}
]
export const tableColumns = (that) => [
  {
    label: '运维编号',
    prop: 'code'
  },
  {
    label: "运维项目名称",
    prop:'title'
  },
  {
    label: "运维人员",
    prop:'operator'
  },
  {
    label: "工作描述",
    prop:'content'
  },
  {
    label: '运维开始时间',
    prop: 'startTime'
  },
  {
    label: '运维结束时间',
    prop: 'endTime'
  }, 
  {
    label: '运维分析结果',
    render(h,{row}) {
      return (
        <el-tag size="small" type={row.analysisResult==='NORMAL'?'success':'danger'}>
          { isOrNotNormalObj[row.analysisResult] }
        </el-tag>
      )
    }
  }, 
  {
    label: "操作",
    width: 240,
    render: (h, { row }) => {
      return [
        <el-link style="margin-right:16px;" type="primary" underline={false} onClick={()=>{that.$refs.detailDialog.openDialog(row)}}>运维详情</el-link>,
        <el-link style="margin-right:16px;" type="primary" underline={false} onClick={()=>{that.$refs.detailDialog.openDialog(row)}}>编辑</el-link>,
        <el-link style="margin-right:16px;" type="primary" underline={false} onClick={()=>{that.$refs.detailDialog.openDialog(row)}}>删除</el-link>,
      ];
    },
  },
];