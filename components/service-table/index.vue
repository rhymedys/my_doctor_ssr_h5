<template>
  <div class="service-table">
    <div class="service-wrapper">
      <div v-for="item of doctorServicesInfos" :key="item.servceId" class="service-wrapper__item">
        <img height="40" width="40" :src="item.iconUrl">
        <div class="service-wrapper__item_desc">
          <div
            class="desc__title"
            :class="[item.isValid?'desc__title_valid':'']"
          >
            {{ item.serverName||'' }}
          </div>
          <span class="desc__status">
            {{ item.desc || '' }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ServiceTable',
  props: {
    doctorServicesInfos: {
      type: Array,
      default: function() {
        return []
      }
    }
  }
}
</script>


<style lang="less" scoped>
@import './index.less';
</style>
