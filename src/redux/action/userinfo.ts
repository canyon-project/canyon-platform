export const set = (userinfo: any) => {
  return (dispatch: any) => {
    ;(() => {
      dispatch({
        type: 'setUserinfo',
        userinfo,
      })
    })()
  }
}
