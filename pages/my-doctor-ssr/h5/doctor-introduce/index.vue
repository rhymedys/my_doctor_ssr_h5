<template>
  <div
    v-if="computeShowContent"
    class="doctor-introduce"
  >
    <common-list-section title="基本信息">
      <doctor-info-item
        class="doctor-introduce__doctor-info-item_br-bottom"
        :title="'姓名'"
        :value="computeDoctorDetails.doctorName||''"
      />
      <doctor-info-item
        class="doctor-introduce__doctor-info-item_br-bottom"
        :title="'职称'"
        :value="computeDoctorDetails.doctorTitle||''"
      />
      <doctor-info-item
        class="doctor-introduce__doctor-info-item_br-bottom"
        :title="'所属医院'"
        :value="computeDoctorDetails.hospitalName||''"
      />
      <doctor-info-item
        class="doctor-introduce__doctor-info-item_br-bottom"
        :title="'科室'"
        :value="computeDoctorDetails.tenantDeptName||''"
      />
      <doctor-info-item
        class="doctor-introduce__doctor-info-item_br-bottom"
        :title="'擅长'"
        :value="computeDoctorDetails.speciality||''"
        col
      />
      <doctor-info-item
        :title="'简介'"
        :value="computeDoctorDetails.introduction||''"
        col
      />
      <img
        src="@/assets/img/picQualified@2x.png"
        class="doctor-introduce__water-icon"
        width="130"
        height="130"
      >
    </common-list-section>
    <common-list-section
      title="认证信息"
      class="doctor-introduce__auth-info"
    >
      <doctor-authentication-item
        class="doctor-introduce__auth-info_br-bottom"
        :name="'医师资格证'"
      />
      <doctor-authentication-item
        :name="'医师执业证'"
      />
    </common-list-section>
  </div>
</template>

<script>
export default {
  name: 'DoctorIntroduce',
  components: {
    CommonListSection: () => import('@/components/common-list-section'),
    DoctorInfoItem: () => import('@/components/doctor-info-item'),
    DoctorAuthenticationItem: () =>
      import('@/components/doctor-authentication-item')
  },
  async asyncData(ctx) {
    const { app, query } = ctx

    const { $requestApiWithCookie, $checkSessionIsOverdue } = app

    const res = await $requestApiWithCookie(ctx, {
      url: 'doctor/getDoctorDetail',
      params: query
    }).catch(e => {
      return {}
    })

    $checkSessionIsOverdue(ctx, res.data)

    return {
      getDoctorDetailRes: res.data
    }
  },
  data() {
    return {
      getDoctorDetailRes: undefined
    }
  },
  computed: {
    computeShowContent() {
      return this.getDoctorDetailRes && this.getDoctorDetailRes.resultCode === 0
    },
    computeDoctorDetails() {
      return (
        (this.getDoctorDetailRes &&
          this.getDoctorDetailRes.data &&
          this.getDoctorDetailRes.data.data) ||
        {}
      )
    }
  },
  // created() {
  //   if (!process.isServer && this.getDoctorDetailRes.resultCode === 410001) {
  //     const redirectUri = encodeURIComponent(window.location.href)
  //     window.location.replace(
  //       `http://120.79.205.36:3001/my-doctor-ssr/login?redirect_uri=${redirectUri}`
  //     )
  //   }
  // },
  beforeDestroy() {
    // eslint-disable-next-line no-console
    console.log('DoctorIntroduce beforeDestroy')
  }
}
</script>
<style lang="less" scoped>
@import './index.less';
</style>
