export default class IndexedDB {
  constructor(databaseName, { version } = {}) {
    this.db = undefined
    this.objectStore = {}
    this.databaseName = databaseName
    this.version = version
    this.request = window.indexedDB.open(databaseName, version)
  }

  connect() {
    return new Promise((resolve, reject) => {
      this.request.onupgradeneeded = event => {
        this.db = event.target.result
        resolve()
      }

      this.request.onerror = () => {
        reject()
      }
    })
  }

  createStore(storeName, { columns = [] } = {}) {
    this.connect().then(() => {
      if (!this.db.objectStoreNames.contains(storeName)) {
        this.objectStore[storeName] = this.db.createObjectStore(storeName, { autoIncrement: true })
        columns.forEach(element => {
          this.objectStore[storeName].createIndex(element.name, element.name, { unique: false })
        })
      }
    })
  }
}
