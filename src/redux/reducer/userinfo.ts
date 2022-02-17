const init = {
  email: '',
  deptId: 0,
  setDeptId: 0,
  company: '',
  department: '',
  displayName: '',
  employee: '',
  cName: '',
  username:''
}
export interface RootState {
  email: string
  deptId: number
  setDeptId: number
  company: string
  department: string
  displayName: string
  employee: string
  cName: string
}
export default (state = init, action: any) => {
  switch (action.type) {
    case 'setUserinfo':
      return {
        ...state,
        ...action.userinfo
      }
    default:
      return state
  }
}
