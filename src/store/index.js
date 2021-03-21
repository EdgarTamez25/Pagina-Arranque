import Vue from 'vue'
import Vuex from 'vuex'
import Login   from '@/modules/Login'
import router  from '@/router'


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
    salir({commit}){
      console.log('CERRAR SESSION')
      // commit("setUsuario", '')
      // commit("setToken", '')
      localStorage.removeItem("KeyLogger")
      // router.push({name: 'Login'})
    }
  },
  modules: {
    Login
  }
})
