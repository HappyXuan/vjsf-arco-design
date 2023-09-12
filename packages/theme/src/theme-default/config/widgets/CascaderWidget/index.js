import { h } from 'vue'
import { resolveComponent } from '@lljj/vjsf-utils/vue3Utils'

const baseComponent = {
  name: 'CascaderWidget',
  inheritAttrs: false,
  props: {
    enumOptions: {
      default: () => [],
      type: [Array],
    },
  },
  setup(props, { attrs }) {
    return () =>
      h(resolveComponent('a-cascader'), {
        options: props.enumOptions,
        ...attrs,
      })
  },
}

export default resolveComponent(baseComponent)
