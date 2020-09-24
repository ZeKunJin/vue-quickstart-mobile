<template>
  <div class="home-page-layout">
    <h1>home page</h1>
    count: {{ state.count }}<br />
    computed count: {{ countPlusOne }}<br />
    <van-button size="small" type="primary" @click="actions.add">add</van-button>
  </div>
</template>

<script>
import Vue from 'vue'
import { reactive, onMounted, computed, watchEffect, watch } from '@vue/composition-api'
import { Button } from 'vant'
Vue.use(Button)

export default {
  setup(props, context) {
    const state = reactive({
      count: 0
    })

    const countPlusOne = computed({
      get: () => state.count + 1,
      set() {}
    })

    const stop = watchEffect(() => console.log(`computed count value: ${state.count}`))

    watch(
      () => state.count,
      (count, prevCount) => {
        console.log(`watch prevent count value: ${prevCount}`)
      }
    )

    onMounted(() => {
      console.log('on conponent mounted')
    })

    const actions = {
      add() {
        state.count++

        // 停止 watchEffect 监听
        state.count > 5 && stop()
      }
    }

    return {
      state,
      actions,
      countPlusOne
    }
  }
}
</script>

<style lang="less" scoped>
.home-page-layout {
  font-size: 14px;
}
</style>
