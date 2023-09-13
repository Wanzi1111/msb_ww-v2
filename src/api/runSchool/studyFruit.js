import request from "@/utils/request";

// 获取-发表成果-列表
export function getPublishList(params) {
  return request({
    url: "/v1/achievement/publish/list",
    method: "get",
    params,
  });
}

// 新增-发表成果
export function addOrUpdatePublish(data) {
  return request({
    url: "/v1/achievement/addOrUpdatePublish",
    method: "post",
    data,
  });
}

// 删除-发表成果
export function batchDelPublish(params) {
  return request({
    url: "/v1/achievement/batchDelPublish",
    method: "get",
    params,
  });
}

// 导出-发表成果
export function exportPublish(data) {
  return request({
    url: "/v1/achievement/exportPublish",
    method: "post",
    responseType: 'blob',
    data,
  });
}

// 获取-发表成果 详情
export function getPublishInfo(params) {
  return request({
    url: "/v1/achievement/getPublishInfo",
    method: "get",
    params,
  });
}


// 导入-发表成果
export function importPublish(data) {
  return request({
    url: "/v1/achievement/importPublish",
    method: "post",
    headers: { 'Content-Type' : 'multipart/form-data' },
    data,
  });
}

// 更新-发表成果
export function updatePublishStatus(data) {
  return request({
    url: "/v1/achievement/updatePublishStatus",
    method: "post",
    data,
  });
}


// 获取-获取成果-列表
export function getAchievementList(params) {
  return request({
    url: "/v1/achievement/achievement/list",
    method: "get",
    params,
  });
}

// 新增-获取成果
export function addOrUpdateAchievement(data) {
  return request({
    url: "/v1/achievement/addOrUpdateAchievement",
    method: "post",
    data,
  });
}

// 删除-获取成果
export function batchDelAchievement(params) {
  return request({
    url: "/v1/achievement/batchDelAchievement",
    method: "get",
    params,
  });
}

// 导出-获取成果
export function exportAchievement(data) {
  return request({
    url: "/v1/achievement/exportAchievement",
    method: "post",
    responseType: 'blob',
    data,
  });
}

// 获取-获取成果-详情
export function getAchievementInfo(params) {
  return request({
    url: "/v1/achievement/getAchievementInfo",
    method: "get",
    params,
  });
}


// 导入-获取成果
export function importAchievement(data) {
  return request({
    url: "/v1/achievement/importAchievement",
    method: "post",
    headers: { 'Content-Type' : 'multipart/form-data' },
    data,
  });
}

// 更新-获取成果
export function updateAchievementStatus(data) {
  return request({
    url: "/v1/achievement/updateAchievementStatus",
    method: "post",
    data,
  });
}
