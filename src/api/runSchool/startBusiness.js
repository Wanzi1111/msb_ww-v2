import request from "@/utils/request";

// 获取-创业-列表
export function getStartupList(params) {
  return request({
    url: "/v1/achievement/startup/list",
    method: "get",
    params,
  });
}

// 新增-创业
export function addOrUpdateStartup(data) {
  return request({
    url: "/v1/achievement/addOrUpdateStartup",
    method: "post",
    data,
  });
}


// 删除-创业
export function batchDelStartup(params) {
  return request({
    url: "/v1/achievement/batchDelStartup",
    method: "get",
    params,
  });
}

// 导出-创业
export function exportStartup(data) {
  return request({
    url: "/v1/achievement/exportStartup",
    method: "post",
    responseType: 'blob',
    data,
  });
}

// 获取-创业 详情
export function getStartupInfo(params) {
  return request({
    url: "/v1/achievement/getStartupInfo",
    method: "get",
    params,
  });
}


// 导入-创业
export function importStartup(data) {
  return request({
    url: "/v1/achievement/importStartup",
    method: "post",
    headers: { 'Content-Type' : 'multipart/form-data' },
    data,
  });
}

// 更新-创业
export function updateStartupStatus(data) {
  return request({
    url: "/v1/achievement/updateStartupStatus",
    method: "post",
    data,
  });
}


// 获取就业-列表
export function getEmploymentList(params) {
  return request({
    url: "/v1/achievement/employment/list",
    method: "get",
    params,
  });
}

// 新增就业
export function addOrUpdateEmployment(data) {
  return request({
    url: "/v1/achievement/addOrUpdateEmployment",
    method: "post",
    data,
  });
}


// 删除就业
export function batchDelEmployment(params) {
  return request({
    url: "/v1/achievement/batchDelEmployment",
    method: "get",
    params,
  });
}

// 导出就业
export function exportEmployment(data) {
  return request({
    url: "/v1/achievement/exportEmployment",
    method: "post",
    responseType: 'blob',
    data,
  });
}

// 获取就业 详情
export function getEmploymentInfo(params) {
  return request({
    url: "/v1/achievement/getEmploymentInfo",
    method: "get",
    params,
  });
}


// 导入就业
export function importEmployment(data) {
  return request({
    url: "/v1/achievement/importEmployment",
    method: "post",
    headers: { 'Content-Type' : 'multipart/form-data' },
    data,
  });
}

// 更新就业
export function updateEmploymentStatus(data) {
  return request({
    url: "/v1/achievement/updateEmploymentStatus",
    method: "post",
    data,
  });
}
