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
    </section>
  </div>
</template>


<script>
export default {
  name: 'DoctorFamousCourse',
  components: {
    DoctorSimpleHeader: () => import('@/components/doctor-simple-header'),
    ServiceIntroduce: () => import('@/components/service-introduce'),
    CommonListSection: () => import('@/components/common-list-section'),
    CommentList: () => import('@/components/comment-list')
  },
  async asyncData(ctx) {
    const { app, query } = ctx

    const { $requestApiWithCookie, $checkSessionIsOverdue } = app

    const phoneConsultIndex = await $requestApiWithCookie(ctx, {
      url: 'phoneConsult/index',
      params: Object.assign(
        {
          serviceId: query.servceId
        },
        query
      )
    }).catch(e => {
      return {}
    })

    $checkSessionIsOverdue(ctx, phoneConsultIndex.data)

    return {
      phoneConsultIndex: phoneConsultIndex.data
    }
  },
  data() {
    return {
      phoneConsultIndex: undefined
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
        !computeDoctorIndexInfo.commentItemInfos ||
        !computeDoctorIndexInfo.commentItemInfos.length
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
    }
  }
}
</script>
<style lang="less" scoped>
@import './index.less';
</style>
