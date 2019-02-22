<template>
  <div
    class="doctor-phone-service"
  >
    <section v-if="computeShowContent">
      <doctor-simple-header
        :doctor-index-info="computeDoctorIndexInfo.doctorInfo"
        @onTagClick="onTagClick"
      >
        <template slot="preview-info">
          <div class="doctor-phone-service__preview-data-item">
            {{ computeDoctorIndexInfo.consultCount || '0' }}
            <br>
            <span>咨询数</span>
          </div>
          <div class="doctor-phone-service__preview-data-item">
            {{ computeDoctorIndexInfo.goodFeedbackRate? Number(computeDoctorIndexInfo.goodFeedbackRate) * 20: '0' }}%
            <br>
            <span>好评率</span>
          </div>
        </template>
      </doctor-simple-header>
      <service-introduce
        :sevice-info="computeDoctorIndexInfo.serviceInfo"
      />
      <common-list-section
        title="咨询规则"
        class="doctor-phone-service__common-section"
      >
        <div class="doctor-phone-service__rule-wrapper">
          <div
            v-for="item of computeChatRules"
            :key="item"
          >
            {{ item }}
          </div>
        </div>
      </common-list-section>
      <common-list-section
        title="咨询评价"
        class="doctor-phone-service__common-section"
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
import { defPageSize, defInfiniteScollDistance } from '@/config'
export default {
  name: 'DoctorFamousCourse',
  components: {
    DoctorSimpleHeader: () => import('@/components/doctor-simple-header'),
    ServiceIntroduce: () => import('@/components/service-introduce'),
    CommonListSection: () => import('@/components/common-list-section'),
    CommentList: () => import('@/components/comment-list'),
    PageLoading: () => import('@/components/page-loading')
  },
  async asyncData(ctx) {
    const { app, query } = ctx

    const { $requestApiWithCookie, $checkSessionIsOverdue } = app

    const phoneConsultIndex = await $requestApiWithCookie(ctx, {
      url: 'phoneConsult/index',
      params: Object.assign(
        {
          serviceId: query.servceId,
          page: 1,
          pageSize: defPageSize
        },
        query
      )
    }).catch(e => {
      return {}
    })

    $checkSessionIsOverdue(ctx, phoneConsultIndex.data)

    let allLoaded

    if (
      (allLoaded = phoneConsultIndex.data.data.doctorPhoneConsultIndexInfo) &&
      (allLoaded = allLoaded.commentInfos)
    ) {
      allLoaded = allLoaded.length < defPageSize
    }

    return {
      allLoaded,
      loadingMore: false,
      phoneConsultIndex: phoneConsultIndex.data,
      hadLoadInitData: true,
      page: 2
    }
  },
  data() {
    return {
      phoneConsultIndex: undefined,

      hadLoadInitData: false,
      page: 1,
      allLoaded: false,
      loadingMore: true
    }
  },
  computed: {
    computeShowContent() {
      return this.phoneConsultIndex && this.phoneConsultIndex.resultCode === 0
    },
    computeDoctorIndexInfo() {
      return (
        (this.phoneConsultIndex &&
          this.phoneConsultIndex.data &&
          this.phoneConsultIndex.data.doctorPhoneConsultIndexInfo) ||
        {}
      )
    },
    computeCommentItemIsEmpty() {
      const { computeDoctorIndexInfo } = this

      return (
        !computeDoctorIndexInfo.commentInfos ||
        !computeDoctorIndexInfo.commentInfos.length
      )
    },
    computeChatRules() {
      const { computeDoctorIndexInfo } = this
      let rules = []
      let serviceRule
      if (
        (serviceRule = computeDoctorIndexInfo.serviceInfo) &&
        (serviceRule = serviceRule.serviceRule)
      ) {
        rules = serviceRule.split('<br>')
        if (rules) {
          rules = rules.map(val => {
            return val.replace('\n', '')
          })
        }
      }

      return rules
    },
    computePageLodingTxt() {
      return this.allLoaded ? '>_<  到底啦，别拉了~' : ''
    }
  },
  methods: {
    onTagClick() {
      this.$pushRouter({
        name: 'doctor-index',
        query: {
          doctorOpenId: this.$getRouteQuery('doctorOpenId')
        }
      })
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
          url: 'phoneConsult/getDoctorPhoneConsultComments',
          params: Object.assign({
            ...$getRouteQuery(),
            page,
            pageSize: defPageSize
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
