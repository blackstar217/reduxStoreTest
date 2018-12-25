import * as types from './types'
import { fetchPosts } from '../service/'

export const getPosts = auth_token => dispatch => (
  fetchPosts(auth_token).then((res) => {
    return res.json()
  })
    .then(data => {
      dispatch({
        type: types.LOAD_MAGAZINE,
        posts: data.results
      })
    })
    .catch((err) => {
      console.log(err)
    })
)
