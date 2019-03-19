/* VueJS classic imports */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/store'

// helpers
import helpers from './helpers'
import './registerServiceWorker'

/* IONIC import */
import Ionic from '@modus/ionic-vue'

// Ionic core styles and theming
import '@ionic/core/css/core.css'
import '@ionic/core/css/ionic.bundle.css'
//import './theme/common.css'

// Capacitor
import { Plugins, StatusBarStyle } from '@capacitor/core'
const { SplashScreen, StatusBar, Network } = Plugins

// Initialize Capacitor
initCapacitor();


Vue.config.productionTip = false

// Use ionic/vue plugin
Vue.use(Ionic)

new Vue({
  router,
  store,
  async mounted() {
    //SplashScreen.hide().catch(this.$helpers.err)
    initNavGesture(this)
  },
  render: h => h(App)
}).$mount('#ion-app')

// Initial Capacitor calls
async function initCapacitor() {
  // Platform checks
  Vue.prototype.$isWeb = helpers.isWeb()
  Vue.prototype.$isIOS = helpers.isIOS()

  // Set status-bar background and style
  //StatusBar.setBackgroundColor({ color: helpers.env('INITIAL_STATUSBAR_COLOR') }).catch(helpers.err)
  // StatusBar.setStyle({ style: StatusBarStyle.Light }).catch(helpers.err)

  // Set network checks
  Network.getStatus()
    .then(s => (Vue.prototype.$networkStatus = s))
    .catch(helpers.err)

  // Listen to network changes
  Network.addListener('networkStatusChange', s => (Vue.prototype.$networkStatus = s)).catch(
    helpers.err
  )
}

// Navigate back and forth through a swipe gesture
async function initNavGesture (app) {
  const gesture = await import('@ionic/core/dist/collection/utils/gesture')

  gesture
    .createGesture({
      el: document.body,
      gestureName: 'swipe',
      gesturePriority: 40,
      threshold: 10,
      queue: window.Ionic.queue,
      canStart: () => true,
      onStart: () => {},
      onMove: () => {},
      onEnd: ev => {
        const threshold = app.$root.$el.offsetWidth / 2
        if (Math.abs(ev.deltaX) > threshold) {
          app.$router.go(ev.deltaX > 0 ? -1 : 1)
        }
      },
    })
    .setDisabled(false)
}
