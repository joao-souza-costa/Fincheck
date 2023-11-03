import { HOME, LOGIN, REGISTER, DASHBOARD } from './const'

import AuthLayout from '@/view/layouts/AuthLayout.vue'
import LoginView from '@/view/pages/auth/Login/LoginView.vue'
import RegisterView from '@/view/pages/auth/Register/RegisterView.vue'
import DashboardView from '@/view/pages/DashboardView.vue'

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
