<template>
  <div
    class="famouse-course"
  >
    <section v-if="computeShowContent">
      <doctor-simple-header
        :doctor-index-info="computeDoctorIndexInfo"
        @onTagClick="onTagClick"
      >
        <template slot="preview-info">
          <div class="famouse-course__preview-data-item">
            {{ computeDoctorIndexInfo.voiceNum || '0' }}
            <br>
            <span>内容数</span>
          </div>
          <div class="famouse-course__preview-data-item">
            {{ computeDoctorIndexInfo.voiceVisitNum || '0' }}
            <br>
            <span>浏览量</span>
          </div>
        </template>
      </doctor-simple-header>
      <service-introduce
        :sevice-info="computeDoctorIndexInfo"
      />
      <common-list-section
        title="全部课程"
        class="famouse-course__product-section"
        :show-empty="!computeProducts.length"
      >
        <course-list :list="computeProducts" />
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
    CourseList: () => import('@/components/course-list')
  },
  async asyncData(ctx) {
    const { app, query } = ctx

    const { $requestApiWithCookie, $checkSessionIsOverdue } = app

    const getDoctorVoiceIndexReq = $requestApiWithCookie(ctx, {
      url: 'doctor/getDoctorVoiceIndex',
      params: query
    }).catch(e => {
      return {}
    })

    const listDoctorProductReq = $requestApiWithCookie(ctx, {
      url: 'product/listDoctorProduct',
      params: query
    }).catch(e => {
      return {}
    })

    const [getDoctorVoiceIndexRes, listDoctorProductRes] = await Promise.all([
      getDoctorVoiceIndexReq,
      listDoctorProductReq
    ])

    await Promise.all([
      $checkSessionIsOverdue(ctx, getDoctorVoiceIndexRes.data),
      $checkSessionIsOverdue(ctx, listDoctorProductRes.data)
    ])

    return {
      getDoctorVoiceIndex: getDoctorVoiceIndexRes.data,
      listDoctorProduct: listDoctorProductRes.data
    }
  },
  data() {
    return {
      getDoctorVoiceIndex: undefined
    }
  },
  computed: {
    computeShowContent() {
      return (
        this.getDoctorVoiceIndex && this.getDoctorVoiceIndex.resultCode === 0
      )
    },
    computeDoctorIndexInfo() {
      return (
        (this.getDoctorVoiceIndex &&
          this.getDoctorVoiceIndex.data &&
          this.getDoctorVoiceIndex.data.doctorVoiceIndexInfo) ||
        {}
      )
    },
    computeProducts() {
      return (
        (this.listDoctorProduct &&
          this.listDoctorProduct.data &&
          this.listDoctorProduct.data.productInfos) ||
        []
      )
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
