import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

const app = new Vue({
  render: h => h(App)
}).$mount('#app')

if (window.Cypress) {
  // 在E2E测试中添加
  window.app = app
}
