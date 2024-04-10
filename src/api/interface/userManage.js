import {defHttp} from '@/api/http'
// 组织架构查询
export const apiGetOrganizationTree = (params)=>{
  return defHttp.post({
    url:'/robot-auth/organization/tree',
    params
  })
}
// 组织架构-新增
export const apiCreateOrganizationTree = (params)=>{
  return defHttp.post({
    url:'/robot-auth/organization/create',
    params
  })
}
// 组织架构-编辑
export const apiUpdateOrganizationTree = (params)=>{
  return defHttp.post({
    url:'/robot-auth/organization/update',
    params
  })
}
// 组织架构-删除
export const apiDeleteOrganizationTree = (params)=>{
  return defHttp.post({
    url:'/robot-auth/organization/delete',
    params
  })
}
// 新增用户
export const apiAddUser = (params)=>{
  return defHttp.post({
    url:'/robot-auth/sysUser/addUser',
    params
  })
}
// 更新用户
export const apiUpdateUser = (params)=>{
  return defHttp.post({
    url:'/robot-auth/sysUser/updateUser',
    params
  })
}
// 删除用户
export const apiDeleteUser = (params)=>{
  return defHttp.post({
    url:'/robot-auth/sysUser/deleteUser',
    params
  })
}
// 修改密码
export const apiChangePassword = (params)=>{
  return defHttp.post({
    url:'/robot-auth/sysUser/changePassword',
    params
  })
}
// 用户列表
export const apiGetUserList = (params)=>{
  return defHttp.post({
    url:'/robot-auth/sysUser/listByPage',
    params
  })
}
// 角色下拉框
export const apiGetAllRoleList = (params)=>{
  return defHttp.get({
    url:'/robot-auth/roles/listAll',
    params
  })
}
// 角色列表
export const apiGetRoleList = (params)=>{
  return defHttp.post({
    url:'/robot-auth/roles/listByPage',
    params
  })
}
// 新增角色
export const apiAddRole = (params)=>{
  return defHttp.post({
    url:'/robot-auth/roles/addRole',
    params
  })
}
// 修改角色
export const apiUpdateRole = (params)=>{
  return defHttp.post({
    url:'/robot-auth/roles/modifyRole',
    params
  })
}
// 删除角色
export const apiDeleteRole = (params)=>{
  return defHttp.post({
    url:'/robot-auth/roles/delete',
    params
  })
}
// 角色树
export const apiGetRoleTree = (params)=>{
  return defHttp.get({
    url:'/robot-auth/permissions/tree-select',
    params
  })
}
// 角色授权
export const apiSetRole = (params)=>{
  return defHttp.post({
    url:'/robot-auth/roles/modifyPermissions',
    params
  })
}
// 角色授权
export const apiGetpermissions = (params)=>{
  return defHttp.post({
    url:'/robot-auth/roles/permissions',
    params
  })
}