import request from "@/utils/request";

// 工作台-获取消息数
export function getMsgCountAPI(params) {
  return request({
    url: "/message/user/getMsgCount",
    method: "get",
    params,
  });
}

// 工作台-常用文件，查看详情
export function getWorkBenchAPI(params) {
  return request({
    url: "/v1/platform/workbench/getWorkBench",
    method: "get",
    params,
  });
}
