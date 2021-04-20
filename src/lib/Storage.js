const stringifyStorageItem = value => JSON.stringify({ value })
const parseStorageItem = e => JSON.parse(e).value || ''

export default class Storage {
  #setMethods = {
    localStorage: (key, value) => localStorage.setItem(key, stringifyStorageItem(value))
  }

  #getMethods = {
    localStorage: key => localStorage.getItem(key)
  }

  #removeMethods = {
    localStorage: key => localStorage.removeItem(key)
  }

  #clearMethods = {
    localStorage: () => localStorage.clear()
  }

  constructor({ method = 'localStorage' } = {}) {
    this.method = method
  }

  set(key, value) {
    this.#setMethods[this.method](key, value)
  }

  get(key) {
    return parseStorageItem(this.#getMethods[this.method](key))
  }

  remove(key) {
    this.#removeMethods[this.method](key)
  }

  clear() {
    this.#clearMethods[this.method]()
  }
}
