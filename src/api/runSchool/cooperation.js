import request from "@/utils/request";

// 列表-订单班
export function getOrderClass(params) {
    return request({
        url: "/v1/education/orderClass/list",
        method: "get",
        params,
    });
}

// 列表-现代学徒制
export function getApprentice(params) {
    return request({
        url: "/v1/education/modern/apprentice/list",
        method: "get",
        params,
    });
}

// 列表-企业新型学徒制
export function getEducation(params) {
    return request({
        url: "/v1/education/list",
        method: "get",
        params,
    });
}

// 列表-士官生培养
export function getCultivate(params) {
    return request({
        url: "/v1/education/cultivate/list",
        method: "get",
        params,
    });
}

// 新增-编辑-订单班
export function addOrUpdateOrderClass(data) {
    return request({
        url: "/v1/education/addOrUpdateOrderClass",
        method: "post",
        data,
    });
}

// 新增-编辑-现代学徒制
export function addOrUpdateModernApprentice(data) {
    return request({
        url: "/v1/education/addOrUpdateModernApprentice",
        method: "post",
        data,
    });
}

// 新增-编辑-企业学徒制
export function addOrUpdateEnterpriseApprentice(data) {
    return request({
        url: "/v1/education/addOrUpdateEnterpriseApprentice",
        method: "post",
        data,
    });
}

// 新增-编辑-士官生培养
export function addOrUpdateCultivate(data) {
    return request({
        url: "/v1/education/addOrUpdateCultivate",
        method: "post",
        data,
    });
}
// 获取详情-订单班
export function getOrderClassInfo(params) {
    return request({
        url: "/v1/education/getOrderClassInfo",
        method: "get",
        params,
    });
}

// 获取详情-现代学徒制
export function getModernApprenticeInfo(params) {
    return request({
        url: "/v1/education/getModernApprenticeInfo",
        method: "get",
        params,
    });
}

// 获取详情-企业学徒制
export function getEnterpriseApprenticeInfo(params) {
    return request({
        url: "/v1/education/getEnterpriseApprenticeInfo",
        method: "get",
        params,
    });
}

// 获取详情-士官生培养
export function getCultivateInfo(params) {
    return request({
        url: "/v1/education/getCultivateInfo",
        method: "get",
        params,
    });
}

// 删除-订单班
export function batchDelOrderClass(params) {
    return request({
      url: "/v1/education/batchDelOrderClass",
      method: "post",
      params,
    });
}

// 删除-现代学徒制
export function batchDelModernApprentice(params) {
    return request({
      url: "/v1/education/batchDelModernApprentice",
      method: "post",
      params,
    });
}

// 删除-企业学徒制
export function batchDelEnterpriseApprentice(params) {
    return request({
      url: "/v1/education/batchDelEnterpriseApprentice",
      method: "post",
      params,
    });
}

// 删除-士官生培养
export function batchDelCultivate(params) {
    return request({
      url: "/v1/education/batchDelCultivate",
      method: "post",
      params,
    });
}

// 提交/审核-订单班
export function updateOrderClassStatus(data) {
    return request({
      url: "/v1/education/updateOrderClassStatus",
      method: "post",
      data,
    });
}

// 提交/审核-现代学徒制
export function updateModernApprenticeStatus(data) {
    return request({
      url: "/v1/education/updateModernApprenticeStatus",
      method: "post",
      data,
    });
}

// 提交/审核-企业学徒制
export function updateEnterpriseApprenticeStatus(data) {
    return request({
      url: "/v1/education/updateEnterpriseApprenticeStatus",
      method: "post",
      data,
    });
}

// 提交/审核-士官生培养
export function updateCultivateStatus(data) {
    return request({
      url: "/v1/education/updateCultivateStatus",
      method: "post",
      data,
    });
}