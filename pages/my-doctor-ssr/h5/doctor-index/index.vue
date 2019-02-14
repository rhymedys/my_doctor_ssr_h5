<template>
  <div class="doctor-index">
    <section v-if="computeShowContent">
      <doctor-header :doctor-index-info="computeDoctorIndexInfo" />
      <service-table :doctor-services-infos="computeDoctorIndexInfo.doctorServicesInfos" />
      <common-list-section
        :title="computeRecomandProductTitle"
        class="doctor-index__recomand-product-section"
        :show-empty="!computeRecomandProduct.length"
      >
        <course-list :list="computeRecomandProduct" />
      </common-list-section>
      <common-list-section
        title="患者评价"
        class="doctor-index__patient-evalution"
        :show-empty="computeCommentItemIsEmpty"
      >
        <comment-list
          :list="computeDoctorIndexInfo.commentItemInfos"
        />
      </common-list-section>
    </section>
  </div>
</template>



<script>
export default {
  name: 'DoctorIndex',
  components: {
    DoctorHeader: () => import('@/components/doctor-header'),
    ServiceTable: () => import('@/components/service-table'),
    CommonListSection: () => import('@/components/common-list-section'),
    CourseList: () => import('@/components/course-list'),
    CommentList: () => import('@/components/comment-list')
  },
  async asyncData(ctx) {
    const { app, query } = ctx

    const { $requestApiWithCookie } = app

    const getDoctorIndexReq = $requestApiWithCookie(ctx, {
      url: 'doctor/getDoctorIndex',
      params: query
    }).catch(e => {
      return {}
    })

    const recommendProductsReq = $requestApiWithCookie(ctx, {
      url: 'product/recommendProducts',
      params: query
    }).catch(e => {
      return {}
    })

    const [getDoctorIndexRes, recommendProductsRes] = await Promise.all([
      getDoctorIndexReq,
      recommendProductsReq
    ])

    return {
      getDoctorIndexRes: getDoctorIndexRes.data,
      recommendProductsRes: recommendProductsRes.data
    }
  },
  data() {
    return {
      getDoctorIndexRes: undefined,
      recommendProductsRes: undefined
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
    computeRecomandProduct() {
      return (
        (this.recommendProductsRes &&
          this.recommendProductsRes.data &&
          this.recommendProductsRes.data.productInfos) ||
        []
      )
    },
    computeRecomandProductTitle() {
      let res = '推荐课程'

      if (this.computeRecomandProduct.length) {
        res += ` (${this.computeRecomandProduct.length}条)`
      }

      return res
    },

    computeCommentItemIsEmpty() {
      const { computeDoctorIndexInfo } = this

      return (
        !computeDoctorIndexInfo.commentItemInfos ||
        !computeDoctorIndexInfo.commentItemInfos.length
      )
    }
  }
}
</script>



<style lang="less" scoped>
@import './index.less';
</style>
