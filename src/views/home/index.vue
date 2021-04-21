<template>
  <div class="home-page-layout"></div>
</template>

<script>
import IndexedDB from '@/lib/IndexedDB'
import Clipboard from '@/lib/Clipboard'

export default {
  mounted() {
    const indexedDB = new IndexedDB('indexDB', { version: 1 })
    indexedDB.createStore('account', { columns: [{ name: 'name' }, { name: 'email' }, { name: 'mobile' }] })

    const clipboard = new Clipboard()
    clipboard.set('dm sb').then(() => {
      clipboard.get().then(res => {
        alert(res)
      })
    })
  }
}
</script>

<style lang="less" scoped>
.home-page-layout {
  font-size: 14px;
}
</style>
