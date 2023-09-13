import request from "@/utils/request";

// 媒体宣传列表
export function getCoverageList(params) {
  return request({
    url: "/v1/influence/coverage/list",
    method: "get",
    params,
  });
}

// 经验交流列表
export function getExchageList(params) {
  return request({
    url: "/v1/influence/exchange/list",
    method: "get",
    params,
  });
}


// 新增-编辑媒体宣传
export function addOrUpdateCoverage(data) {
  return request({
    url: "/v1/influence/addOrUpdateCoverage",
    method: "post",
    data,
  });
}

// 新增-编辑经验交流
export function addOrUpdateExchange(data) {
  return request({
    url: "/v1/influence/addOrUpdateExchange",
    method: "post",
    data,
  });
}

// 删除-媒体宣传
export function batchDelCoverage(params) {
  return request({
    url: "/v1/influence/batchDelCoverage",
    method: "post",
    params,
  });
}

// 删除-经验交流
export function batchDelExchange(params) {
  return request({
    url: "/v1/influence/batchDelExchange",
    method: "get",
    params,
  });
}

// 导出媒体宣传
export function exportCoverage(data) {
  return request({
    url: "/v1/influence/exportCoverage",
    method: "post",
    responseType: 'blob',
    data,
  });
}

// 导出经验交流
export function exportExchange(data) {
  return request({
    url: "/v1/influence/exportExchange",
    method: "post",
    responseType: 'blob',
    data,
  });
}

// 获取媒体宣传列表详细信息
export function getCoverageInfo(params) {
  return request({
    url: "/v1/influence/getCoverageInfo",
    method: "get",
    params,
  });
}

// 获取经验交流列表详细信息
export function getExchangeInfo(params) {
  return request({
    url: "/v1/influence/getExchangeInfo",
    method: "get",
    params,
  });
}


// 导入媒体宣传
export function importCoverage(data) {
  return request({
    url: "/v1/influence/importCoverage",
    method: "post",
    headers: { 'Content-Type' : 'multipart/form-data' },
    data,
  });
}

// 导入经验交流
export function importExchange(data) {
  return request({
    url: "/v1/influence/importExchange",
    method: "post",
    headers: { 'Content-Type': 'multipart/form-data' },
    data,
  });
}

// 更新媒体宣传状态
export function updateCoverageStatus(data) {
  return request({
    url: "/v1/influence/updateCoverageStatus",
    method: "post",
    data,
  });
}

// 更新经验交流状态
export function updateExchangeStatus(data) {
  return request({
    url: "/v1/influence/updateExchangeStatus",
    method: "post",
    data,
  });
}
