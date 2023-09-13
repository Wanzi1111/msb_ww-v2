import request from "@/utils/request";

// 产业学院列表
export function getAcademyList(params) {
  return request({
    url: "/v1/coBuildShare/academy/list",
    method: "get",
    params,
  });
}
// 新增-编辑产业学院
export function addOrUpdateAcademy(data) {
  return request({
    url: "/v1/coBuildShare/addOrUpdateAcademy",
    method: "post",
    data,
  });
}
// 产业学院详细信息
export function getAcademyInfo(params) {
  return request({
    url: "/v1/coBuildShare/getAcademyInfo",
    method: "get",
    params,
  });
}
// 产业学院-提交 审核 
export function updateAcademyStatus(data) {
  return request({
    url: "/v1/coBuildShare/updateAcademyStatus",
    method: "post",
    data,
  });
}
// 删除产业学院
export function batchDelAcademy(params) {
  return request({
    url: "/v1/coBuildShare/batchDelAcademy",
    method: "post",
    params,
  });
}
// 共建专业列表
export function getmkMajor(params) {
  return request({
    url: "/v1/coBuildShare/major/list",
    method: "get",
    params,
  });
}
// 共建专业类型
export function getmkMajorType(params) {
  return request({
    url: "/v1/coBuildShare/major/type",
    method: "get",
    params,
  });
}
// 新增-编辑共建专业
export function addOrUpdateMajor(data) {
  return request({
    url: "/v1/coBuildShare/addOrUpdateMajor",
    method: "post",
    data,
  });
}
// 共建专业详细信息
export function getMajorInfo(params) {
  return request({
    url: "/v1/coBuildShare/getMajorInfo",
    method: "get",
    params,
  });
}
// 共建专业-提交 审核 
export function updateMajorStatus(data) {
  return request({
    url: "/v1/coBuildShare/updateMajorStatus",
    method: "post",
    data,
  });
}
// 删除共建专业
export function batchDelMajor(params) {
  return request({
    url: "/v1/coBuildShare/batchDelMajor",
    method: "post",
    params,
  });
}
// 共建专业群列表
export function mkMajorGroup(params) {
  return request({
    url: "/v1/coBuildShare/major/group/list",
    method: "get",
    params,
  });
}
// 新增-编辑共建专业群
export function addOrUpdateMajorGroup(data) {
  return request({
    url: "/v1/coBuildShare/addOrUpdateMajorGroup",
    method: "post",
    data,
  });
}
// 共建专业群详细信息
export function getMajorGroupInfo(params) {
  return request({
    url: "/v1/coBuildShare/getMajorGroupInfo",
    method: "get",
    params,
  });
}
// 共建专业群-提交 审核 
export function updateMajorGroupStatus(data) {
  return request({
    url: "/v1/coBuildShare/updateMajorGroupStatus",
    method: "post",
    data,
  });
}
// 删除共建专业群
export function batchDelMajorGroup(params) {
  return request({
    url: "/v1/coBuildShare/batchDelMajorGroup",
    method: "post",
    params,
  });
}
// 共建课程列表
export function mkCourse(params) {
  return request({
    url: "/v1/coBuildShare/course/list",
    method: "get",
    params,
  });
}
// 新增-编辑共建课程
export function addOrUpdateCourse(data) {
  return request({
    url: "/v1/coBuildShare/addOrUpdateCourse",
    method: "post",
    data,
  });
}
// 共建课程详细信息
export function getCourseInfo(params) {
  return request({
    url: "/v1/coBuildShare/getCourseInfo",
    method: "get",
    params,
  });
}
// 共建课程-提交 审核 
export function updateCourseStatus(data) {
  return request({
    url: "/v1/coBuildShare/updateCourseStatus",
    method: "post",
    data,
  });
}
// 删除共建课程
export function batchDelCourse(params) {
  return request({
    url: "/v1/coBuildShare/batchDelCourse",
    method: "post",
    params,
  });
}
// 共建教材列表
export function mkTextbook(params) {
  return request({
    url: "/v1/coBuildShare/material/list",
    method: "get",
    params,
  });
}
// 新增-编辑共建教材
export function addOrUpdateMaterial(data) {
  return request({
    url: "/v1/coBuildShare/addOrUpdateMaterial",
    method: "post",
    data,
  });
}
// 共建教材详细信息
export function getMaterialInfo(params) {
  return request({
    url: "/v1/coBuildShare/getMaterialInfo",
    method: "get",
    params,
  });
}
// 共建教材-提交 审核 
export function updateMaterialStatus(data) {
  return request({
    url: "/v1/coBuildShare/updateMaterialStatus",
    method: "post",
    data,
  });
}
// 删除共建教材
export function batchDelMaterial(params) {
  return request({
    url: "/v1/coBuildShare/batchDelMaterial",
    method: "post",
    params,
  });
}
// 共建基地列表
export function mkBase(params) {
  return request({
    url: "/v1/coBuildShare/base/list",
    method: "get",
    params,
  });
}
// 新增-编辑共建基地
export function addOrUpdateBase(data) {
  return request({
    url: "/v1/coBuildShare/addOrUpdateBase",
    method: "post",
    data,
  });
}
// 共建基地详细信息
export function getBaseInfo(params) {
  return request({
    url: "/v1/coBuildShare/getBaseInfo",
    method: "get",
    params,
  });
}
// 共建基地-提交 审核 
export function updateBaseStatus(data) {
  return request({
    url: "/v1/coBuildShare/updateBaseStatus",
    method: "post",
    data,
  });
}
// 删除共建基地
export function batchDelBase(params) {
  return request({
    url: "/v1/coBuildShare/batchDelBase",
    method: "post",
    params,
  });
}
// 师资共建列表
export function mkTeachers(params) {
  return request({
    url: "/v1/coBuildShare/teacher/list",
    method: "get",
    params,
  });
}
// 新增-编辑师资共建
export function addOrUpdateTeacher(data) {
  return request({
    url: "/v1/coBuildShare/addOrUpdateTeacher",
    method: "post",
    data,
  });
}
// 师资共建详细信息
export function getTeacherInfo(params) {
  return request({
    url: "/v1/coBuildShare/getTeacherInfo",
    method: "get",
    params,
  });
}
// 师资共建-提交 审核 
export function updateTeacherStatus(data) {
  return request({
    url: "/v1/coBuildShare/updateTeacherStatus",
    method: "post",
    data,
  });
}
// 删除师资共建
export function batchDelTeacher(params) {
  return request({
    url: "/v1/coBuildShare/batchDelTeacher",
    method: "post",
    params,
  });
}
