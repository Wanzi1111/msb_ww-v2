import request from "@/utils/request";

// 获取-技能鉴定-列表
export function getVerifyList(params) {
  return request({
    url: "/v1/achievement/verify/list",
    method: "get",
    params,
  });
}

// 新增-技能鉴定
export function addOrUpdateVerify(data) {
  return request({
    url: "/v1/achievement/addOrUpdateVerify",
    method: "post",
    data,
  });
}


// 删除-技能鉴定
export function batchDelVerify(params) {
  return request({
    url: "/v1/achievement/batchDelVerify",
    method: "get",
    params,
  });
}

// 导出-技能鉴定
export function exportVerify(data) {
  return request({
    url: "/v1/achievement/exportVerify",
    method: "post",
    responseType: 'blob',
    data,
  });
}

// 获取-技能鉴定 详情
export function getVerifyInfo(params) {
  return request({
    url: "/v1/achievement/getVerifyInfo",
    method: "get",
    params,
  });
}


// 导入-技能鉴定
export function importVerify(data) {
  return request({
    url: "/v1/achievement/importVerify",
    method: "post",
    headers: { 'Content-Type' : 'multipart/form-data' },
    data,
  });
}

// 更新-技能鉴定
export function updateVerifyStatus(data) {
  return request({
    url: "/v1/achievement/updateVerifyStatus",
    method: "post",
    data,
  });
}