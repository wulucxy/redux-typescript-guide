import axios from 'axios'

function throwHttpError(message: string) {
  const error = new Error(message)
  error.name = 'HttpError'

  throw error
}

const instance = axios.create()

instance.interceptors.response.use(
  function(response) {
    let result = response.data
    if (!result) {
      throwHttpError('请求异常！')
    }

    if (typeof result !== 'object') {
      throwHttpError('返回数据格式异常！')
    }

    return response.data
  },
  function(error) {
    if (error.response) {
      throwHttpError('请求异常：' + error.response.statusText)
    }

    if (error.request) {
      throwHttpError('请求异常：无返回结果')
    }

    throwHttpError(error.message)
  },
)

export default instance
