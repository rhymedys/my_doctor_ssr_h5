<template>
  <div class="doctor-index">
    <section v-if="computeShowContent">
      <doctor-header
        :doctor-index-info="computeDoctorIndexInfo"
        @onTagClick="onTagClick"
      />
      <service-table
        :doctor-services-infos="computeDoctorIndexInfo.doctorServicesInfos"
        @on-click="onServiceClick"
      />
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
import {
  voiceConsultId,
  imgTextConsultId,
  phoneConsultId
} from '@/constants/serviceType'
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
  methods: {
    onTagClick() {
      this.$pushRouter({
        name: 'doctor-introduce',
        query: {
          doctorOpenId: this.$getRouteQuery('doctorOpenId')
        }
      })
    },
    onServiceClick({ servceId, isValid }) {
      if (!isValid) {
        return
      }

      let route = ''
      const query = {}

      switch (servceId) {
        case voiceConsultId:
          route = 'doctor-famous-course'
          query.servceId = servceId
          break
        case imgTextConsultId:
          route = 'doctor-chat-service'
          query.servceId = imgTextConsultId
          break
        case phoneConsultId:
          route = 'doctor-phone-service'
          query.servceId = phoneConsultId
          break
      }

      if (route) {
        this.$pushRouter({
          name: route,
          query: {
            doctorOpenId: this.$getRouteQuery('doctorOpenId'),
            ...query
          }
        })
      }
    }
  }
}
</script>



<style lang="less" scoped>
@import './index.less';
</style>
