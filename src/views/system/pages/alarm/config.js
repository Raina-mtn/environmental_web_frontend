// import {isOrNotNormalObj} from '@/utils/config'

export const formColumns = []
export const tableColumns = (that) => [
  {
    label: '属性',
    prop: 'attribute'
  },
  {
    label: "阈值（下限）",
    prop:'minValue',
    render: (h, { row }) => {
      return (
        <span>{ row.minValue }{ row.minValue ? row.dataUnit : '' }</span>
      )
    },
  },
  {
    label: "阈值（上限）",
    prop:'maxValue',
    render: (h, { row }) => {
      return (
        <span>{ row.maxValue }{ row.maxValue ? row.dataUnit : '' }</span>
      )
    },
  },
  {
    label: "操作",
    render: (h, { row }) => {
      return [
        <el-link type="primary" underline={false} onClick={()=>{that.handleEdit(row)}}>编辑</el-link>,
      ];
    },
  },
];