/*
 * @Author: Rhymedys/Rhymedys@gmail.com
 * @Date: 2019-02-15 14:20:29
 * @Last Modified by: Rhymedys
 * @Last Modified time: 2019-02-20 16:00:19
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
      res = this.router.currentRoute.query[key] || defVal
    } else {
      res = this.router.currentRoute.query
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

    this.router.push(res)
  }
}

export default function({ app }, inject) {
  for (const key in api) {
    const fn = api[key].bind(app)

    if (!Object.prototype.hasOwnProperty.call(Vue, key)) {
      Vue.prototype[key] = fn
    }

    if (!Object.prototype.hasOwnProperty.call(app, key)) {
      app[key] = fn
    }
  }
}

// for (const key in api) {
//   if (!Object.prototype.hasOwnProperty.call(Vue, key)) {
//     Vue.prototype[key] = api[key]
//   }
// }
