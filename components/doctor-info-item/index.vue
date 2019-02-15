<template>
  <div
    class="doctor-info-item"
    :class="[col?'doctor-info-item_col':'']"
  >
    <div class="doctor-info-item__left">
      {{ title||'' }}
    </div>
    <slot>
      <div class="doctor-info-item__right" :class="[col?'doctor-info-item__right_col':'doctor-info-item__right_row']">
        {{ value||'' }}
      </div>
    </slot>
  </div>
</template>



<script>
/* eslint-disable vue/require-default-prop */

export default {
  name: 'DoctorInfoItem',
  props: {
    col: Boolean,
    title: String,
    value: String
  }
}
</script>

<style lang="less" scoped>
@import './index.less';
</style>
