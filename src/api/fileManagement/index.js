import request from "@/utils/request";

// 查询所有文件管理列表
export function listAPI(params) {
  return request({
    url: "/system/management/list",
    method: "get",
    params,
  });
}

// 新增
export function addManagementAPI(data) {
  return request({
    url: "/system/management",
    method: "post",
    data,
  });
}

// 修改
export function editManagementAPI(data) {
  return request({
    url: "/system/management",
    method: "put",
    data,
  });
}
