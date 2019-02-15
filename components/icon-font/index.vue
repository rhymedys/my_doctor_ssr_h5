<template>
  <span
    class="icon-font"
    :class="[vc?'icon-font_center':'']"
    @click="$emit('clickItem')"
  >
    <svg
      v-if="svg"
      class="icon-font_svg needsclick"
      :class="[size]"
      aria-hidden="true"
    >
      <use
        v-icon="`#${icon}`"
        xlink:href
      />
    </svg>

    <i
      v-if="!svg"
      class="Patient needsclick icon-font__i"
      :class="[icon,size,otherClass,!autoHeight&&'icon-font__i_height100']"
      :style="[{color}]"
    />
  </span>
</template>

<script>
/* eslint-disable vue/require-default-prop */

export default {
  name: 'IconFont',
  directives: {
    icon: {
      inserted(el, binding, vnode) {
        el.attributes['xlink:href'].value = binding.value
      },
      update(el, binding, vnode) {
        binding.value !== binding.oldValue &&
          (el.attributes['xlink:href'].value = binding.value)
      }
    }
  },
  props: {
    svg: Boolean,
    icon: {
      required: true,
      type: String
    },
    size: String,
    color: String,
    otherClass: String,
    vc: Boolean,
    autoHeight: Boolean
  }
}
</script>

<style lang="less" scoped>
.icon-font {
  &_center {
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  &_svg {
    width: 1em;
    height: 1em;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
  }

  &__i {
    line-height: 1;
    &_height100 {
      height: 100%;
    }
  }
}
</style>
