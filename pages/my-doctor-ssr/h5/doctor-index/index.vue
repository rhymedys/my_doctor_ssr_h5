<template>
  <div class="doctor-index">
    <section v-if="computeShowContent">
      <doctor-header
        :doctor-index-info="computeDoctorIndexInfo"
        @onTagClick="onTagClick"
      />
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
        <comment-list :list="computeDoctorIndexInfo.commentItemInfos" />
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
    // eslint-disable-next-line no-console
    console.log(ctx)
    const { $requestApiWithCookie, $checkSessionIsOverdue } = app

    const startDate = new Date().getTime()
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

    // eslint-disable-next-line no-console
    console.log(getDoctorIndexRes, recommendProductsRes)

    $checkSessionIsOverdue(ctx, getDoctorIndexRes.data)
    $checkSessionIsOverdue(ctx, recommendProductsRes.data)

    // eslint-disable-next-line no-console
    console.log('asyncData finish time:', new Date().getTime())
    const endDate = new Date().getTime()
    return {
      startDate,
      endDate,
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
  },
  // created() {
  //   if (
  //     (!process.isServer && this.getDoctorIndexRes.resultCode === 410001) ||
  //     this.recommendProductsRes.resultCode === 410001
  //   ) {
  //     const redirectUri = encodeURIComponent(window.location.href)
  //     window.location.replace(
  //       `http://120.79.205.36:3001/my-doctor-ssr/login?redirect_uri=${redirectUri}`
  //     )
  //   }
  // },
  methods: {
    onTagClick() {
      // eslint-disable-next-line no-console
      console.log(this)

      this.$pushRouter({
        name: 'doctor-introduce',
        query: {
          doctorOpenId: this.$getRouteQuery('doctorOpenId')
        }
      })
      // this.$router.push({
      //   name: 'doctor-introduce',
      //   query: {
      //     doctorOpenId
      //   }
      // })
    }
  }
}
</script>



<style lang="less" scoped>
@import './index.less';
</style>
