const user = () => import('@/views/home/system/user/user.vue')
export default {
  path: '/home/system/user',
  name: 'user',
  component: user,
  children: []
}
