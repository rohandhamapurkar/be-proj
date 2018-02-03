import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import MainApp from '@/components/MainApp'
import Login from '@/components/Login'
import SignUp from '@/components/SignUp'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/mainapp',
      component: MainApp,
      children: [
        {
          path: 'hello',
          name: 'Hello',
          component: Hello
        }
      ]
    },
    {
      path: '/signup',
      name: 'SignUp',
      component: SignUp
    }
  ]
})
