import { HOME, LOGIN, REGISTER, DASHBOARD, FORGOT_PASSWORD, FORGOT_CHANGE_PASSWORD } from '../app/config/constants/route'
import AuthLayout from '../view/layouts/AuthLayout.vue'
import LoginView from '../view/pages/auth/Login/LoginView.vue'
import ForgotPasswordView from '../view/pages/auth/ForgotPassword/ForgotPasswordView.vue'
import ForgotConfirmPasswordView from '../view/pages/auth/ForgotPassword/ForgotConfirmPasswordView.vue'
import RegisterView from '../view/pages/auth/Register/RegisterView.vue'
import DashboardView from '../view/pages/DashBoard/DashboardView.vue'
import { activeUserRegister } from '@/app/config/constants/envConstants'

export default [
  {
    path: HOME.path,
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
    path: DASHBOARD.path,
    name: DASHBOARD.name,
    component: DashboardView,
    meta: { requiresAuth: true }
  }
]
