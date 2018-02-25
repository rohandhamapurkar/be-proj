import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import MainApp from '@/components/MainApp'
import Login from '@/components/Login'
import SignUp from '@/components/SignUp'
import AuthProgress from '@/components/AuthProgress'
import IntermediatePage from '@/components/IntermediatePage'
import ImageBased from '@/components/ImageBased'
import EmbeddedImageBased from '@/components/EmbeddedImageBased'
import OTPBased from '@/components/OTPBased'
import PageNotFound from '@/components/404'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/signup',
      name: 'SignUp',
      component: SignUp
    },
    {
      path: '/404',
      name: '404',
      component: PageNotFound
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
      path: '/authprogress',
      component: AuthProgress,
      children: [
        {
          path: 'intermediatepage',
          name: 'IntermediatePage',
          component: IntermediatePage
        },
        {
          path: 'imagebased',
          name: 'ImageBased',
          component: ImageBased
        },
        {
          path: 'embeddedimagebased',
          name: 'EmbeddedImageBased',
          component: EmbeddedImageBased
        },
        {
          path: 'otpbased',
          name: 'OTPBased',
          component: OTPBased
        }
      ]
    }
  ]
})
