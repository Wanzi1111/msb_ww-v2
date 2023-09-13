import request from "@/utils/request";

// 集团简介信息新增保存
export function introAPI(data) {
  return request({
    url: "/group/intro",
    method: "post",
    data,
  });
}

// 集团简介信息修改保存
export function introEditAPI(data) {
  return request({
    url: "/group/intro",
    method: "put",
    data,
  });
}

// 集团简介信息查询
export function getInfoBySystemCodeAPI(params) {
  return request({
    url: "/group/intro/getInfoBySystemCode",
    method: "get",
    params,
  });
}

// 集团基本信息添加
export function baseAPI(data) {
  return request({
    url: "/v1/group/base",
    method: "post",
    data,
  });
}

// 集团基本信息修改保存
export function baseEditAPI(data) {
  return request({
    url: "/v1/group/base",
    method: "put",
    data,
  });
}

// 获取集团相关字典
export function getGroupDictAPI(params) {
  return request({
    url: "/v1/group/base/getGroupDict",
    method: "get",
    params,
  });
}

// 集团基本信息查询
export function getBaseInfoBySystemCodeAPI(params) {
  return request({
    url: "/v1/group/base/getInfoBySystemCode",
    method: "get",
    params,
  });
}

// 新增集团联系信息
export function contactAPI(data) {
  return request({
    url: "/v1/group/contact",
    method: "post",
    data,
  });
}

// 集团联系信息修改保存
export function contactEditAPI(data) {
  return request({
    url: "/v1/group/contact",
    method: "put",
    data,
  });
}

// 集团联系信息查询
export function getContactInfoBySystemCodeAPI(params) {
  return request({
    url: "/v1/group/contact/getInfoBySystemCode",
    method: "get",
    params,
  });
}
