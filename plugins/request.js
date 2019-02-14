/*
 * @Author: Rhymedys/Rhymedys@gmail.com
 * @Date: 2019-02-13 21:32:11
 * @Last Modified by: Rhymedys
 * @Last Modified time: 2019-02-14 17:23:40
 */
import axios from 'axios'

let domainAndProject =
  process.env.NODE_ENV === 'development'
    ? 'localhost:7001'
    : `${process.server ? 'localhost' : '120.79.205.36'}:3001`
const protocol = process.server ? 'http:' : window.location.protocol

domainAndProject = `${protocol}//${domainAndProject}/my-doctor-ssr/api/`

function requestApi(config) {
  if (config) {
    if (!config.method) {
      config.method = 'get'
    }

    // eslint-disable-next-line no-console
    console.log(domainAndProject)

    return axios({
      ...config,
      url: `${domainAndProject}${config.url}`
    })
  }
}

function requestApiWithCookie(ctx, config) {
  if (ctx && config) {
    const { req } = ctx

    if (process.server) {
      if (!config.headers) {
        config.headers = {}
      }

      config.headers.cookie = req.headers.cookie
    }

    return requestApi(config)
  }
}

export default function({ app }, inject) {
  inject('requestApi', requestApi)
  inject('requestApiWithCookie', requestApiWithCookie)
}
