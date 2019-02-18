import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'

const _474d55c6 = () => interopDefault(import('..\\pages\\my-doctor-ssr\\h5\\doctor-chat-service\\index.vue' /* webpackChunkName: "pages_my-doctor-ssr_h5_doctor-chat-service_index" */))
const _1e78148a = () => interopDefault(import('..\\pages\\my-doctor-ssr\\h5\\doctor-famous-course\\index.vue' /* webpackChunkName: "pages_my-doctor-ssr_h5_doctor-famous-course_index" */))
const _9e9c9276 = () => interopDefault(import('..\\pages\\my-doctor-ssr\\h5\\doctor-index\\index.vue' /* webpackChunkName: "pages_my-doctor-ssr_h5_doctor-index_index" */))
const _a67b5450 = () => interopDefault(import('..\\pages\\my-doctor-ssr\\h5\\doctor-introduce\\index.vue' /* webpackChunkName: "pages_my-doctor-ssr_h5_doctor-introduce_index" */))
const _6325627e = () => interopDefault(import('..\\pages\\my-doctor-ssr\\h5\\doctor-phone-service\\index.vue' /* webpackChunkName: "pages_my-doctor-ssr_h5_doctor-phone-service_index" */))
const _6a5ba3b5 = () => interopDefault(import('..\\pages\\my-doctor-ssr\\h5\\focus-doctor\\index.vue' /* webpackChunkName: "pages_my-doctor-ssr_h5_focus-doctor_index" */))
const _316a01ce = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages_index" */))

Vue.use(Router)

if (process.client) {
  window.history.scrollRestoration = 'manual'
}
const scrollBehavior = function (to, from, savedPosition) {
  // if the returned position is falsy or an empty object,
  // will retain current scroll position.
  let position = false

  // if no children detected and scrollToTop is not explicitly disabled
  if (
    to.matched.length < 2 &&
    to.matched.every(r => r.components.default.options.scrollToTop !== false)
  ) {
    // scroll to the top of the page
    position = { x: 0, y: 0 }
  } else if (to.matched.some(r => r.components.default.options.scrollToTop)) {
    // if one of the children has scrollToTop option set to true
    position = { x: 0, y: 0 }
  }

  // savedPosition is only available for popstate navigations (back button)
  if (savedPosition) {
    position = savedPosition
  }

  return new Promise((resolve) => {
    // wait for the out transition to complete (if necessary)
    window.$nuxt.$once('triggerScroll', () => {
      // coords will be used if no selector is provided,
      // or if the selector didn't match any element.
      if (to.hash) {
        let hash = to.hash
        // CSS.escape() is not supported with IE and Edge.
        if (typeof window.CSS !== 'undefined' && typeof window.CSS.escape !== 'undefined') {
          hash = '#' + window.CSS.escape(hash.substr(1))
        }
        try {
          if (document.querySelector(hash)) {
            // scroll to anchor by returning the selector
            position = { selector: hash }
          }
        } catch (e) {
          console.warn('Failed to save scroll position. Please add CSS.escape() polyfill (https://github.com/mathiasbynens/CSS.escape).')
        }
      }
      resolve(position)
    })
  })
}

export function createRouter() {
  return new Router({
    mode: 'history',
    base: '/',
    linkActiveClass: 'nuxt-link-active',
    linkExactActiveClass: 'nuxt-link-exact-active',
    scrollBehavior,

    routes: [{
      path: "/my-doctor-ssr/h5/doctor-chat-service",
      component: _474d55c6,
      name: "my-doctor-ssr-h5-doctor-chat-service"
    }, {
      path: "/my-doctor-ssr/h5/doctor-famous-course",
      component: _1e78148a,
      name: "my-doctor-ssr-h5-doctor-famous-course"
    }, {
      path: "/my-doctor-ssr/h5/doctor-index",
      component: _9e9c9276,
      name: "my-doctor-ssr-h5-doctor-index"
    }, {
      path: "/my-doctor-ssr/h5/doctor-introduce",
      component: _a67b5450,
      name: "my-doctor-ssr-h5-doctor-introduce"
    }, {
      path: "/my-doctor-ssr/h5/doctor-phone-service",
      component: _6325627e,
      name: "my-doctor-ssr-h5-doctor-phone-service"
    }, {
      path: "/my-doctor-ssr/h5/focus-doctor",
      component: _6a5ba3b5,
      name: "my-doctor-ssr-h5-focus-doctor"
    }, {
      path: "/",
      component: _316a01ce,
      name: "index"
    }],

    fallback: false
  })
}
