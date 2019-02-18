<template>
  <div class="service-introduce">
    <img
      class="service-introduce_logo"
      :src="seviceInfo.iconUrl||''"
    >
    <div class="service-introduce__desc">
      {{ seviceInfo.serverName||'' }}
      <span>{{ seviceInfo.desc||'' }}</span>
    </div>
  </div>
</template>


<script>
export default {
  name: 'ServiceIntroduce',
  props: {
    seviceInfo: {
      type: Object,
      default() {
        return {}
      }
    }
  }
}
</script>

<style lang="less" scoped>
@import './index.less';
</style>
