export default store => next => action => {
    if(action.error && action.error.response && action.error.response.status === 401) {
        return window.location.replace('/login')
    }
    return next(action)
  }