<template>
  <div class="doctor-index">
    <doctor-header />
  </div>
</template>



<script>
import DoctorHeader from '@/components/doctor-header'
export default {
  name: 'DoctorIndex',
  components: {
    DoctorHeader
  },
  // asyncData(ctx) {
  //   // 请检查您是否在服务器端
  //   // 使用 req 和 res
  //   const { app } = ctx

  //   const { $requestApi } = app
  //   // eslint-disable-next-line no-console
  //   return $requestApi({
  //     url: 'http://icanhazip.com'
  //   })
  //     .then(e => {
  //       return { getDoctorIndexRes: e.data }
  //     })
  //     .catch(e => {
  //       return {}
  //     })
  // },
  data() {
    return {
      getDoctorIndexRes: undefined
    }
  },
  created() {
    // eslint-disable-next-line no-console
    console.log(this._data)
  }
}
</script>



<style lang="less" scoped>
@import './index.less';
</style>
