import Vue from 'vue'
import NuxtLoading from '@/components/loading/index.vue'

import _6f6c098b from '..\\layouts\\default.vue'

const layouts = { "_default": _6f6c098b }

export default {
  head: {"title":"my-doctor-test-ssr","meta":[{"charset":"utf-8"},{"name":"viewport","content":"width=device-width,initial-scale=1,maximum-scale=1,viewport-fit=cover"},{"hid":"description","name":"description","content":"My my-doctor-test-ssr h5 project"},{"hid":"mobile-web-app-capable","name":"mobile-web-app-capable","content":"yes"},{"hid":"apple-mobile-web-app-title","name":"apple-mobile-web-app-title","content":"my-doctor-test-ssr"},{"hid":"author","name":"author","content":"rhymedys"},{"hid":"og:type","name":"og:type","property":"og:type","content":"website"},{"hid":"og:title","name":"og:title","property":"og:title","content":"my-doctor-test-ssr"},{"hid":"og:site_name","name":"og:site_name","property":"og:site_name","content":"my-doctor-test-ssr"},{"hid":"og:description","name":"og:description","property":"og:description","content":"My my-doctor-test-ssr h5 project"}],"script":[{"type":"text\u002Fjavascript","src":"\u002F\u002Fat.alicdn.com\u002Ft\u002Ffont_272092_mpj641e5amj.js","defer":true,"async":true}],"link":[{"href":"\u002F\u002Fat.alicdn.com","rel":"dns-prefetch"},{"href":"\u002F\u002Fat.alicdn.com\u002Ft\u002Ffont_272092_mpj641e5amj.css","rel":"stylesheet"},{"rel":"manifest","href":"\u002Fmy-doctor-ssr\u002Fh5\u002Fdist\u002Fmanifest.21428a90.json"},{"rel":"shortcut icon","href":"\u002Fmy-doctor-ssr\u002Fh5\u002Fdist\u002Ficons\u002Ficon_64.9mld2VBMsQ$.png"},{"rel":"apple-touch-icon","href":"\u002Fmy-doctor-ssr\u002Fh5\u002Fdist\u002Ficons\u002Ficon_512.9mld2VBMsQ$.png","sizes":"512x512"}],"style":[],"htmlAttrs":{"lang":"en"}},

  render(h, props) {
    const loadingEl = h('NuxtLoading', { ref: 'loading' })
    const layoutEl = h(this.layout || 'nuxt')
    const templateEl = h('div', {
      domProps: {
        id: '__layout'
      },
      key: this.layoutName
    }, [ layoutEl ])

    const transitionEl = h('transition', {
      props: {
        name: 'layout',
        mode: 'out-in'
      },
      on: {
        beforeEnter(el) {
          // Ensure to trigger scroll event after calling scrollBehavior
          window.$nuxt.$nextTick(() => {
            window.$nuxt.$emit('triggerScroll')
          })
        }
      }
    }, [ templateEl ])

    return h('div', {
      domProps: {
        id: '__nuxt'
      }
    }, [
      loadingEl,
      transitionEl
    ])
  },
  data: () => ({
    isOnline: true,
    layout: null,
    layoutName: ''
  }),
  beforeCreate() {
    Vue.util.defineReactive(this, 'nuxt', this.$options.nuxt)
  },
  created() {
    // Add this.$nuxt in child instances
    Vue.prototype.$nuxt = this
    // add to window so we can listen when ready
    if (process.client) {
      window.$nuxt = this
      this.refreshOnlineStatus()
      // Setup the listeners
      window.addEventListener('online', this.refreshOnlineStatus)
      window.addEventListener('offline', this.refreshOnlineStatus)
    }
    // Add $nuxt.error()
    this.error = this.nuxt.error
  },

  mounted() {
    this.$loading = this.$refs.loading
  },
  watch: {
    'nuxt.err': 'errorChanged'
  },

  computed: {
    isOffline() {
      return !this.isOnline
    }
  },
  methods: {
    refreshOnlineStatus() {
      if (process.client) {
        if (typeof window.navigator.onLine === 'undefined') {
          // If the browser doesn't support connection status reports
          // assume that we are online because most apps' only react
          // when they now that the connection has been interrupted
          this.isOnline = true
        } else {
          this.isOnline = window.navigator.onLine
        }
      }
    },

    errorChanged() {
      if (this.nuxt.err && this.$loading) {
        if (this.$loading.fail) this.$loading.fail()
        if (this.$loading.finish) this.$loading.finish()
      }
    },

    setLayout(layout) {
      if(layout && typeof layout !== 'string') throw new Error('[nuxt] Avoid using non-string value as layout property.')

      if (!layout || !layouts['_' + layout]) {
        layout = 'default'
      }
      this.layoutName = layout
      this.layout = layouts['_' + layout]
      return this.layout
    },
    loadLayout(layout) {
      if (!layout || !layouts['_' + layout]) {
        layout = 'default'
      }
      return Promise.resolve(layouts['_' + layout])
    }
  },
  components: {
    NuxtLoading
  }
}
