import { combineReducers } from 'redux'
import posts from './posts'
import filteredPosts from './filteredPosts'

export default combineReducers({
  posts,
  filteredPosts
})
