import {h} from 'vue'
import {resolveComponent} from '@lljj/vjsf-utils/vue3Utils'

const baseComponent = {
  name: 'InputPasswordWidget',
  inheritAttrs: false,
  setup(props, {attrs}) {
    return () =>
      h(resolveComponent('a-input-password'), {
        ...attrs,
      })
  },
}

export default resolveComponent(baseComponent)
