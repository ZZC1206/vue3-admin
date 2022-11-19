import { defineStore } from 'pinia'

export const useSettingStore = defineStore('useSettingStore', {
  state: () => {
    return {
      isCollapse: false,
      isBlack: false
    }
  },
  getters: {},
  actions: { },
  persist: true
})
