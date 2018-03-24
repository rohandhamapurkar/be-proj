import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import MainApp from '@/components/MainApp'
import Profile from '@/components/Profile'
import AdminProfile from '@/components/AdminProfile'
import ApiKey from '@/components/ApiKey'
import GridSettings from '@/components/GridSettings'
import EmbeddedImageSettings from '@/components/EmbeddedImageSettings'
import Login from '@/components/Login'
import SignUp from '@/components/SignUp'
import AdminSignUp from '@/components/AdminSignUp'
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
      path: '/adminsignup',
      name: 'AdminSignUp',
      component: AdminSignUp
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
          path: 'profile',
          name: 'Profile',
          component: Profile
        },
        {
          path: 'apikey',
          name: 'ApiKey',
          component: ApiKey
        },
        {
          path: 'adminprofile',
          name: 'adminprofile',
          component: AdminProfile
        },
        {
          path: 'gridsettings',
          name: 'GridSettings',
          component: GridSettings
        },
        {
          path: 'embeddedimagesettings',
          name: 'EmbeddedImageSettings',
          component: EmbeddedImageSettings
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
