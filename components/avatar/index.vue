<template>
  <div
    class="avatar"
    :style="[computeStyle]"
  >
    <div
      class="avatar__wrapper"
      :class="[!noBorder?'avatar__wrapper_border':'']"
      :style="[computeStyle]"
    >
      <img
        :width="width"
        :style="[computeSkewing]"
        :src="getThumbnailAvatar(avatar,platfrom,width,base64)||getDefaultAvatar()"
        @error="onError($event)"
      >
    </div>
    <img
      v-if="showVerified&&getThumbnailAvatar(avatar,platfrom,width,base64)&&!hadError"
      :src="computeVerifiedSrc"
      class="avatar_vertify"
      width="16"
      height="16"
      :style="[computeVerifiedStyle]"
    >
  </div>
</template>
<script>
/* eslint-disable vue/require-default-prop */

const verfiedOpenSrc = require('@/assets/img/iconVerified@2x.png')
const verfiedCloseSrc = require('@/assets/img/iconVerified0@2x.png')
const defaultAvatarSrc = require('@/assets/img/patient-unknow.png')

export default {
  name: 'Avatar',
  props: {
    gender: String,
    avatar: String,
    width: {
      type: Number,
      required: true
    },
    top: Number,
    bottom: Number,
    left: Number,
    right: Number,
    user: {
      type: Boolean,
      default: false
    },
    platfrom: String,
    showVerified: Boolean,
    vTop: Number,
    vBottom: Number,
    vLeft: Number,
    vRight: Number,
    status: Number,
    base64: Boolean,
    noBorder: Boolean,
    disableLazyLoad: Boolean
  },
  data() {
    return {
      hadError: false,
      tryCount: 0
    }
  },
  computed: {
    computeVerifiedSrc() {
      return this.status === 0 ? verfiedCloseSrc : verfiedOpenSrc
    },
    computeStyle() {
      const length = `${this.width}px`
      return {
        width: length,
        height: length,
        'min-height': length,
        'min-width': length
      }
    },
    computeSkewing() {
      let res = null
      const { top, bottom, left, right } = this
      if (top || bottom || left || right) {
        res = {
          position: 'absolute',
          top: `${top}px`,
          bottom: `${bottom}px`,
          left: `${left}px`,
          right: `${right}px`
        }
      }
      return res
    },
    computeVerifiedStyle() {
      const { vTop, vBottom, vLeft, vRight } = this
      if (vTop || vBottom || vLeft || vRight) {
        return {
          top: `${vTop}px`,
          bottom: `${vBottom}px`,
          left: `${vLeft}px`,
          right: `${vRight}px`
        }
      }
      return { top: '47px', right: '5px' }
    }
  },
  methods: {
    onError(ctx) {
      const that = this
      try {
        if (ctx.target && ctx.target.src) {
          if (that.tryCount < 1) {
            ctx.target.src = that.getDefaultAvatar()
            that.tryCount += 1
          } else {
            ctx.target.src = defaultAvatarSrc
          }
          that.hadError = true
        }
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('avatar img onError listener', error)
      }
    },
    getThumbnailAvatar(orginAvatar, platfrom, width, base64) {
      // try {
      //   if (base64) {
      //     return orginAvatar
      //   }

      //   if (orginAvatar) {
      //     return orginAvatar
      //   }
      // } catch (e) {
      //   console.error('getThumbnailAvatar Error', e)
      //   return orginAvatar
      // }
      return orginAvatar
    },
    getDefaultAvatar() {
      const { gender, user } = this
      const baseUrl = `//mp.mhealth100.com/ip-healthmanager-mobile-web/images/`
      let defaultAvatar = ''
      if (user) {
        if (gender === 'F') {
          defaultAvatar = `${baseUrl}patient-female.png`
        } else {
          defaultAvatar = `${baseUrl}patient-male.png`
        }
      } else if (gender === 'F') {
        defaultAvatar = `${baseUrl}doctor-female.png`
      } else {
        defaultAvatar = `${baseUrl}doctor-male.png`
      }
      return defaultAvatar
    }
  }
}
</script>

<style lang="less" scoped>
@import './index.less';
</style>
