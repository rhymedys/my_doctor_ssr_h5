<template>
  <div class="comment-list">
    <div
      v-for="(item,index) of list"
      :key="item.commentId"
      class="item"
      :class="[index===0?'':'item_top']"
    >
      <div class="item__content">
        {{ item.commentContent||'好评' }}
      </div>
      <div class="item__foot">
        <div class="item__foot_name">
          {{ item.commentUserName||'' }}
        </div>
        <div class="item__foot_date">
          {{ getCommentDateProxy(item.commentDate) ||'' }}
        </div>
        <div class="item__foot_rate">
          <img
            v-for="i of 5"
            :key="i"
            :src="i<item.commentStar?'//mp.mhealth100.com/ip-healthmanager-mobile-web/mydoctor/static/img/icon_star_highlight@2x.d5e9033.png':'//mp.mhealth100.com/ip-healthmanager-mobile-web/mydoctor/static/img/iconStarNormal@2x.6b56b45.png'"
            width="13"
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CommentList',
  props: {
    list: {
      type: Array,
      required: true,
      default: () => {
        return []
      }
    }
  },
  methods: {
    getCommentDateProxy(date) {
      let res = ''
      if (date) {
        res = date.substring(0, date.lastIndexOf(':'))
      }

      return res
    }
  }
}
</script>


<style lang="less" scoped>
@import './index.less';
</style>
