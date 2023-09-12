import { h } from 'vue'
import { resolveComponent } from '@lljj/vjsf-utils/vue3Utils'

const baseComponent = {
  name: 'TransferWidget',
  inheritAttrs: false,
  setup(props, { attrs }) {
    return () =>
      h(resolveComponent('a-transfer'), {
        ...attrs,
      })
  },
}

export default resolveComponent(baseComponent)
