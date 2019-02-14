<template>
  <div class="doctor-index">
    <section v-if="computeShowContent">
      <doctor-header :doctor-index-info="computeDoctorIndexInfo" />
      <service-table :doctor-services-infos="computeDoctorIndexInfo.doctorServicesInfos" />
      <common-list-section
        :title="computeRecomandProductTitle"
        class="doctor-index__recomand-product-section"
      />
      <common-list-section
        title="患者评价"
        class="doctor-index__patient-evalution"
      />
    </section>
  </div>
</template>



<script>
export default {
  name: 'DoctorIndex',
  components: {
    DoctorHeader: () => import('@/components/doctor-header'),
    ServiceTable: () => import('@/components/service-table'),
    CommonListSection: () => import('@/components/common-list-section')
  },
  asyncData(ctx) {
    const { app, query } = ctx

    const { $requestApiWithCookie } = app

    const getDoctorIndexReq = $requestApiWithCookie(ctx, {
      url: 'doctor/getDoctorIndex',
      params: query
    })
      .then(e => {
        return { getDoctorIndexRes: e.data }
      })
      .catch(e => {
        return {}
      })

    return Promise.all([getDoctorIndexReq])
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
    },
    computeRecomandProductTitle() {
      const res = '推荐课程'

      // if(this.computeDoctorIndexInfo.)

      return res
    }
  }
}
</script>



<style lang="less" scoped>
@import './index.less';
</style>
