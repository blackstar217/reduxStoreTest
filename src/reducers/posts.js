import * as types from '../actions/types'
const initialState = []

export default (state = initialState, action) => {
  switch (action.type) {
    case types.LOAD_POSTS:
      return action.posts
    default:
      return state
  }
}
