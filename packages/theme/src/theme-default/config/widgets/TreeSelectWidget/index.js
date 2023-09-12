import { h } from 'vue'
import { resolveComponent } from '@lljj/vjsf-utils/vue3Utils'

const baseComponent = {
  name: 'TreeSelectWidget',
  inheritAttrs: false,
  setup(props, { attrs }) {
    return () =>
      h(resolveComponent('a-tree-select'), {
        ...attrs,
      })
  },
}

export default resolveComponent(baseComponent)
