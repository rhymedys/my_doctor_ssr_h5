<template>
  <div class="header-wrapper">
    <div class="header-wrapper__bg_blue" />
    <div class="header-wrapper__bg_white" />
    <div class="header-wrapper__content">
      <div class="content__base-info">
        <div class="base-info">
          <div class="base-info__left">
            <span class="base-info__left_name">
              {{ doctorIndexInfo.doctorName || '' }}
              <span class="presciption-logo">
                处方
              </span>
            </span>
            <div class="base-info__left_desc">
              {{ doctorIndexInfo.tenantDeptName||'' }}&nbsp;&nbsp;|&nbsp;&nbsp;{{ doctorIndexInfo.doctorTitle||'' }}
              <br>
              {{ doctorIndexInfo.hospitalName||'' }}
            </div>
          </div>
          <avatar
            :avatar="doctorIndexInfo.doctorAvatar ||''"
            :width="60"
            :platfrom="doctorIndexInfo.avatarSource || ''"
            :gender="doctorIndexInfo.gender||''"
            :v-top="57"
            :v-right="16"
            :show-verified="true"
            class="base-info__right"
          />
        </div>
        <div class="other-info">
          <div class="other-info__left">
            <slot name="preview-info" />
          </div>
          <div class="other-info__right">
            <span
              class="other-info__right_txt"
              @click="$emit('onTagClick')"
            >
              返回主页
            </span>
            <img
              src="//mp.mhealth100.com//ip-healthmanager-mobile-web/mydoctor/static/img/iconNext@3x.c0cca17.png"
              width="4"
              height="8"
            >
          </div>
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
  }
}
</script>

<style lang="less" scoped>
@import './index.less';
</style>
