/*
 * @Author: Rhymedys/Rhymedys@gmail.com
 * @Date: 2019-02-19 09:56:05
 * @Last Modified by: Rhymedys
 * @Last Modified time: 2019-02-19 09:58:53
 */

import Vue from 'vue'
import ScrollUtils from './scrollUtils'

// window 滑动
Vue.prototype.$onWindowScrollCb = new ScrollUtils()

// 加载更多指令
Vue.directive('ccscroll', {
  inserted: (el, binding, vnode) => {
    Vue.prototype.$onWindowScrollCb.set(vnode.tag, binding.value)
  },
  unbind: (el, binding, vnode) => {
    Vue.prototype.$onWindowScrollCb.remove(vnode.tag)
  }
})
