/*
 * @Author: Rhymedys/Rhymedys@gmail.com
 * @Date: 2019-02-19 10:06:08
 * @Last Modified by: Rhymedys
 * @Last Modified time: 2019-02-19 10:13:41
 */

export default {
  methods: {
    /**
     * @description 获取带有网络请求出错与page、pageSize的网络请求参数
     * @param {any} [obj={}]
     * @returns
     */
    getInitRequestParams(obj = {}) {
      return this.getUninitRequestParams({
        showNetworkLoading: true,
        showErrorModal: true,
        ...obj
      })
    },
    /**
     * @description  获取非第一页网络请求参数
     * @param {any} [obj={}]
     * @returns
     */
    getUninitRequestParams(obj = {}) {
      let page
      const pageSize = this.data.pageSize || 10
      if (!this.data.page) {
        this.data.page = page = 1
      } else {
        page = this.data.page
      }

      page += 1
      this.data.page = page

      return {
        ...obj,
        data: {
          page,
          pageSize,
          ...obj.data
        }
      }
    },
    /**
     * @description 获取监听活动的dom 标签对象
     * @param {any} el
     * @returns
     */
    getListenerAdditionPageRequestEl(el) {
      return (
        el || (this.$refs.loadMoreDiv && this.$refs.loadMoreDiv.$el) || null
      )
    }
  }
}
