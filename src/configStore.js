
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import reducer from './reducers/'

export default (initialState = {}) => {
  const enhancer = compose(
    applyMiddleware(thunk)
  )

  const store = createStore(reducer, initialState, enhancer)

  return store
}
