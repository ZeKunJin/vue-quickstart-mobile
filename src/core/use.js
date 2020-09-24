import Vue from 'vue'
import VueStorage from 'vue-ls'
import VueCompositionAPI from '@vue/composition-api'
import config from '@/config/defaultSettings'

Vue.use(VueCompositionAPI)
Vue.use(VueStorage, config.storageOptions)
