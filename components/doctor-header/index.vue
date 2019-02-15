<template>
  <div class="header-wrapper">
    <div class="header-wrapper__bg_blue" />
    <div class="header-wrapper__bg_white" />
    <div class="header-wrapper__content">
      <div class="content__base-info">
        <div class="base-info">
          <div class="base-info__left">
            <span class="base-info__left_name">
              {{ computeDoctorInfo.doctorName || '' }}
              <span class="presciption-logo">
                处方
              </span>
            </span>
            <div class="base-info__left_desc">
              {{ computeDoctorInfo.tenantDeptName||'' }}&nbsp;&nbsp;|&nbsp;&nbsp;{{ computeDoctorInfo.doctorTitle||'' }}
              <br>
              {{ computeDoctorInfo.hospitalName||'' }}
            </div>
          </div>
          <avatar
            :avatar="computeDoctorInfo.doctorAvatar ||''"
            :width="60"
            :platfrom="computeDoctorInfo.avatarSource || '' "
            :gender="computeDoctorInfo.gender||''"
            :v-top="57"
            :v-right="16"
            :show-verified="true"
            class="base-info__right"
          />
        </div>
        <div class="other-info">
          <div class="other-info__left">
            擅长：{{ computeDoctorInfo.speciality||'' }}
          </div>
          <div class="other-info__right">
            <span
              class="other-info__right_txt"
              @click="$emit('onTagClick')"
            >
              医生简介
            </span>
            <img
              src="//mp.mhealth100.com//ip-healthmanager-mobile-web/mydoctor/static/img/iconNext@3x.c0cca17.png"
              width="4"
              height="8"
            >
          </div>
        </div>
      </div>
      <div class="content__evelution">
        <div class="evelution-wrapper">
          {{ doctorIndexInfo.goodFeedbackRate||'5.0' }}
          <br>
          <span class="evelution-wrapper__desc">
            评价星级
          </span>
        </div>
        <div class="evelution-wrapper">
          {{ doctorIndexInfo.fansNum|| 0 }}
          <br>
          <span class="evelution-wrapper__desc">
            粉丝数
          </span>
        </div>
        <div class="evelution-wrapper">
          {{ doctorIndexInfo.replyCount||0 }}
          <br>
          <span class="evelution-wrapper__desc">
            咨询数
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import avatar from '@/components/avatar'
export default {
  name: 'DoctorHeader',
  components: {
    Avatar: avatar
  },
  props: {
    doctorIndexInfo: {
      type: Object,
      required: true
    }
  },
  computed: {
    computeDoctorInfo() {
      return (this.doctorIndexInfo && this.doctorIndexInfo.doctorInfo) || {}
    }
  }
}
</script>

<style lang="less" scoped>
@import './index.less';
</style>
