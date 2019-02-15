/*
 * @Author: Rhymedys/Rhymedys@gmail.com
 * @Date: 2019-02-15 14:20:29
 * @Last Modified by: Rhymedys
 * @Last Modified time: 2019-02-15 17:40:29
 */

import Vue from 'vue'
import { projectPath } from '@/config'

const api = {
  $generateWholeName(name) {
    return `${projectPath.substring(1).replace(/\//g, '-')}${name}`
  },
  $getRouteQuery(key, defVal) {
    let res
    if (key) {
      res = this.$route.query[key] || defVal
    } else {
      res = this.$route.query
    }

    return res
  },

  $pushRouter(nameOrConfigObj) {
    // eslint-disable-next-line no-console
    let res = {}

    if (typeof nameOrConfigObj === 'string') {
      res.name = nameOrConfigObj
    } else {
      res = nameOrConfigObj
    }

    if (res.name) {
      res.name = this.$generateWholeName(res.name)
    }

    this.$router.push(res)
    // console.log(this.$getRouteQuery())
  }
}

for (const key in api) {
  if (!Object.prototype.hasOwnProperty.call(Vue, key)) {
    Vue.prototype[key] = api[key]
  }
}
