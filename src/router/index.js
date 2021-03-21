import Vue from 'vue'
import VueRouter from 'vue-router'
import PaginaArranque from '../views/Home.vue'
import Login from '../views/Login.vue'
import store from '@/store'


Vue.use(VueRouter)

  const routes = [
  {
    path: '/pagina-arranque',
    name: 'pagina-arranque',
    component: PaginaArranque,
    meta: { libre:false, ADMIN: true}
  },
  {
    path: '/',
    name: 'Login',
    component: Login,
    meta: { libre: true }
  },


]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// router.beforeEach( (to, from, next) => {

//   if(to.matched.some(record => record.meta.libre)){
//     next()
//   }else if(store.state.Login.datosUsuario){
//     if(to.matched.some(record => record.meta.ADMIN)){
//       next()
//     }
//   }else{
//     next({
//       name: 'pagina-arranque'
//     })
//   }
// })

export default router
