/*
 * @Author: Rhymedys/Rhymedys@gmail.com
 * @Date: 2018-07-11 11:25:14
 * @Last Modified by: Rhymedys
 * @Last Modified time: 2019-02-18 09:50:33
 */

export const imgTextConsultId = '0A2E8AF4448E41B1AAC7E9928644E981' // 图文咨询id
export const voiceConsultId = '6B671A90F898451592AAE7FB3390689C' // 名医讲堂服务id,包括文章和音频
export const phoneConsultId = 'E0439B064BFE496687642F697AF68CB3' //  电话咨询id
export const appointmentId = '85AC8667C4E64501ABBAF7D6CBFC7866' //  预约挂号id

const serviceTypes = {
  [imgTextConsultId]: {
    label: '图文咨询'
  },
  [voiceConsultId]: {
    label: '名医讲堂'
  },
  [phoneConsultId]: {
    label: '电话咨询'
  },
  [appointmentId]: {
    label: '预约挂号'
  }
}

/**
 * 根据serviceId获取service信息
 *
 * @param {*} serviceId
 */
export function getServiceByServiceId(serviceId) {
  return (serviceId && serviceTypes[serviceId]) || {}
}

export default serviceTypes
