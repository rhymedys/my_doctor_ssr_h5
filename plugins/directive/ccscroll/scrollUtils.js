/*
 * @Author: Rhymedys/Rhymedys@gmail.com
 * @Date: 2018-03-26 15:38:37
 * @Last Modified by: Rhymedys
 * @Last Modified time: 2019-02-19 09:57:47
 */

export default class ScrollUtils {
  constructor() {
    this.onScrollCallBack = new Map()
    this.initScroll()
  }

  /**
   * 初始化scroll 事件
   */
  initScroll() {
    const that = this
    window.addEventListener('scroll', () => {
      if (that.onScrollCallBack.length !== 0) {
        that.onScrollCallBack.forEach(val => {
          Object.prototype.toString.call(val) === '[object Function]' && val()
        })
      }
    })
  }

  set(key, val) {
    key && val && this.onScrollCallBack.set(key, val)
  }

  get(key) {
    return key && this.onScrollCallBack.get(key)
  }

  remove(key) {
    key && this.onScrollCallBack.delete(key)
  }
}
