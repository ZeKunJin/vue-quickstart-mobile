<template>
  <div class="home-page-layout"></div>
</template>

<script>
import IndexedDB from '@/lib/IndexedDB'

export default {
  mounted() {
    const indexedDB = new IndexedDB('indexDB', { version: 1 })
    indexedDB.createStore('account', { columns: [{ name: 'name' }, { name: 'email' }, { name: 'mobile' }] })
  }
}
</script>

<style lang="less" scoped>
.home-page-layout {
  font-size: 14px;
}
</style>
