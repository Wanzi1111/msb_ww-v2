import request from "@/utils/request";

// 新增
export function pubAddAPI(data) {
  return request({
    url: "/message/pub",
    method: "post",
    data,
  });
}

// 编辑 发布也可使用
export function pubEditAPI(data) {
  return request({
    url: "/message/pub",
    method: "put",
    data,
  });
}

// 定向批量发送消息-内部使用
export function directBatchSendAPI(data) {
  return request({
    url: "/message/pub/directBatchSend",
    method: "post",
    data,
  });
}

// 发布消息列表
export function listAPI(params) {
  return request({
    url: "/message/pub/list",
    method: "get",
    params,
  });
}

// 查看
export function pubDetailAPI(id) {
  return request({
    url: `/message/pub/${id}`,
    method: "get",
  });
}
