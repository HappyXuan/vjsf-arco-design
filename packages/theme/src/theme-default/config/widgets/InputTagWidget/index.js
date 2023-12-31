import { h } from 'vue'
import { resolveComponent } from '@lljj/vjsf-utils/vue3Utils'

const baseComponent = {
  name: 'InputTagWidget',
  inheritAttrs: false,
  setup(props, { attrs }) {
    return () =>
      h(resolveComponent('a-input-tag'), {
        ...attrs,
      })
  },
}

export default resolveComponent(baseComponent)
