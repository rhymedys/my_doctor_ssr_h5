/*
 * @Author: Rhymedys/Rhymedys@gmail.com
 * @Date: 2019-02-15 17:39:23
 * @Last Modified by: Rhymedys
 * @Last Modified time: 2019-03-02 12:14:34
 */

import Vue from 'vue'

const api = {
  checkSessionIsOverdue(ctx, obj) {
    return new Promise((resolve, reject) => {
      let resultCode

      // eslint-disable-next-line no-console
      if (typeof obj === 'number') {
        resultCode = obj
      } else if (Object.prototype.toString.call(obj) === '[object Object]') {
        resultCode = obj.resultCode
      }

      // // eslint-disable-next-line no-console
      // console.log(obj, resultCode, ctx.route.fullPath)

      if (resultCode === 410001) {
        let redirectUri
        if (process.server) {
          redirectUri = `http://${
            ctx.isDev ? 'localhost:3333' : '120.79.205.36:3001'
          }${ctx.route.fullPath}`
        } else {
          redirectUri = window.location.href
        }

        redirectUri = encodeURIComponent(redirectUri)

        ctx.redirect(
          `http://${
            ctx.isDev ? 'localhost:7001' : '120.79.205.36:3001'
          }/my-doctor-ssr/login?redirect_uri=${redirectUri}`
        )
        reject(obj)
      } else {
        resolve(obj)
      }
    }).catch(e => {
      // TODO: 待完善上传报错
      // eslint-disable-next-line no-console
      console.warn(e)
    })
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
