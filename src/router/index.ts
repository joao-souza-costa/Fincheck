import { createRouter, createWebHistory } from 'vue-router'
import routes from './routes'
import { DASHBOARD, LOGIN } from './const'
import { useUserStore } from '@/app/store/useUserProvider'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach((to) => {
  const userStore = useUserStore()
  const isLogged = userStore.accessToken;
  const isPrivate = to.meta.requiresAuth

  if (isPrivate && !isLogged) {
    return {
      name: LOGIN.name,
      replace: true,
    }
  }

  if (!isPrivate && isLogged) {
    return {
      name: DASHBOARD.name,
      replace: true,
    }
  }
})

export default router
