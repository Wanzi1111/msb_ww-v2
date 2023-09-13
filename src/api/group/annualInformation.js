import request from "@/utils/request";

// 学校
// 查询学校年度信息列表
export function schoolListAPI(params) {
  return request({
    url: "/v1/school/annual/list",
    method: "get",
    params,
  });
}

// 新增-编辑学校年度信息
export function schoolAddOrUpdateInfoAPI(data) {
  return request({
    url: "/v1/school/annual/addOrUpdateInfo",
    method: "post",
    data,
  });
}

// 获取学校年度信息详细信息
export function schoolGetInfoAPI(params) {
  return request({
    url: "/v1/school/annual/getInfo",
    method: "get",
    params,
  });
}

// 更新学校年度信息的状态
export function schoolUpdateStatusAPI(data) {
  return request({
    url: "/v1/school/annual/updateStatus",
    method: "post",
    data,
  });
}

// 获取自身获益详细信息
export function schoolGetBenefitInfoAPI(params) {
  return request({
    url: "/v1/school/annual/getBenefitInfo",
    method: "get",
    params,
  });
}

// 新增-编辑学校年度信息-自身获益
export function schoolAddOrUpdateBenefitAPI(data) {
  return request({
    url: "/v1/school/annual/addOrUpdateBenefit",
    method: "post",
    data,
  });
}

// 新增-编辑学校年度信息-服务成员院校
export function schoolAddOrUpdateSchoolMemberAPI(data) {
  return request({
    url: "/v1/school/annual/addOrUpdateSchoolMember",
    method: "post",
    data,
  });
}

// 获取学校年度信息-服务成员院校详细信息
export function schoolGetSchoolMemberInfoAPI(params) {
  return request({
    url: "/v1/school/annual/getSchoolMemberInfo",
    method: "get",
    params,
  });
}

// 新增-编辑学校年度信息-服务成员企业
export function schoolAddOrUpdateCompanyMemberAPI(data) {
  return request({
    url: "/v1/school/annual/addOrUpdateCompanyMember",
    method: "post",
    data,
  });
}

// 获取学校年度信息-服务成员企业详细信息
export function schoolGetCompanyMemberInfoAPI(params) {
  return request({
    url: "/v1/school/annual/getCompanyMemberInfo",
    method: "get",
    params,
  });
}

// 新增-编辑学校年度信息-国际交流合作
export function schoolAddOrUpdateInternationalAPI(data) {
  return request({
    url: "/v1/school/annual/addOrUpdateInternational",
    method: "post",
    data,
  });
}

// 获取学校年度信息-国际交流合作详细信息
export function schoolGetInternationalInfoAPI(params) {
  return request({
    url: "/v1/school/annual/getInternationalInfo",
    method: "get",
    params,
  });
}

// 删除学校年度信息
export function schoolBatchDelAnnualAPI(params) {
  return request({
    url: "/v1/school/annual/batchDelAnnual",
    method: "post",
    params,
  });
}

// 导出学校年度信息
export function schoolExportAPI(params) {
  return request({
    url: "/v1/school/annual/export",
    method: "post",
    params,
    responseType: "blob",
  });
}

// 导入学校年度信息
export function schoolImportAPI(params) {
  return request({
    url: "/v1/school/annual/import",
    method: "post",
    params,
  });
}

// 成员单位列表
export function listNonSystemcodeAPI(params) {
  return request({
    url: "/system/member/listNonSystemcode",
    method: "get",
    params,
  });
}

// 企业
// 新增企业年度信息-基本情况
export function enterpriseAddInfoAPI(data) {
  return request({
    url: "/annual/enterprise/information/add",
    method: "post",
    data,
  });
}

// 企业提交-批量提交
export function enterpriseBatchCommitAPI(data) {
  return request({
    url: "/annual/enterprise/information/batchCommit",
    method: "post",
    data,
  });
}

// 修改企业年度信息-基本情况
export function enterpriseEditInfoAPI(data) {
  return request({
    url: "/annual/enterprise/information/edit",
    method: "post",
    data,
  });
}

// 普通-查询企业年度信息-基本情况
export function enterpriseListInfoAPI(params) {
  return request({
    url: "/annual/enterprise/information/list",
    method: "get",
    params,
  });
}

// 特权-查询企业年度信息-基本情况
export function enterpriseListForAdminAPI(params) {
  return request({
    url: "/annual/enterprise/information/listForAdmin",
    method: "get",
    params,
  });
}

// 审核通过-审核不通过
export function enterpriseReviewAPI(data) {
  return request({
    url: "/annual/enterprise/information/review",
    method: "post",
    data,
  });
}

// 获取企业年度信息-基本情况
export function enterpriseInformationAPI(id) {
  return request({
    url: `/annual/enterprise/information/${id}`,
    method: "get",
  });
}

// 新增-修改企业年度信息-自身获益
export function enterpriseAddOrUpdateBenefitsAPI(data) {
  return request({
    url: "/annual/enterprise/benefits/addOrUpdate",
    method: "post",
    data,
  });
}

// 根据基本信息id-获取企业年度信息-自身获益
export function enterpriseBenefitsByBaseInfoIdAPI(id) {
  return request({
    url: `/annual/enterprise/benefits/byBaseInfoId/${id}`,
    method: "get",
  });
}

// 获取企业年度信息-自身获益
export function enterpriseBenefitsAPI(id) {
  return request({
    url: `/annual/enterprise/benefits/${id}`,
    method: "get",
  });
}

// 新增-修改企业年度信息-服务成员院校
export function enterpriseAddOrUpdateMemberSchoolAPI(data) {
  return request({
    url: "/annual/enterprise/memberSchool/addOrUpdate",
    method: "post",
    data,
  });
}

// 根据基本信息id-获取企业年度信息-服务成员院校详细信息
export function enterpriseEemberSchoolByBaseInfoIdAPI(id) {
  return request({
    url: `/annual/enterprise/memberSchool/byBaseInfoId/${id}`,
    method: "get",
  });
}

// 获取企业年度信息-服务成员院校详细信息
export function enterpriseByBaseInfoIdAPI(id) {
  return request({
    url: `/annual/enterprise/memberSchool/${id}`,
    method: "get",
  });
}

// 导入企业年度信息
export function enterpriseImportAPI(data) {
  return request({
    url: "/annual/enterprise/information/import",
    method: "post",
    data,
  });
}

// 删除企业年度信息-基本情况
export function enterpriseDelAPI(ids) {
  return request({
    url: `/annual/enterprise/information/${ids}`,
    method: "delete",
  });
}

// 普通- 导出企业年度信息-基本情况列表
export function enterpriseInformationExportAPI(data) {
  return request({
    url: `/annual/enterprise/information/export`,
    method: "post",
    data,
  });
}

// 特殊- 导出企业年度信息-基本情况列表
export function enterpriseExportForAdminAPI(data) {
  return request({
    url: `/annual/enterprise/information/exportForAdmin`,
    method: "post",
    data,
  });
}
