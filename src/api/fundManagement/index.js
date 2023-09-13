import request from "@/utils/request";

// 新增集团经费收入
export function expenditureInAPI(data) {
  return request({
    url: "/expenditure/in",
    method: "post",
    data,
  });
}

// 修改集团经费收入
export function expenditureInEditAPI(data) {
  return request({
    url: "/expenditure/in",
    method: "put",
    data,
  });
}

// 导出集团经费收入列表
export function expenditureInExportAPI(data) {
  return request({
    url: "/expenditure/in/export",
    method: "post",
    data,
  });
}

// 查询集团经费收入列表
export function expenditureInListAPI(params) {
  return request({
    url: "/expenditure/in/list",
    method: "get",
    params,
  });
}
