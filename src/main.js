import Vue from 'vue'
import App from '@/App.vue'
import router from '@/router';
import vuetify from '@/plugins/vuetify';
import store from '@/store'
import '@/components';
import '@/styles.css';
import 'material-design-icons-iconfont/dist/material-design-icons.css'

Vue.config.productionTip = false

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
