import axios from 'axios'
import { parseCookies } from 'nookies'

const cookies = parseCookies()

export const api = axios.create({
  baseURL: 'http://localhost:3333',
  headers: {
    Authorization: `Bearer ${cookies['token']}`
  }
})

// api.interceptors.response.use(response => {
//   return response
// }, (error: AxiosError<AxiosErrorResponse>) => {
//   if (error.response?.status === 401) {
//     if (error.response.data?.code === 'token.expired') {
//       cookies = parseCookies()

//       const { refreshToken } = cookies
//       const originalConfig: InternalAxiosRequestConfig = error.config

//       if (!isRefreshing) {
//         isRefreshing = true

//         api.patch('/token/refresh', {
//           refreshToken
//         }).then(response => {
//           const { token } = response.data

//           setCookie(undefined, 'token', token, {
//             maxAge: 60 * 60 * 24 * 30, // 30 days
//             path: '/'
//           })
//           setCookie(undefined, 'refreshToken', response.data.refreshToken, {
//             maxAge: 60 * 60 * 24 * 30, // 30 days
//             path: '/'
//           })

//           api.defaults.headers.common.Authorization = `Bearer ${token}`

//           failedRequestsQueue.forEach(request => request.onSucess(token))
//           failedRequestsQueue = []
//         }).catch(err => {
//           failedRequestsQueue.forEach(request => request.onFailure(err))
//           failedRequestsQueue = []
//         }).finally(() => {
//           isRefreshing = false
//         })
//       }

//       return new Promise((resolve, reject) => {
//         failedRequestsQueue.push({
//           onSucess: (token: string) => {
//             originalConfig.headers['Authorization'] = `Bearer ${token}`

//             resolve(api(originalConfig))
//           },
//           onFailure: (err: AxiosError) => {
//             reject(err)
//           }
//         })
//       })
//     } else {
//       // deslogar
//     }
//   }
// })