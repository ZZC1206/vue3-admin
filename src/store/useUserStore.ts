import { defineStore } from 'pinia'
import { Login, Logout } from '@/api/account'
import { AccountLoginOrRegisterData } from '@/api/types/account'
import { ElMessage } from 'element-plus'

export const useUserStore = defineStore('useUserStore', {
  // 开启数据持久化
  persist: true,
  state: () => {
    return {
      token: '',
      userName: ''
    }
  },
  getters: {},
  actions: {
    userLogin (data: AccountLoginOrRegisterData) {
      return new Promise((resolve, reject) => {
        Login(data)
          .then((res) => {
            const data = res.data
            this.token = data.token
            this.userName = data.username
            resolve(res)
          })
          .catch((err) => {
            reject(err)
          })
      })
    },
    userLogout () {
      return new Promise((resolve, reject) => {
        Logout()
          .then((res) => {
            // const data = res.data
            console.log(res)
            if (res.resCode === 0) {
                ElMessage.success(res.message)
            }
            this.clearInfo()
            resolve(res)
          })
          .catch((err) => {
            reject(err)
          })
      })
    },
    clearInfo () {
      this.token = ''
      this.userName = ''
    }
  }
})
