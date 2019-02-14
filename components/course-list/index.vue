<template>
  <div class="course-list">
    <div
      v-for="item of list"
      :key="item.productId"
      class="course-list__item"
    >
      <div class="course-list__item_left">
        <img
          width="80"
          height="60"
          :src="item.productCoverImg"
        >
      </div>
      <div class="course-list__item_right">
        <div class="right__title">
          <span>{{ item.productName||'' }}</span>
        </div>
        <div
          v-if="showVisitInfo"
          class="right__info"
        >
          <span class="right__info_data">
            {{ item.visitNum || '' }}
          </span>
          <span class="right__info_data">
            {{ item.commentNum || '0' }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  name: 'CourseList',
  props: {
    list: {
      type: Array,
      required: true
    },
    showDoctorInfo: {
      type: Boolean,
      default: false
    },
    showVisitInfo: {
      type: Boolean,
      default: true
    }
  }
}
</script>

<style lang="less" scoped>
@import './index.less';
</style>
