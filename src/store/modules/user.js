import { login, logout, getInfo } from '@/api/login'
import { getToken, setToken, removeToken } from '@/utils/auth'
import Cookies from "js-cookie";

const user = {
  state: {
    token: getToken(),
    name: '',
    avatar: '',
    roles: [],
    permissions: [],
    department_demo: null,
    companyId_demo: null,
    companyName_demo: '',
    systemCode: null,
    id: null,
    school_type_demo: null,
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_PERMISSIONS: (state, permissions) => {
      state.permissions = permissions
    },
    // demo 字段确定后，更改为大写
    SET_department_demo: (state, department_demo)=>{
      state.department_demo=department_demo
    },
    SET_companyName_demo: (state, companyName_demo)=>{
      state.companyName_demo=companyName_demo
    },
    SET_companyId_demo: (state, companyId_demo)=>{
      state.companyId_demo=companyId_demo
    },
    SET_SYSTEMCODE: (state, systemCode)=>{
      state.systemCode=systemCode
    },
    SET_ID: (state, id)=>{
      state.id=id
    },
    SET_school_type_demo: (state, school_type_demo)=>{
      state.school_type_demo=school_type_demo
    },
  },

  actions: {
    // 登录
    Login({ commit }, userInfo) {
      const username = userInfo.username.trim()
      const password = userInfo.password
      const code = userInfo.code
      const uuid = userInfo.uuid
      return new Promise((resolve, reject) => {
        login(username, password, code, uuid).then(res => {
          setToken(res.token)
          commit('SET_TOKEN', res.token)
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取用户信息
    GetInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        getInfo().then(res => {
          const user = res.user
          const avatar = (user.avatar == "" || user.avatar == null) ? require("@/assets/images/profile.jpg") : process.env.VUE_APP_BASE_API + user.avatar;
          Cookies.set('id',res.user.userId)
          //demo
          // 区分单位/机构/集团  department_demo 1:秘书处  2:普通单位  3:机构
          // 用于部分页面需通过部门控制字段
          
          // companyId_demo：单位id
          // companyName_demo：单位名称
          // 使用页面：年度信息-学校-新增
          
          //systemCode
          // 使用页面：年度信息-学校-新增

          // school_type_demo 学校类型，1:其他学校  2:高职学校
          // 使用页面：年度信息-学校-新增
          
          // Cookies.set('department_demo',2)
          // Cookies.set('companyId_demo',321)
          // Cookies.set('companyName_demo','假的单位名称')
          // Cookies.set('systemCode','7d4l2065')

          commit("SET_department_demo", 1);
          commit("SET_companyId_demo", 321);
          commit("SET_companyName_demo", "假的单位名称");
          commit("SET_SYSTEMCODE", user.systemCode);
          commit("SET_ID", res.user.userId);
          commit('SET_school_type_demo',2)
          //demo
          
          
          if (res.roles && res.roles.length > 0) { // 验证返回的roles是否是一个非空数组
            commit('SET_ROLES', res.roles)
            commit('SET_PERMISSIONS', res.permissions)
          } else {
            commit('SET_ROLES', ['ROLE_DEFAULT'])
          }
          commit('SET_NAME', user.userName)
          commit('SET_AVATAR', avatar)
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 退出系统
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout(state.token).then(() => {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          commit('SET_PERMISSIONS', [])
          removeToken()
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    }
  }
}

export default user
