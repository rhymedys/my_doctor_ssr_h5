<template>
  <div
    class="doctor-authentication-item"
  >
    <icon-font
      icon="Groupx"
      size="doctor-authentication-item__icon"
      svg
    />
    <div class="doctor-authentication-item__name">
      {{ name||'' }}
    </div>
    <div class="doctor-authentication-item__sign">
      <img
        src="@/assets/img/iconQualified@2x.png"
      >已认证
    </div>
  </div>
</template>

<script>
/* eslint-disable vue/require-default-prop */
import IconFont from '@/components/icon-font'
export default {
  name: 'DoctorAuthenticationItem',
  components: {
    IconFont
  },
  props: {
    imageSrc: String,
    name: String
  }
}
</script>

<style lang="less">
@import './index.less';
</style>
