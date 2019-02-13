/*
 * @Author: Rhymedys/Rhymedys@gmail.com
 * @Date: 2019-02-13 21:32:11
 * @Last Modified by: Rhymedys
 * @Last Modified time: 2019-02-13 22:07:36
 */
import axios from 'axios'

function requestApi(config) {
  if (config) {
    if (!config.method) {
      config.method = 'get'
    }
    return axios(config)
  }
}

export default function({ app }, inject) {
  inject('requestApi', requestApi)
}
