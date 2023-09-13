import request from "@/utils/request";

// 新增-编辑关注合作类别
export function addOrUpdateTypeAPI(data) {
  return request({
    url: "/v1/cooperative/addOrUpdateType",
    method: "post",
    data,
  });
}

// 新增-编辑意向合作区域
export function addOrUpdateAreaAPI(data) {
  return request({
    url: "/v1/cooperative/addOrUpdateArea",
    method: "post",
    data,
  });
}

// 新增-编辑意向合作单位类型与级别
export function addOrUpdateLevelAPI(data) {
  return request({
    url: "/v1/cooperative/addOrUpdateLevel",
    method: "post",
    data,
  });
}

// 获取关注合作类别详细信息
export function getTypeInfoAPI(params) {
  return request({
    url: "/v1/cooperative/getTypeInfo",
    method: "get",
    params,
  });
}

// 获取意向合作区域详细信息
export function getAreaInfoAPI(params) {
  return request({
    url: "/v1/cooperative/getAreaInfo",
    method: "get",
    params,
  });
}

// 获取意向合作单位类型与级别详细信息
export function getLevelInfoAPI(params) {
  return request({
    url: "/v1/cooperative/getLevelInfo",
    method: "get",
    params,
  });
}

// 新增-编辑师资信息
export function addOrUpdateTeacherAPI(data) {
  return request({
    url: "/v1/cooperative/addOrUpdateTeacher",
    method: "post",
    data,
  });
}

// 获取师资列表信息
export function getTeacherListAPI(params) {
  return request({
    url: "/v1/cooperative/getTeacherList",
    method: "get",
    params,
  });
}

// 删除老师
export function delTeacherInfoAPI(params) {
  return request({
    url: "/v1/cooperative/delTeacherInfo",
    method: "post",
    params,
  });
}

// 新增资料
export function addMaterialAPI(data) {
  return request({
    url: "/v1/cooperative/addMaterial",
    method: "post",
    data,
  });
}

// 删除资料
export function delMaterialInfoAPI(params) {
  return request({
    url: "/v1/cooperative/delMaterialInfo",
    method: "post",
    params,
  });
}

// 资料列表
export function getMaterialListAPI(params) {
  return request({
    url: "/v1/cooperative/getMaterialList",
    method: "get",
    params,
  });
}

// 合作单位列表
export function getCompanyListAPI(params) {
  return request({
    url: "/v1/cooperative/getCompanyList",
    method: "get",
    params,
  });
}

// 编辑合作单位
export function updateCompanyAPI(data) {
  return request({
    url: "/v1/cooperative/updateCompany",
    method: "post",
    data,
  });
}
