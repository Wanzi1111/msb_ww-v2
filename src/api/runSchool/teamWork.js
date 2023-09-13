import request from "@/utils/request";

// 国际合作列表
export function getCollaborationList(params) {
  return request({
    url: "/v1/achievement/collaboration/list",
    method: "get",
    params,
  });
}

// 新增-国际合作
export function addOrUpdateCollaboration(data) {
  return request({
    url: "/v1/achievement/addOrUpdateCollaboration",
    method: "post",
    data,
  });
}


// 删除-国际合作
export function batchDelCollaboration(params) {
  return request({
    url: "/v1/achievement/batchDelCollaboration",
    method: "get",
    params,
  });
}

// 导出-国际合作
export function exportCollaboration(data) {
  return request({
    url: "/v1/achievement/exportCollaboration",
    method: "post",
    responseType: 'blob',
    data,
  });
}

// 获取国际合作详情
export function getCollaborationInfo(params) {
  return request({
    url: "/v1/achievement/getCollaborationInfo",
    method: "get",
    params,
  });
}


// 导入国际合作
export function importCollaboration(data) {
  return request({
    url: "/v1/achievement/importCollaboration",
    method: "post",
    headers: { 'Content-Type' : 'multipart/form-data' },
    data,
  });
}

// 更新国际合作
export function updateCollaborationStatus(data) {
  return request({
    url: "/v1/achievement/updateCollaborationStatus",
    method: "post",
    data,
  });
}