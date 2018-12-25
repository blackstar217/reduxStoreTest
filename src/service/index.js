import { apiEndpoint } from './config'

export const fetchPosts = auth_token => (
    fetch(`${apiEndpoint}posts`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        Access: auth_token
      },
    })
  )