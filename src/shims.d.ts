/* eslint-disable no-unused-vars */
// declare module 'xxx'路径或者模块名
import { _RouteRecordBase } from 'vue-router'

declare module 'vue-router' {
  interface _RouteRecordBase {
    hidden?: boolean
  }
}

declare module 'js-sha1'
