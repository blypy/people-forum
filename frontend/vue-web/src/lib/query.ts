import { QueryClient } from '@tanstack/react-query'

const queryClient = new QueryClient()
export const QUERY_TAG = {
  USER: {
    PROFILE: 'USER-PROFILE',
    LIKE: 'UESR-LIKE',
    FAVORITE: 'USER-FAVORITE',
    POST: 'USER-POST'
  },
  POST: {
    DETAIL: 'POST-DETAIL',
    ALL: 'POST-ALL',
    QUERY: 'POST-QUERY'
  }
}

export default queryClient
