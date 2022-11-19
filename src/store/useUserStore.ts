import { defineStore } from 'pinia'
import { Login, Logout } from '@/api/account'
import { AccountLoginOrRegisterData } from '@/api/types/account'

export const useUserStore = defineStore('useUserStore', {
  state: () => {
    return {
      token: '123',
      userName: '123'
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
  },
  persist: true
})
