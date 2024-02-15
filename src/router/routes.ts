import { HOME_PAGE, LOGIN, REGISTER, DASHBOARD, FORGOT_PASSWORD, FORGOT_CHANGE_PASSWORD, SETTINGS, DASH } from '../app/config/constants/route'
import AuthLayout from '../view/layouts/AuthLayout.vue'
import LoginView from '../view/pages/Auth/Login/LoginView.vue'
import ForgotPasswordView from '../view/pages/Auth/ForgotPassword/ForgotPasswordView.vue'
import ForgotConfirmPasswordView from '../view/pages/Auth/ForgotPassword/ForgotConfirmPasswordView.vue'
import RegisterView from '../view/pages/Auth/Register/RegisterView.vue'
import DashboardView from '../view/pages/DashBoard/DashboardView.vue'
import SettingsLayout from '@/view/layouts/SettingsLayout.vue'
import HomePageLayout from '@/view/layouts/HomePageLayout.vue'


const defineSlide = (to: any, from: any) => {
  const toDepth = HOME_PAGE_CHILDREN.findIndex((item) => item.name === to.name)
  const fromDepth = HOME_PAGE_CHILDREN.findIndex((item) => item.name === from.name)
  to.meta.transition = toDepth > fromDepth ? 'go' : 'back'
}


const HOME_PAGE_CHILDREN = [
  {
    path: DASHBOARD.path,
    name: DASHBOARD.name,
    component: DashboardView,
    beforeEnter: [defineSlide]
  },
  {
    path: SETTINGS.path,
    name: SETTINGS.name,
    component: SettingsLayout,
    beforeEnter: [defineSlide]
  },
]

export default [
  {
    path: DASH.path,
    component: AuthLayout,
    children: [
      {
        path: LOGIN.path,
        name: LOGIN.name,
        component: LoginView,
      },
      {
        path: REGISTER.path,
        name: REGISTER.name,
        component: RegisterView,
      },
      {
        path: FORGOT_PASSWORD.path,
        name: FORGOT_PASSWORD.name,
        component: ForgotPasswordView,
      },
      {
        path: FORGOT_CHANGE_PASSWORD.path,
        name: FORGOT_CHANGE_PASSWORD.name,
        component: ForgotConfirmPasswordView,
      }
    ]
  },
  {
    path: HOME_PAGE.path,
    component: HomePageLayout,
    children: HOME_PAGE_CHILDREN,
    meta: { requiresAuth: true }
  },
]
