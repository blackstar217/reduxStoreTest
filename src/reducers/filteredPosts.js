import * as types from '../actions/types'
const initialState = []

export default (state = initialState, action) => {
  switch (action.type) {
    case types.FILTERED_POST:
      return action.filteredPosts
    default:
      return state
  }
}
