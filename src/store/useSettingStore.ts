import { defineStore } from 'pinia'

export const useSettingStore = defineStore('useSettingStore', {
  persist: true,
  state: () => {
    return {
      isCollapse: false,
      isBlack: false
    }
  },
  getters: {},
  actions: { }
})
