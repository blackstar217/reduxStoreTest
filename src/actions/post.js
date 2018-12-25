import * as types from './types'
import { fetchPosts } from '../service/'

export const getPosts = auth_token => dispatch => (
  fetchPosts(auth_token).then((res) => {
    return res.json()
  })
    .then(data => {
      dispatch({
        type: types.LOAD_POSTS,
        posts: data.posts
      })
    })
    .catch((err) => {
      console.log(err)
    })
)

export const setFilteredPosts = posts => dispatch => (
  dispatch({
    type: types.FILTERED_POST,
    filteredPosts: posts
  })
)
