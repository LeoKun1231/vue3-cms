import { useStore } from '@/store'
export function usePermissions(pageName: string, handlerName: string) {
  const store = useStore()
  const permissions = store.state.login.permissions
  const verifyPermission = `system:${pageName}:${handlerName}`
  return !!permissions.find((item: any) => item === verifyPermission)
}
