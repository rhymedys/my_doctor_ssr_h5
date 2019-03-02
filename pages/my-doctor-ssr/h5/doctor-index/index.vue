<template>
  <div
    ref="loadMoreDiv"
    v-ccscroll="loadMore"
    class="doctor-index"
  >
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
      <page-loading
        :txt="computePageLodingTxt"
        :hide-loading="allLoaded"
      />
    </section>
  </div>
</template>



<script>
import {
  voiceConsultId,
  imgTextConsultId,
  phoneConsultId
} from '@/constants/serviceType'

import { defPageSize, defInfiniteScollDistance } from '@/config'

export default {
  name: 'DoctorIndex',
  components: {
    DoctorHeader: () => import('@/components/doctor-header'),
    ServiceTable: () => import('@/components/service-table'),
    CommonListSection: () => import('@/components/common-list-section'),
    CourseList: () => import('@/components/course-list'),
    CommentList: () => import('@/components/comment-list'),
    PageLoading: () => import('@/components/page-loading')
  },
  async asyncData(ctx) {
    const { app, query } = ctx
    const { $requestApiWithCookie, $checkSessionIsOverdue } = app

    const startDate = new Date().getTime()
    const getDoctorIndexReq = $requestApiWithCookie(ctx, {
      url: 'doctor/getDoctorIndex',
      params: Object.assign(
        {
          page: 1,
          pageSize: defPageSize
        },
        query
      )
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

    await Promise.all([
      $checkSessionIsOverdue(ctx, getDoctorIndexRes.data),
      $checkSessionIsOverdue(ctx, recommendProductsRes.data)
    ])

    // eslint-disable-next-line no-console
    console.log('asyncData finish time:', new Date().getTime())
    const endDate = new Date().getTime()

    let allLoaded

    if (
      (allLoaded = getDoctorIndexRes.data.data.doctorIndexInfo) &&
      (allLoaded = allLoaded.commentItemInfos)
    ) {
      allLoaded = allLoaded.length < defPageSize
    }

    return {
      startDate,
      endDate,
      allLoaded,
      loadingMore: false,
      getDoctorIndexRes: getDoctorIndexRes.data,
      recommendProductsRes: recommendProductsRes.data,
      hadLoadInitData: true,
      page: 2
    }
  },
  data() {
    return {
      getDoctorIndexRes: undefined,
      recommendProductsRes: undefined,

      hadLoadInitData: false,
      page: 1,
      allLoaded: false,
      loadingMore: true
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
    },

    computePageLodingTxt() {
      return this.allLoaded ? '>_<  到底啦，别拉了~' : ''
    }
  },
  beforeDestroy() {
    // eslint-disable-next-line no-console
    console.log('doctor-index beforeDestroy', this)
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
    },
    async loadMore() {
      const diffHeight =
        this.$refs.loadMoreDiv.scrollHeight -
        window.innerHeight -
        window.scrollY

      const {
        allLoaded,
        hadLoadInitData,
        loadingMore,
        page,
        $getRouteQuery
      } = this

      if (
        diffHeight < defInfiniteScollDistance &&
        !allLoaded &&
        hadLoadInitData &&
        !loadingMore
      ) {
        this.loadingMore = true

        const res = await this.$requestApi({
          url: 'doctor/getDoctorComments',
          params: Object.assign({
            ...$getRouteQuery(),
            page,
            pageSize: defPageSize,
            commentCategory: 'CONSULTEVALUATE'
          })
        })

        const { resultCode, data } = res.data

        if (resultCode === 0) {
          this.allLoaded =
            data.commentInfos && data.commentInfos.length < defPageSize
          this.page += 1
          this.getDoctorIndexRes.data.doctorIndexInfo.commentItemInfos = this.getDoctorIndexRes.data.doctorIndexInfo.commentItemInfos.concat(
            data.commentInfos
          )
          this.loadingMore = false
        }
      }
    }
  }
}
</script>



<style lang="less" scoped>
@import './index.less';
</style>
