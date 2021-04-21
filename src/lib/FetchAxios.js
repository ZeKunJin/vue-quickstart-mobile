const GET = 'GET'

export default class FetchAxios {
  baseURL = ''
  header = {}
  timeout = 0
  controller = undefined
  interceptors = {
    request() {},
    response() {}
  }

  constructor({ baseURL, timeout = 6000 } = {}) {
    this.baseURL = baseURL
    this.timeout = timeout
    this.controller = new AbortController()
  }

  request({ url, methods = GET, data = {}, params = {} }) {
    const getParamsStr = params => {
      const target = []
      for (const key in params) {
        target.push(`${key}=${params[key]}`)
      }
      return target.length > 0 ? `?${target.join('&')}` : ''
    }

    const _url = `${this.baseURL}${url}${getParamsStr(params)}`

    const _request = () =>
      new Promise((resolve, reject) => {
        this.interceptors.request(this)

        fetch(_url, { methods, data })
          .then(res => {
            const json = res.json()
            if (res.ok && res.status >= 200 && res.status < 300) {
              this.interceptors.response(json)
              resolve(json)
            } else {
              reject(res)
            }
          })
          .catch(err => {
            reject(err)
          })
      })

    return Promise.race([_request(), this.overtime()])
  }

  overtime() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        this.controller.abort()
        reject()
      }, this.timeout)
    })
  }
}
