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
            </span>
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
export default {
  name: 'DoctorHeader',
  props: {
    doctorIndexInfo: {
      type: Object,
      required: true,
      default: function() {
        return {}
      }
    }
  },
  computed: {
    computeDoctorInfo() {
      return (this.doctorIndexInfo && this.doctorIndexInfo.doctorInfo) || {}
    }
  },
  created() {
    // eslint-disable-next-line no-console
    console.log(this, this.computeDoctorInfo)
  }
}
</script>

<style lang="less" scoped>
@import './index.less';
</style>
