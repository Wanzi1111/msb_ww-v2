import request from "@/utils/request";

// 全部已读
export function hadReadAPI(params) {
  return request({
    url: "/message/user/hadRead",
    method: "get",
    params,
  });
}

// 我的消息-列表
export function listAPI(data) {
  return request({
    url: "/message/user/list",
    method: "post",
    data,
  });
}

// 查看消息
export function userIdAPI(id) {
  return request({
    url: `/message/user/${id}`,
    method: "get",
  });
}
