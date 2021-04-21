export default class Clipboard {
  constructor() {
    this.clipboard = navigator.clipboard
    this.interceptors = {
      copy() {},
      paste() {}
    }
  }

  get() {
    this.interceptors.paste()
    return this.clipboard.readText()
  }

  set(text) {
    this.interceptors.copy()
    return this.clipboard.writeText(text)
  }
}
