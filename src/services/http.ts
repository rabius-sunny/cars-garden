import { AxiosResponse } from 'axios'
import instance from 'lib/axiosInstance'

const responseBody = (response: AxiosResponse) => response.data

const requests = {
  get: (url: string, config?: object) =>
    instance.get(url, config).then(responseBody),
  post: (url: string, body: object, config?: object) =>
    instance.post(url, body, config).then(responseBody),
  patch: (url: string, body: object, config?: object) =>
    instance.patch(url, body, config).then(responseBody),
  delete: (url: string, config?: object) =>
    instance.delete(url, config).then(responseBody)
}

export default requests
