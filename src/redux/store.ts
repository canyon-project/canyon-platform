import { createStore, applyMiddleware, compose } from 'redux'
//处理redux的异步任务的中间件
import thunk from 'redux-thunk'
import reducer from './reducer/userinfo'

const store = createStore(reducer, compose(applyMiddleware(thunk)))

export default store
