<template>
  <div class="common-list-section">
    <div class="title-wrapper">
      <div class="title-wrapper__sign" />
      <div class="title-wrapper__title">
        {{ title||'' }}
      </div>
    </div>
    <slot />
    <div
      v-if="showEmpty"
      class="empty-content-wrapper"
    >
      <div class="empty-content-wrapper__txt">
        {{ computeEmptyTxt }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CommonListSection',
  props: {
    // eslint-disable-next-line vue/require-default-prop
    title: String,
    isEmpty: Boolean,
    // eslint-disable-next-line vue/require-default-prop
    emptyTxt: String,
    showEmpty: Boolean
  },
  computed: {
    computeEmptyTxt() {
      let res = ''

      const { emptyTxt, title } = this

      if (emptyTxt) {
        res = emptyTxt
      } else if (title) {
        res = `暂无${title}`
      }

      return res
    }
  }
}
</script>


<style lang="less" scoped>
@import './index.less';
</style>
