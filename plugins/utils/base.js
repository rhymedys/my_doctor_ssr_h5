/*
 * @Author: Rhymedys/Rhymedys@gmail.com
 * @Date: 2019-02-15 17:39:23
 * @Last Modified by: Rhymedys
 * @Last Modified time: 2019-02-15 17:56:27
 */

import Vue from 'vue'

const api = {
  checkSessionIsOverdue(ctx, obj) {
    let resultCode
    if (typeof obj === 'number') {
      resultCode = obj
    } else if (Object.prototype.toString.call(obj) === '[object Object]') {
      resultCode = obj.data.resultCode
    }

    if (resultCode === 410001) {
      let redirectUri

      if (process.server) {
        redirectUri = ctx.req.location
      } else {
        redirectUri = window.location.href
      }

      redirectUri = encodeURIComponent(redirectUri)

      ctx.redirect(
        `http://120.79.205.36:3001/my-doctor-ssr/login?redirect_uri=${redirectUri}`
      )
    }
  }
}

export default function({ app }, inject) {
  for (const key in api) {
    if (!Object.prototype.hasOwnProperty.call(app, key)) {
      inject(key, api[key])
      Vue.prototype[key] = api[key]
    }
  }
}
