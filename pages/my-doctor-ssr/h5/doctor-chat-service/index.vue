<template>
  <div
    class="doctor-chat-service"
  >
    <section v-if="computeShowContent">
      <doctor-simple-header
        :doctor-index-info="computeDoctorIndexInfo"
        @onTagClick="onTagClick"
      >
        <template slot="preview-info">
          <div class="doctor-chat-service__preview-data-item">
            {{ computeDoctorIndexInfo.consultCount || '0' }}
            <br>
            <span>咨询数</span>
          </div>
          <div class="doctor-chat-service__preview-data-item">
            {{ computeDoctorIndexInfo.goodFeedbackRate? Number(computeDoctorIndexInfo.goodFeedbackRate) * 20: '0' }}%
            <br>
            <span>好评率</span>
          </div>
          <div class="doctor-chat-service__preview-data-item">
            {{ computeDoctorIndexInfo.replyRate || '0' }}%
            <br>
            <span>回复率</span>
          </div>
        </template>
      </doctor-simple-header>
      <service-introduce
        :sevice-info="computeDoctorIndexInfo"
      />
      <common-list-section
        title="咨询规则"
        class="doctor-chat-service__common-section"
        :show-empty="computeCommentItemIsEmpty"
      >
        <div class="doctor-chat-service__rule-wrapper">
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
        class="doctor-chat-service__common-section"
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

    const getDoctorConsltIndexRes = await $requestApiWithCookie(ctx, {
      url: 'doctor/getDoctorConsltIndex',
      params: query
    }).catch(e => {
      return {}
    })

    $checkSessionIsOverdue(ctx, getDoctorConsltIndexRes.data)

    return {
      getDoctorConsltIndex: getDoctorConsltIndexRes.data
    }
  },
  data() {
    return {
      getDoctorConsltIndex: undefined
    }
  },
  computed: {
    computeShowContent() {
      return (
        this.getDoctorConsltIndex && this.getDoctorConsltIndex.resultCode === 0
      )
    },
    computeDoctorIndexInfo() {
      return (
        (this.getDoctorConsltIndex &&
          this.getDoctorConsltIndex.data &&
          this.getDoctorConsltIndex.data.doctorConsultIndexInfo) ||
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
      if (computeDoctorIndexInfo.consultRule) {
        rules = computeDoctorIndexInfo.consultRule.split('<br>')
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
