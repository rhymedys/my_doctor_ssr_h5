/*
 * @Author: Rhymedys/Rhymedys@gmail.com
 * @Date: 2019-02-19 10:25:41
 * @Last Modified by:   Rhymedys
 * @Last Modified time: 2019-02-19 10:25:41
 */

import Vue from 'vue'
import {
  BusPlugin,
  TransferDom,
  WechatPlugin,
  DatetimePlugin,
  LoadingPlugin,
  ToastPlugin,
  AlertPlugin,
  ConfirmPlugin
} from 'vux'

Vue.use(DatetimePlugin)
Vue.use(LoadingPlugin)
Vue.use(ToastPlugin)
Vue.use(AlertPlugin)
Vue.use(ConfirmPlugin)
Vue.use(WechatPlugin)
Vue.use(BusPlugin)

Vue.directive('transfer-dom', TransferDom)
