<template>
  <div class="doctor-index">
    <section v-if="computeShowContent">
      <doctor-header :doctor-index-info="computeDoctorIndexInfo" />
    </section>
  </div>
</template>



<script>
export default {
  name: 'DoctorIndex',
  components: {
    DoctorHeader: () => import('@/components/doctor-header')
  },
  asyncData(ctx) {
    const { app, query } = ctx

    const { $requestApiWithCookie } = app

    return $requestApiWithCookie(ctx, {
      url: 'doctor/getDoctorIndex',
      params: query
    })
      .then(e => {
        return { getDoctorIndexRes: e.data }
      })
      .catch(e => {
        return {}
      })
  },
  data() {
    return {
      getDoctorIndexRes: undefined
    }
  },
  computed: {
    computeShowContent() {
      return this.getDoctorIndexRes && this.getDoctorIndexRes.resultCode === 0
    },
    computeDoctorIndexInfo() {
      return (
        (this.getDoctorIndexRes &&
          this.getDoctorIndexRes.data &&
          this.getDoctorIndexRes.data.doctorIndexInfo) ||
        {}
      )
    }
  }
}
</script>



<style lang="less" scoped>
@import './index.less';
</style>
