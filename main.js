import Vue from 'vue'
import App from './App'
import store from './store';
import djHeader from './components/layout/djHeader.vue'
import djFooter from './components/layout/djFooter.vue'
import djModel from './components/model/djModel.vue'
Vue.component('dj-header',djHeader)
Vue.component('dj-footer',djFooter)
Vue.component('dj-model',djModel)
Vue.prototype.$store = store;
Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
	store,
	...App
})
app.$mount()
