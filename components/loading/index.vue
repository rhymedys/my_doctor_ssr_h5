<template lang="html">
  <div
    v-if="loading"
    class="loading-wrapper"
    @touchmove.stop.prevent
  >
    <div class="lds-spinner loading-wrapper__icon">
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Loading',
  data: () => ({
    loading: false
  }),
  methods: {
    start() {
      // eslint-disable-next-line no-console
      console.log('showLoading')
      this.loading = true
    },
    finish() {
      this.loading = false
    }
  }
}
</script>

<style lang="less" scoped>
.loading-wrapper {
  height: 100vh;
  width: 100vw;
  position: fixed;
  text-align: center;
  align-items: center;
  z-index: 999 !important;
  &__icon {
    height: 100%;
    width: 100%;
    z-index: 888;
    margin: auto;
    position: absolute !important;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
  }
  @keyframes lds-spinner {
    0% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
  @-webkit-keyframes lds-spinner {
    0% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
  .lds-spinner {
    position: relative;
  }
  .lds-spinner div {
    left: 95px;
    top: 32px;
    position: absolute;
    -webkit-animation: lds-spinner linear 0.4s infinite;
    animation: lds-spinner linear 0.4s infinite;
    background: #007aff;
    width: 10px;
    height: 40px;
    border-radius: 38%;
    -webkit-transform-origin: 5px 68px;
    transform-origin: 5px 68px;
  }
  .lds-spinner div:nth-child(1) {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
    -webkit-animation-delay: -0.366666666666667s;
    animation-delay: -0.366666666666667s;
  }
  .lds-spinner div:nth-child(2) {
    -webkit-transform: rotate(30deg);
    transform: rotate(30deg);
    -webkit-animation-delay: -0.333333333333333s;
    animation-delay: -0.333333333333333s;
  }
  .lds-spinner div:nth-child(3) {
    -webkit-transform: rotate(60deg);
    transform: rotate(60deg);
    -webkit-animation-delay: -0.3s;
    animation-delay: -0.3s;
  }
  .lds-spinner div:nth-child(4) {
    -webkit-transform: rotate(90deg);
    transform: rotate(90deg);
    -webkit-animation-delay: -0.266666666666667s;
    animation-delay: -0.266666666666667s;
  }
  .lds-spinner div:nth-child(5) {
    -webkit-transform: rotate(120deg);
    transform: rotate(120deg);
    -webkit-animation-delay: -0.233333333333333s;
    animation-delay: -0.233333333333333s;
  }
  .lds-spinner div:nth-child(6) {
    -webkit-transform: rotate(150deg);
    transform: rotate(150deg);
    -webkit-animation-delay: -0.2s;
    animation-delay: -0.2s;
  }
  .lds-spinner div:nth-child(7) {
    -webkit-transform: rotate(180deg);
    transform: rotate(180deg);
    -webkit-animation-delay: -0.166666666666667s;
    animation-delay: -0.166666666666667s;
  }
  .lds-spinner div:nth-child(8) {
    -webkit-transform: rotate(210deg);
    transform: rotate(210deg);
    -webkit-animation-delay: -0.133333333333333s;
    animation-delay: -0.133333333333333s;
  }
  .lds-spinner div:nth-child(9) {
    -webkit-transform: rotate(240deg);
    transform: rotate(240deg);
    -webkit-animation-delay: -0.1s;
    animation-delay: -0.1s;
  }
  .lds-spinner div:nth-child(10) {
    -webkit-transform: rotate(270deg);
    transform: rotate(270deg);
    -webkit-animation-delay: -0.066666666666667s;
    animation-delay: -0.066666666666667s;
  }
  .lds-spinner div:nth-child(11) {
    -webkit-transform: rotate(300deg);
    transform: rotate(300deg);
    -webkit-animation-delay: -0.033333333333333s;
    animation-delay: -0.033333333333333s;
  }
  .lds-spinner div:nth-child(12) {
    -webkit-transform: rotate(330deg);
    transform: rotate(330deg);
    -webkit-animation-delay: 0s;
    animation-delay: 0s;
  }
  .lds-spinner {
    width: 50px !important;
    height: 50px !important;
    -webkit-transform: translate(-25px, -25px) scale(0.25) translate(25px, 25px);
    transform: translate(-25px, -25px) scale(0.25) translate(25px, 25px);
  }
}
</style>
